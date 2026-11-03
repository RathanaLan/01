# SharePoint Connection Playbook

Audience: developers and AI agents who need to connect this app to SharePoint
and prove the connection works end to end. Follow the steps in order and do not
skip the verification section.

This document describes the implementation that is in the repository today. It
is not a proposal.

---

## 0. Definition of done

A connection is "working" only when all of these are true:

1. `npm start` prints `[SP] Connected to <site name>` and
   `SharePoint lists ready: 5 ok, 0 failed`.
2. `GET /api/bootstrap` returns HTTP 200 with `cdcs`, `items` and `dashboard`.
3. A create → read → update → delete roundtrip succeeds for a CDC, an item and
   a movement, and the temporary rows are removed afterwards.
4. `GET /api/export/balances.csv` and `GET /api/export/movements.csv` return
   HTTP 200.
5. `npm test` is green (23 tests).
6. No secret, `.env` file, `data/` folder or test row is left behind.

If the UI looks empty but all of the above pass, the connection is fine and the
data is simply in different lists. See section 8.

---

## 1. How the backend is wired

| File | Responsibility |
| --- | --- |
| `src/store.js` | The only backend selector. Returns the SQLite store or the SharePoint store. |
| `src/sharepoint-service.js` | Microsoft Graph client, site lookup, paging, column resolution, item CRUD. |
| `src/sharepoint-store.js` | SharePoint implementation of the app data API (balances, dashboard, imports, exports). |
| `src/sharepoint-auto-creator.js` | Creates/repairs the five lists and their columns on startup. |
| `src/metrics.js` | Pure balance/status/dashboard helpers shared by both backends. |
| `src/dates.js` | Local `YYYY-MM-DD` helpers. |
| `src/env.js` | Loads `.env`; must be imported before anything that reads `process.env`. |
| `server.js` | HTTP routes; every data call goes through `getStore()`. |

Rules that must not be broken:

- Routes call `await getStore().method()`. They never import `domain.js`
  directly and never branch on `USE_SHAREPOINT`.
- `USE_SHAREPOINT=true` switches **every** read and write. There is no silent
  fallback to SQLite. A Graph failure becomes HTTP 502 with a readable message.
- Balances are derived, never stored: `opening_qty + IN - OUT + signed ADJ`.
  Do not add a `balance` column to `Items`.
- `.env` is loaded by `src/env.js`. `server.js` imports it on line 1. `npm test`
  does **not** load `.env`, so a production `USE_SHAREPOINT=true` never leaks
  into the test run.

---

## 2. Azure app registration

Create an app registration that can call Microsoft Graph as an application
(client credentials flow, no user sign-in).

1. Azure Portal → Microsoft Entra ID → App registrations → New registration.
2. Name it something like `Master List Control - SharePoint`.
3. Supported account type: single tenant.
4. After creation, copy:
   - **Directory (tenant) ID** → `SHAREPOINT_TENANT_ID`
   - **Application (client) ID** → `SHAREPOINT_CLIENT_ID`
5. Certificates & secrets → New client secret → copy the **Value** immediately
   → `SHAREPOINT_CLIENT_SECRET`. The secret is shown once.
6. API permissions → Add a permission → Microsoft Graph → **Application
   permissions**:
   - Simplest: `Sites.ReadWrite.All`, then **Grant admin consent**.
   - Least privilege: `Sites.Selected`, grant admin consent, then grant the app
     write access to the specific site (for example with Graph
     `POST /sites/{site-id}/permissions`). `Sites.Selected` without the
     per-site grant returns 403.
7. Confirm the permission shows a green "Granted for <tenant>" status.

Notes:

- Delegated permissions are not used. There is no signed-in user.
- `Sites.FullControl.All` is not required.
- If the tenant blocks app secrets, use a certificate instead and adapt
  `ClientSecretCredential` in `src/sharepoint-service.js` and
  `src/sharepoint-auto-creator.js`.

---

## 3. Configure `.env`

Copy the example and fill in the values:

```powershell
Copy-Item .env.example .env
```

Minimum working configuration:

```dotenv
PORT=3000
HOST=127.0.0.1

USE_SHAREPOINT=true
SHAREPOINT_SITE_URL=https://<tenant>.sharepoint.com/sites/<site>
SHAREPOINT_TENANT_ID=<directory-id>
SHAREPOINT_CLIENT_ID=<application-id>
SHAREPOINT_CLIENT_SECRET=<secret-value>

AUTO_CREATE_SHAREPOINT_LISTS=true
SHAREPOINT_CACHE_TTL=3000
```

| Variable | Required | Used by code | Meaning |
| --- | --- | --- | --- |
| `USE_SHAREPOINT` | Yes | Yes | Must be exactly `true` to enable SharePoint. |
| `SHAREPOINT_SITE_URL` | Yes | Yes | Full site URL. Sub-site paths are supported. |
| `SHAREPOINT_TENANT_ID` | Yes | Yes | Entra tenant (directory) ID. |
| `SHAREPOINT_CLIENT_ID` | Yes | Yes | App registration client ID. |
| `SHAREPOINT_CLIENT_SECRET` | Yes | Yes | Client secret value. |
| `AUTO_CREATE_SHAREPOINT_LISTS` | No | Yes | Default on. Set to `false` only when the schema is managed elsewhere. |
| `SHAREPOINT_CACHE_TTL` | No | Yes | Milliseconds a list snapshot is reused. Default `3000`. |
| `PORT` / `HOST` | No | Yes | Default `3000` / `127.0.0.1`. Port falls back if busy. |
| `MLC_DB_PATH` / `MLC_DATA_DIR` | No | Yes | SQLite only; ignored when SharePoint is on. |
| `SHAREPOINT_TIMEOUT`, `MAX_RETRY_ATTEMPTS`, `CACHE_ENABLED`, `CACHE_TTL`, `LOG_LEVEL` | No | **No** | Present in `.env.example` but not read by the current code. Do not rely on them. |

`SHAREPOINT_SITE_URL` may point at a sub-site, for example:

```text
https://contoso.sharepoint.com/sites/Department/Team/12_Production_Control
```

The code converts the URL to Graph's `hostname:pathname` form, so the full path
must be correct. A URL that stops at the parent site will connect but the lists
will not be found.

Never commit `.env`. It is already ignored by `.gitignore`.

---

## 4. Start the server and read the log

```powershell
npm.cmd start
```

Expected startup output:

```text
SharePoint mode enabled
  Site URL: https://<tenant>.sharepoint.com/sites/<site>
  Ensuring SharePoint lists and columns exist...
  [DEBUG] SharePoint site URL: ...
  [DEBUG] Trying site by host:pathname: <host>:<path>
✅ Microsoft Graph connection established (by URL)
✅ Site ID: <site-id>
✅ Site Name: <site name>
   [DEBUG] Found N lists on site
✅ List "CDCs" already exists (skipping creation)
...
  SharePoint lists ready: 5 ok, 0 failed

  Master List Control
  http://127.0.0.1:3000
  Backend: SharePoint

[SP] Connected to <site name>
```

What matters:

- `Microsoft Graph connection established` → credentials and site URL are valid.
- `5/5 lists created` / `5 ok, 0 failed` → schema is present.
- `[SP] Connected to <site name>` → the data layer can read the site.

If the app prints `SharePoint initialization failed` but still starts, the
schema step failed. Fix that before testing the UI.

The server intentionally falls back to port 3001, 3002, ... when 3000 is busy.
Do not kill whatever is on 3000; read the printed port instead.

---

## 5. Expected SharePoint schema

The app owns these five lists. Names are case-sensitive in this codebase.

### `CDCs`

| Column | Type | Notes |
| --- | --- | --- |
| `Title` | built-in text | Duplicated from `CDC_No` so the list is readable in SharePoint. |
| `CDC_No` | Text | Canonical CDC number, stored uppercase by the app. |
| `Customer` | Text | |
| `Consignee` | Text | |
| `Shipper` | Text | |
| `Note` | Note (multiline) | |
| `Active` | Boolean | Default `true`. |
| `Issued_Date` | DateTime | |
| `Expires_Date` | DateTime | |
| `Created_At` | DateTime | Written as metadata by older code; may be blank. |
| `Updated_Count` | Number | Reserved. |

### `Items`

| Column | Type | Notes |
| --- | --- | --- |
| `Title` | built-in text | Duplicated from `Item_No`. |
| `CDC_ID` | **Text** | Stores the CDC list-item id. Legacy rows may store the CDC number; both are resolved on read. |
| `Item_No` | Text | Unique per CDC in the SQLite backend; SharePoint has no composite constraint, so the store checks duplicates and returns 409. |
| `Description` | Note (multiline) | |
| `Unit` | Text | Default `PCS`. |
| `Location` | Text | |
| `Target_Qty` | Number | Alert target. `0` disables the alert. |
| `Reorder_Pct` | Number | Default `30`. |
| `Opening_Qty` | Number | Opening balance. |
| `Unit_Price` | Number | |
| `Total_Price` | Number | |
| `Remarks` | Note (multiline) | |
| `Active` | Boolean | Archived items are excluded from active alerts. |
| `Created_At` | DateTime | May be blank. |
| `Updated_Count` | Number | Reserved. |
| `Group_Label` | Text | Grouping/order label. |
| `Group_Order` | Number | |

### `Movements`

| Column | Type | Notes |
| --- | --- | --- |
| `Title` | built-in text | `"<TYPE> <invoice or item no>"`. |
| `Item_ID` | **Text** | Stores the Items list-item id. Legacy rows may store the item number; both are resolved on read. |
| `Type` | Choice | `IN`, `OUT`, `ADJ`. |
| `Qty` | Number | `IN`/`OUT` must be `> 0`; `ADJ` may be negative but not zero. |
| `Invoice_No` | Text | |
| `Reference` | Text | |
| `Counterparty` | Text | |
| `Note` | Note (multiline) | |
| `Occurred_At` | DateTime | Local date stored as `YYYY-MM-DDT00:00:00Z`. |
| `Created_At` | DateTime | |
| `Updated_Count` | Number | Reserved. |
| `Item_Name` | Text | Denormalized description for readability. |
| `CDC_No` | Text | Denormalized CDC number for readability. |

### `Imports`

| Column | Type | Notes |
| --- | --- | --- |
| `Title` | built-in text | Filename. |
| `Filename` | Text | |
| `Direction` | Choice | `IN`, `OUT`. |
| `Row_Count` | Number | |
| `Created_Count` | Number | |
| `Skipped_Count` | Number | |
| `Created_At` | DateTime | |
| `Started_At` | DateTime | |
| `Completed_At` | DateTime | |
| `Status` | Choice | `Completed`, `Failed`, `Pending`. |
| `Error_Message` | Note (multiline) | |
| `File_Size` | Number | |
| `Lines_Read` | Number | |
| `Import_ID` | Text | Reserved. |

### `Master_Imports`

| Column | Type | Notes |
| --- | --- | --- |
| `Title` | built-in text | Filename. |
| `CDC_ID` | Text | CDC list-item id. |
| `Filename` | Text | |
| `Sheet_Name` | Text | |
| `Group_Count` | Number | |
| `Row_Count` | Number | |
| `Created_Count` | Number | |
| `Updated_Count` | Number | |
| `Skipped_Count` | Number | |
| `Created_At` | DateTime | |
| `CDC_Name` | Text | |
| `Update_Required` | Boolean | |
| `Import_Status` | Choice | `Pending`, `Completed`, `Failed`. |

Startup repair only **adds missing columns**. It never deletes a column, changes
a type, or rewrites existing rows. A column created with the wrong type must be
fixed manually in SharePoint.

---

## 6. Verify through the HTTP API

Start the server, then use the printed base URL. The examples below assume
`http://127.0.0.1:3000`.

### 6.1 Read-only checks

```powershell
$base = 'http://127.0.0.1:3000'
foreach ($p in @('/api/bootstrap','/api/items','/api/cdcs','/api/movements','/api/imports','/api/export/balances.csv','/api/export/movements.csv')) {
  try {
    $r = Invoke-WebRequest -Uri "$base$p" -UseBasicParsing -TimeoutSec 120
    "$p -> $($r.StatusCode) ($($r.RawContentLength) bytes)"
  } catch {
    "$p -> ERROR $($_.Exception.Message)"
  }
}
```

Expected: every line is `200`. `/api/bootstrap` also contains `dashboard`, which
the client uses for KPIs and alerts.

There is no `/api/dashboard` route. The dashboard is part of `/api/bootstrap`.

### 6.2 Write roundtrip (creates and removes a temporary record)

This is the only reliable proof that writes work. It touches the live site, so
use clearly temporary values and make sure the cleanup lines run.

```powershell
$base = 'http://127.0.0.1:3000'
$h = @{ 'Content-Type' = 'application/json' }
$ts = (Get-Date).ToString('HHmmss')
$cdcNo = "ZZTMP-$ts"

try {
  # Create a CDC. Response shape: { cdc: {...} }
  $cdc = (Invoke-RestMethod -Uri "$base/api/cdcs" -Method Post -Headers $h -Body (@{
    cdc_no = $cdcNo; customer = 'tmp'; active = $true
  } | ConvertTo-Json)).cdc

  # Create an item. Response shape: { item: {...} }
  $item = (Invoke-RestMethod -Uri "$base/api/items" -Method Post -Headers $h -Body (@{
    cdc_id = $cdc.id; item_no = "TMPITEM-$ts"; description = 'tmp'
    unit = 'PCS'; target_qty = 10; reorder_pct = 20; opening_qty = 5
  } | ConvertTo-Json)).item

  # Create a movement. Response shape: { movement: {...}, item: {...} }
  $mv = (Invoke-RestMethod -Uri "$base/api/movements" -Method Post -Headers $h -Body (@{
    item_id = $item.id; type = 'IN'; qty = 3; invoice_no = 'TMP'
    occurred_at = (Get-Date -Format 'yyyy-MM-dd')
  } | ConvertTo-Json)).movement

  # Item drawer: derived balance must be 5 + 3 = 8
  $drawer = Invoke-RestMethod -Uri "$base/api/items/$($item.id)"
  "balance=$($drawer.item.balance) status=$($drawer.item.status) movements=$($drawer.movements.Count)"

  # Update
  $patched = Invoke-RestMethod -Uri "$base/api/items/$($item.id)" -Method Patch -Headers $h -Body (@{
    description = 'tmp-updated'
  } | ConvertTo-Json)
  "patched=$($patched.item.description)"
}
finally {
  # Cleanup in dependency order: movement -> item -> CDC
  if ($mv)   { Invoke-RestMethod -Uri "$base/api/movements/$($mv.id)" -Method Delete | Out-Null }
  if ($item) { Invoke-RestMethod -Uri "$base/api/items/$($item.id)" -Method Delete | Out-Null }
  if ($cdc)  { Invoke-RestMethod -Uri "$base/api/cdcs/$($cdc.id)" -Method Delete | Out-Null }
  "cleanup attempted"
}
```

Pass criteria: `balance=8`, `status=ok`, `movements=1`, `patched=tmp-updated`,
then no `ZZTMP-*` CDC and no `TMPITEM-*` item remain.

If a run fails halfway, remove leftovers before retrying:

```powershell
$base = 'http://127.0.0.1:3000'
$items = (Invoke-RestMethod -Uri "$base/api/items").items
$mvs = (Invoke-RestMethod -Uri "$base/api/movements?limit=500").movements
foreach ($it in ($items | Where-Object { $_.item_no -like 'TMPITEM-*' })) {
  foreach ($m in ($mvs | Where-Object { "$($_.item_id)" -eq "$($it.id)" })) {
    Invoke-RestMethod -Uri "$base/api/movements/$($m.id)" -Method Delete | Out-Null
  }
  Invoke-RestMethod -Uri "$base/api/items/$($it.id)?force=1" -Method Delete | Out-Null
}
foreach ($c in ((Invoke-RestMethod -Uri "$base/api/cdcs").cdcs | Where-Object { $_.cdc_no -like 'ZZTMP-*' })) {
  Invoke-RestMethod -Uri "$base/api/cdcs/$($c.id)" -Method Delete | Out-Null
}
```

### 6.3 Read-only site inspection script

Use this when you need to see what is actually on the site. It reads only.

Save as `check-sharepoint.mjs` in the project root, run `node check-sharepoint.mjs`,
then delete it.

```js
import './src/env.js';
import { getSharePointContext } from './src/sharepoint-service.js';

const EXPECTED = {
  CDCs: ['CDC_No', 'Customer', 'Consignee', 'Shipper', 'Note', 'Active', 'Issued_Date', 'Expires_Date'],
  Items: ['CDC_ID', 'Item_No', 'Description', 'Unit', 'Location', 'Target_Qty', 'Reorder_Pct', 'Opening_Qty', 'Unit_Price', 'Total_Price', 'Remarks', 'Active', 'Group_Label', 'Group_Order'],
  Movements: ['Item_ID', 'Type', 'Qty', 'Invoice_No', 'Reference', 'Counterparty', 'Note', 'Occurred_At'],
  Imports: ['Filename', 'Direction', 'Row_Count', 'Created_Count', 'Skipped_Count'],
  Master_Imports: ['CDC_ID', 'Filename', 'Sheet_Name', 'Group_Count', 'Row_Count'],
};

const { client, siteId } = await getSharePointContext();

const lists = [];
let next = `/sites/${siteId}/lists?$select=id,displayName,name&$top=999`;
while (next) {
  const res = await client.api(next).get();
  lists.push(...(res.value || []));
  next = res['@odata.nextLink'] || null;
}

const byName = new Map(lists.map((l) => [l.displayName || l.name, l]));
let failed = false;

for (const [name, required] of Object.entries(EXPECTED)) {
  const list = byName.get(name);
  if (!list) {
    console.log(`FAIL ${name}: list not found`);
    failed = true;
    continue;
  }

  let count = 0;
  let page = `/sites/${siteId}/lists/${list.id}/items?$select=id&$top=999`;
  while (page) {
    const res = await client.api(page).get();
    count += (res.value || []).length;
    page = res['@odata.nextLink'] || null;
  }

  const columns = (await client
    .api(`/sites/${siteId}/lists/${list.id}/columns?$select=name,displayName&$top=999`)
    .get()).value || [];
  const names = new Set(columns.map((c) => c.name));
  const missing = required.filter((c) => !names.has(c));

  if (missing.length) {
    console.log(`FAIL ${name}: ${count} rows, missing ${missing.join(', ')}`);
    failed = true;
  } else {
    console.log(`PASS ${name}: ${count} rows, all required columns present`);
  }
}

console.log('\nAll lists on the site:');
for (const list of lists) console.log(`  - ${list.displayName || list.name}`);

process.exitCode = failed ? 1 : 0;
```

---

## 7. Graph rules that break writes

Read this before changing field names, `resolveFields`, or the auto-creator.
Most "it works on SQLite but not SharePoint" bugs live here.

### 7.1 The title column is `LinkTitle` but you must write `Title`

On modern lists, Graph reports the built-in title column as:

```json
{ "name": "LinkTitle", "displayName": "Title" }
```

Posting `{"LinkTitle": "..."}` fails with:

```text
SharePoint create in "CDCs" failed: Field 'LinkTitle' is read-only
```

Posting `{"Title": "..."}` works. `src/sharepoint-service.js` handles this in
`mapFieldNames()`:

- exact column-name match wins;
- otherwise display-name / normalized-name aliases are used;
- read-only system columns (`LinkTitle`, `LinkTitleNoMenu`, `Edit`, `DocIcon`,
  `ContentType`, `Attachments`, `Created`, `Modified`, `Author`, `Editor`,
  `ComplianceAssetId`, and anything starting with `_`) are excluded from alias
  resolution;
- `Title` falls back to the literal field name `Title`.

`test/sharepoint-service.test.js` locks this behavior in. Do not remove it.

### 7.2 Internal names differ from display names

A column created as `CDC No.` gets the internal name `CDC_x0020_No`. The app
normalizes `_xNNNN_` escapes, strips non-alphanumerics and lowercases, so
`CDC No.`, `CDC_No` and `CDC_x0020_No` all match. When both a canonical column
and a legacy display-name column exist, prefer the canonical exact name.

### 7.3 Choice columns need choices

Graph rejects a choice column with an empty choice list:

```js
choice: { allowTextEntry: false, choices: ['IN', 'OUT', 'ADJ'] }
```

The auto-creator supplies choices for `Type`, `Direction`, `Status` and
`Import_Status`. If you add a choice field, add its choices too.

### 7.4 Multiline text

Use `text: { allowMultipleLines: true }`. `Description`, `Note`, `Remarks` and
`Error_Message` are multiline.

### 7.5 Dates

Write `YYYY-MM-DDT00:00:00Z`. Read with `dateOnly()` from `src/dates.js`, which
uses local date parts. Do **not** use `toISOString()` for user-facing dates:
the users are UTC+7 and late-night dates would shift to the previous day.

### 7.6 Paging

Every list read follows `@odata.nextLink`. A 3,000-row list spans several
pages. Never assume the first page is the whole list. `$top=999` is the maximum
Graph accepts for list items.

### 7.7 Caching

`createSharePointStore()` keeps one snapshot of CDCs + Items + Movements for
`SHAREPOINT_CACHE_TTL` ms (default 3000) and an imports cache with the same TTL.
Every write calls `invalidate()`.

Consequences:

- After editing rows directly in SharePoint, the app may show stale data for up
  to the TTL. Set `SHAREPOINT_CACHE_TTL=0` when diagnosing.
- Concurrent reads share one in-flight snapshot (`loading`), so a page load does
  not trigger duplicate Graph reads.
- Tests set `SHAREPOINT_CACHE_TTL=0` for determinism.

### 7.8 Legacy references

`Items.CDC_ID` and `Movements.Item_ID` are text fields, not Graph lookups.

- If `CDC_ID` is not a numeric list-item id, the store tries to match it to a
  CDC number.
- If `Item_ID` is not a numeric item id, the store tries to match it to an item
  number.

This keeps manually created or older rows working. Keep the fallback when
editing `mapItem()` / the movement enrichment in `src/sharepoint-store.js`.

### 7.9 Uniqueness and validation

- Item numbers are uppercase and unique per CDC. SQLite enforces
  `UNIQUE(cdc_id, item_no)`; SharePoint does not, so the store checks before
  writing and returns 409 on duplicates.
- Movement types are `IN`, `OUT`, `ADJ`. `IN`/`OUT` quantities must be `> 0`;
  `ADJ` may be negative but not zero.
- Import dedupe key is `item_id + invoice_no + type`.

### 7.10 Bulk writes and master-import jobs

`src/sharepoint-service.js` exposes two batch helpers:

- `createSharePointItemsBatch(listName, rows)` — `POST /$batch` with up to
  `SHAREPOINT_BATCH_SIZE` creates (default `20`; Graph's hard limit is 20).
- `updateSharePointItemsBatch(listName, updates)` — the same for
  `PATCH .../items/{id}/fields`.

Behaviour that must be preserved:

- Sub-request failures are returned per row (`{ index, ok, message }`); the
  store aborts with `Row <line>: <message>` instead of silently skipping.
- `429`/`503` responses are retried with `Retry-After` or exponential backoff,
  both for the whole batch and for individual throttled sub-requests.
- If Graph rejects `$batch` itself (`400`, `404`, `405`, `501`), the service
  sets an in-process `batchSupported = false` flag and returns `null`. The store
  then falls back to single writes. `SHAREPOINT_BATCH_CONCURRENCY` (default `1`,
  max `8`) controls how many fallback writes may run in parallel.
- `commitMaster()` precomputes the item-number map, group order and balances, so
  a 3,000-row import no longer scans the item list once per row.

`POST /api/master/commit` is asynchronous:

- Default: `202 { job_id, total }`; poll `GET /api/master/jobs/:id` until
  `status` is `done` or `error`. The job reports `processed`, `total`,
  `percent`, `created`, `updated`, `skipped` and `adjusted`.
- `?sync=1`: old blocking `201` with the commit result. Use this for scripts and
  regression checks.
- Jobs live in memory for ten minutes after they finish. A restart cancels a
  running import; rerun it (the import is idempotent when `update_existing` is
  used).

The batch path was smoke-tested against the live site with two temporary
`Master_Imports` rows (create + update + delete) and is covered by the fake
service tests.

---

## 8. When the site already contains data in other lists

This is the most common source of "the migration worked but everything is
empty". The app only reads `CDCs`, `Items`, `Movements`, `Imports` and
`Master_Imports`. A site can have a full production dataset in lists with other
names.

### 8.1 Discover what is there

Run the read-only script from section 6.3. It prints every list and the row
count for the five app lists. To count all lists, remove the `EXPECTED` filter
and page each list.

Real example from a site that had already been used before this app:

| List | Rows | Notes |
| --- | ---: | --- |
| `MLC_Master_List` | 2,969 | The real item master. |
| `MLC_CDC_List` | 3 | The real CDC master. |
| `MLC_CaseMark_Detail` | 1,630 | Unrelated. |
| `MLC_Cut_Stock_History` | 51 | Only a `UUID` column populated. |
| `MLC_Setting` | 24 | Unrelated. |
| `MLC_Track_PA_Flows` | 19 | Unrelated. |
| `MLC_User_Authentication` | 5 | Unrelated. |
| `PCP_Cigma_Import` | 41 | Unrelated. |
| `CDCs` | 3 | App list, test rows only. |
| `Items` | 2 | App list, test rows only. |
| `Movements` | 2 | App list, test rows only. |
| `Imports` | 1 | App list, test rows only. |
| `Master_Imports` | 0 | App list. |
| `MLCv2_CDC_Register` | 0 | Empty. |

Observed `MLC_Master_List` columns:

```text
Title, CDC_No, No, Unit, Description_Of_Goods, Quantity, Unit_Price,
Total_Price, Remarks, Group, Date_Of_Issue, Date_Of_Expiry, UUID,
Current_Balance, Invoices, Year
```

Observed `MLC_CDC_List` columns:

```text
Title, Active, Issue_Date, Expiry_Date
```

Observed distribution at the time of inspection:

```text
testCDC1                 1484 rows
QIP097/14PPSEZ04779      1483 rows
QIP097/14PPSEZ05435         1 row
QIP097/14PPSEZ04889         1 row
```

`MLC_CDC_List.Title` values matched three of those four CDC numbers.
`testCDC1` had no matching CDC row. `Current_Balance` was blank for all 2,969
rows; `Quantity` was populated for all of them.

### 8.2 Choose an approach

**Option A — migrate the existing rows into the app lists (recommended).**

- Keeps the app's data model and derived-balance invariant.
- Leaves the existing `MLC_*` lists untouched as the historical source.
- Needs a one-off script that creates CDCs first, then items, mapping
  `CDC_No` → new CDC list-item id.
- Must decide what seeds the opening balance (see below).

**Option B — point the app at the existing lists.**

- Requires new configuration (the list names are hardcoded in `LIST` in
  `src/sharepoint-store.js` today) plus field aliases for `No`,
  `Description_Of_Goods`, `Quantity`, `Group`, `Issue_Date`, `Expiry_Date`.
- Requires adding the missing app columns to the production lists
  (`Opening_Qty`, `Target_Qty`, `Reorder_Pct`, `Location`, `Active`,
  `Group_Label`, `Group_Order`, `Customer`, `Consignee`, `Shipper`, `Note`).
- Writes then go directly into production lists, and there is no movement
  history to derive balances from.
- Do this only if the existing lists must remain the system of record.

**Option C — keep the app lists as the system of record.**

- Correct if the two test items are intentional and the real data will be
  imported through the app's master import.

### 8.3 Mapping table for Option A

| App field | Source column | Rule |
| --- | --- | --- |
| `CDCs.CDC_No` | `MLC_CDC_List.Title` | Uppercase. Create a CDC for orphan item CDC numbers (for example `testCDC1`). |
| `CDCs.Active` | `MLC_CDC_List.Active` | Default `true`. |
| `CDCs.Issued_Date` | `MLC_CDC_List.Issue_Date` | `dateOnly()`. |
| `CDCs.Expires_Date` | `MLC_CDC_List.Expiry_Date` | `dateOnly()`. |
| `Items.CDC_ID` | `MLC_Master_List.CDC_No` | Resolve to the new CDC list-item id, not the number. |
| `Items.Item_No` | `MLC_Master_List.No` | Uppercase; check duplicates per CDC. |
| `Items.Description` | `MLC_Master_List.Description_Of_Goods` | |
| `Items.Unit` | `MLC_Master_List.Unit` | Default `PCS`. |
| `Items.Opening_Qty` | `MLC_Master_List.Quantity` | Decision required; see below. |
| `Items.Unit_Price` | `MLC_Master_List.Unit_Price` | |
| `Items.Total_Price` | `MLC_Master_List.Total_Price` | |
| `Items.Remarks` | `MLC_Master_List.Remarks` | |
| `Items.Group_Label` | `MLC_Master_List.Group` | |
| `Items.Target_Qty` | — | Not present; default `0` (alerts off) or derive. |
| `Items.Reorder_Pct` | — | Not present; default `30`. |
| `Items.Location` | — | Blank. |
| `Items.Active` | — | `true`. |
| `Items.Group_Order` | — | Assign per group order of first appearance. |

Opening-balance decision:

- Use `Quantity` → balance equals the migrated quantity, and future
  movements adjust from there. Simple and consistent with the app's model.
- Use `Current_Balance` → **not possible on this site**, because the column is
  blank for every row. Do not trust a stored balance anyway; the app derives it.

Migration pitfalls:

- There is no movement history in `MLC_Master_List`, so migrated balances are
  opening balances only.
- Duplicate `(CDC_No, No)` pairs would violate the app's uniqueness rule. Check
  before writing; the sample had no duplicates but verify on the real data.
- `testCDC1` items cannot be linked unless a CDC row is created for it.
- The app's own master import now uses Graph `$batch` and reports progress. A
  one-off migration script should do the same (or call
  `POST /api/master/commit?sync=1` for small batches): batch, log progress, and
  make the script idempotent (skip existing `cdc + item_no`).
- Do not write to `MLC_Master_List` or `MLC_CDC_List` during migration.

---

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `invalid_client` / `AADSTS7000215` | Wrong or expired client secret. | Create a new secret and update `.env`. |
| `AADSTS700016` / `unauthorized_client` | Wrong tenant or client id. | Re-copy both ids from the app registration. |
| `403 Forbidden` / `accessDenied` | Missing admin consent, or `Sites.Selected` without a per-site grant. | Grant consent; grant the app access to the specific site. |
| `404 itemNotFound` on site lookup | `SHAREPOINT_SITE_URL` points at the wrong path. | Use the full sub-site path; it becomes `hostname:pathname`. |
| `SharePoint list "X" was not found. Lists on the site: ...` | Wrong site, or the list was renamed. | Fix the site URL or create/rename the list; the message lists what exists. |
| `SharePoint list "X" is missing column(s): ...` | Schema drift; auto-create is off or failed. | Set `AUTO_CREATE_SHAREPOINT_LISTS=true`, restart, or add the columns manually. |
| `Field 'LinkTitle' is read-only` | Code wrote the title through its internal name. | Keep the `Title` fallback in `mapFieldNames()`; see section 7.1. |
| `Invalid request` when creating a Choice value | Choice column lacks the value. | Add the value to the column's choices. |
| UI is blank but API returns 200 with empty arrays | Data lives in other lists. | Section 8. |
| UI shows an error toast / API returns 502 | Graph call failed; the message is in the response body. | Read the message; fix auth/site/schema. Do not swallow it. |
| Dates are one day off | `toISOString()` used somewhere. | Use `dateOnly()` / `today()` from `src/dates.js`. |
| Import is very slow or returns 429 | `$batch` was rejected and the fallback is single writes, or Graph is throttling. | Check the server log for a batch fallback; lower `SHAREPOINT_BATCH_SIZE`, keep `SHAREPOINT_BATCH_CONCURRENCY=1`, retry with backoff, run off-peak. |
| Data changed in SharePoint is not visible | Snapshot cache. | Wait for `SHAREPOINT_CACHE_TTL`, or set it to `0` while diagnosing. |
| Server starts on 3001+ | Port 3000 is busy. | Use the printed port. Do not kill the process on 3000. |
| Tests fail after setting `USE_SHAREPOINT=true` | `.env` leaked into the test run. | Tests must not load `.env`; run `npm test` from a clean shell. |

---

## 10. Agent checklist

Copy this into the task and tick each item.

- [ ] Read `AGENTS.md` and this file.
- [ ] Confirm `src/store.js` is still the only backend selector.
- [ ] Confirm `server.js` imports `./src/env.js` before anything that reads env.
- [ ] Configure `.env` with the four SharePoint values and `USE_SHAREPOINT=true`.
- [ ] `npm.cmd start` → see Graph connected, site name, 5/5 lists.
- [ ] Run the read-only API checks → all 200.
- [ ] Run the write roundtrip → balance/status/update correct.
- [ ] Remove all temporary `ZZTMP-*` and `TMPITEM-*` rows.
- [ ] Run `node --check` on every changed JS file.
- [ ] Run `npm.cmd test` → 23 pass, 0 fail.
- [ ] Confirm no `.env`, `data/`, `*.db*`, `node_modules/` or logs are staged.
- [ ] If data is in `MLC_*` lists, record the decision from section 8 in the task.

Useful commands:

```powershell
npm.cmd start
npm.cmd test
node --check src/sharepoint-service.js
node --check src/sharepoint-store.js
node --check server.js
```

---

## 11. Safety rules

- Never commit `.env`, secrets, `data/`, `*.db*`, `node_modules/` or logs.
- Never auto-seed or auto-reset a real database or a real SharePoint site.
- Do not delete rows you did not create. The only exception is the temporary
  roundtrip rows from section 6.2, and you must remove them.
- Do not kill whatever is listening on port 3000. The app falls back to 3001+.
- Do not add dependencies for SharePoint work; the Graph packages are already
  present.
- Do not write a balance column to `Items`. Balances stay derived.
- Keep `npm test` green. Tests use temporary SQLite databases and an in-memory
  fake SharePoint service; they must never touch the live site.

---

## 12. Known-good reference

At the time this playbook was written, the following sequence was verified
against a real site:

1. Startup connected to the site and reported all five lists present.
2. `GET /api/bootstrap`, `/api/items`, `/api/cdcs`, `/api/movements`,
   `/api/imports`, `/api/export/balances.csv`, `/api/export/movements.csv`
   all returned 200.
3. CDC → item → movement creation returned 201; the item drawer reported the
   derived balance and `status=ok`; PATCH updated the description; DELETE
   removed movement, item and CDC in order.
4. `npm test` passed 23/23.

The only write bug found during that verification was the `LinkTitle`
read-only error. It is fixed by `mapFieldNames()` and covered by
`test/sharepoint-service.test.js`. If a new site fails on writes, check that
fix first.
