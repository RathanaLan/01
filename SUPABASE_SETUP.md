# Supabase Auth setup

The login page uses Supabase Auth email OTP for registration and sign-in. Users enter their email, receive a short verification code, and enter it on the page. Supabase Auth uniquely identifies accounts by email, so reusing an email signs into the existing account rather than creating a duplicate. Display name is saved as optional Auth user metadata; this site does not create a separate profile table or store passwords.

## 1. Create a Supabase project

Create a project in the Supabase dashboard. In **Project Settings → API**, copy the Project URL and the public publishable key (or legacy `anon` key).

## 2. Configure the website

Edit `assets/js/supabase-config.js`:

```js
window.PORTFOLIO_SUPABASE_CONFIG = Object.freeze({
  url: "https://YOUR_PROJECT_ID.supabase.co",
  publishableKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
});
```

Replace both placeholder strings with values from your own project. The publishable/anon key is intended for browser use. Never put a Supabase `service_role` or secret key in this static site or commit it to Git.

## 3. Configure email auth and redirects

In Supabase **Authentication → Providers → Email**, enable email sign-in. In **Authentication → Email Templates → Magic Link**, edit the message to include the one-time code variable, for example:

```html
<h2>Your sign-in code</h2>
<p>Enter this code on the sign-in page:</p>
<p style="font-size: 24px; font-weight: bold; letter-spacing: 6px;">
  {{ .Token }}
</p>
```

The page verifies this numeric code through Supabase's email `verifyOtp` flow. Set an appropriate OTP expiry in the Email provider settings. For production, configure a trusted SMTP provider; Supabase's built-in email service is intended mainly for testing and is rate-limited.

In **Authentication → URL Configuration**, set the site URL and add the development and production redirect URLs. Examples:

- Local development: `http://localhost:5500/**` (use your actual local server port)
- GitHub Pages: `https://YOUR_GITHUB_NAME.github.io/YOUR_REPOSITORY/**`
- Custom domain: `https://YOUR_DOMAIN/**`

Open `login.html` through localhost or HTTPS when testing authentication. A `file://` URL is not a valid auth redirect origin.

## 4. Test

Run `login.html` on localhost or the deployed HTTPS site. Choose **Create an account**, enter a name and email, request the code, and verify it. Then sign in with that email; the same email is associated with the existing account rather than duplicated. “Keep me signed in” uses persistent browser storage; unchecked uses session-only storage.

## Important access limitation

GitHub Pages serves static files publicly. Supabase Auth stores and authenticates accounts, but it does **not** protect `index.html` or other repository assets from direct public access. Do not put confidential content in this repository. To make the portfolio itself private, serve protected content through a backend or a hosting platform with access-control middleware. For invite-only accounts, disable unrestricted self-registration in the project’s Auth policy/settings and invite approved users through Supabase.

## Profile editor and account deletion

The homepage links to `profile.html`. It requires an active Supabase session and lets the signed-in user edit only their own profile row. Apply `supabase/migrations/202609290001_profiles.sql` with `supabase db push` or run it in the Supabase SQL editor. It creates the private `profiles` table, new-user profile trigger, RLS policies, and a private `profile-photos` bucket. Read, upload, update, and delete policies restrict access to the authenticated user's own UUID folder. The editor creates short-lived signed URLs for that user's photo.

Account deletion runs through `supabase/functions/delete-account/index.ts`; deleting an Auth account requires the service-role key, which must stay server-side. Link the CLI to the project and deploy the function:

```sh
supabase link --project-ref YOUR_PROJECT_ID
supabase db push
supabase functions deploy delete-account
```

Supabase Edge Functions provide `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` server-side. Never copy the service-role key into any browser JavaScript or other `assets/` file. After setup, sign in, save a profile and photo, sign out and back in, then verify updates and deletion using a disposable test account. The owner can also manage users from Supabase **Authentication → Users**.
