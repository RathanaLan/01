/**
 * Chamroeun Nheat Saving Cooperative - Enterprise Web Control Engine
 * Dual-Mode Savings (Flexible & Fixed Term) + Supabase Cloud Database Integration
 */

// --- Default Data from User's Uploaded Passbook Photos (21 Months) ---
const DEFAULT_FLEXIBLE_DATA = [
  // Page 1: 2025 - 2026 (12 Months)
  { id: 1, page: 1, seq: 1, date: "05.02.25", opening: 25343900, rate: 0.8, interest: 202700, deposit: 700000, withdrawal: 0, closing: 26246600, signed: true },
  { id: 2, page: 1, seq: 2, date: "05.03.25", opening: 26246600, rate: 0.8, interest: 209900, deposit: 700000, withdrawal: 0, closing: 27156500, signed: true },
  { id: 3, page: 1, seq: 3, date: "05.04.25", opening: 27156500, rate: 0.8, interest: 217200, deposit: 700000, withdrawal: 0, closing: 28073700, signed: true },
  { id: 4, page: 1, seq: 4, date: "05.05.25", opening: 28073700, rate: 0.8, interest: 224500, deposit: 700000, withdrawal: 0, closing: 28998200, signed: true },
  { id: 5, page: 1, seq: 5, date: "05.06.25", opening: 28998200, rate: 0.8, interest: 231900, deposit: 700000, withdrawal: 0, closing: 29930100, signed: true },
  { id: 6, page: 1, seq: 6, date: "05.07.25", opening: 29930100, rate: 0.8, interest: 239400, deposit: 700000, withdrawal: 0, closing: 30869500, signed: true },
  { id: 7, page: 1, seq: 7, date: "05.08.25", opening: 30869500, rate: 0.8, interest: 246900, deposit: 700000, withdrawal: 0, closing: 31816400, signed: true },
  { id: 8, page: 1, seq: 8, date: "05.09.25", opening: 31816400, rate: 0.8, interest: 254500, deposit: 700000, withdrawal: 0, closing: 32770900, signed: true },
  { id: 9, page: 1, seq: 9, date: "05.10.25", opening: 32770900, rate: 0.8, interest: 262100, deposit: 11800000, withdrawal: 0, closing: 44833000, signed: true },
  { id: 10, page: 1, seq: 10, date: "05.11.25", opening: 44833000, rate: 0.8, interest: 358600, deposit: 700000, withdrawal: 0, closing: 45891600, signed: true },
  { id: 11, page: 1, seq: 11, date: "05.12.25", opening: 45891600, rate: 0.8, interest: 367100, deposit: 700000, withdrawal: 0, closing: 46958700, signed: true },
  { id: 12, page: 1, seq: 12, date: "05.01.26", opening: 46958700, rate: 0.8, interest: 375600, deposit: 700000, withdrawal: 0, closing: 48034300, signed: true },

  // Page 2: 2026 - 2027 (Recorded up to Month 9)
  { id: 13, page: 2, seq: 1, date: "05.02.26", opening: 48034300, rate: 0.8, interest: 384200, deposit: 700000, withdrawal: 0, closing: 49118500, signed: true },
  { id: 14, page: 2, seq: 2, date: "05.03.26", opening: 49118500, rate: 0.8, interest: 392900, deposit: 700000, withdrawal: 0, closing: 50211400, signed: true },
  { id: 15, page: 2, seq: 3, date: "05.04.26", opening: 50211400, rate: 0.8, interest: 401600, deposit: 700000, withdrawal: 0, closing: 51313000, signed: true },
  { id: 16, page: 2, seq: 4, date: "05.05.26", opening: 51313000, rate: 0.8, interest: 410500, deposit: 2600000, withdrawal: 0, closing: 54323500, signed: true },
  { id: 17, page: 2, seq: 5, date: "05.06.26", opening: 54323500, rate: 0.8, interest: 434500, deposit: 700000, withdrawal: 0, closing: 55458000, signed: true },
  { id: 18, page: 2, seq: 6, date: "05.07.26", opening: 55458000, rate: 0.8, interest: 443600, deposit: 8600000, withdrawal: 0, closing: 64501600, signed: true },
  { id: 19, page: 2, seq: 7, date: "05.08.26", opening: 64501600, rate: 0.8, interest: 516000, deposit: 2600000, withdrawal: 0, closing: 67617600, signed: true },
  { id: 20, page: 2, seq: 8, date: "05.09.26", opening: 67617600, rate: 0.8, interest: 540900, deposit: 700000, withdrawal: 0, closing: 68858500, signed: true },
  { id: 21, page: 2, seq: 9, date: "05.10.26", opening: 68858500, rate: 0.8, interest: 550800, deposit: 700000, withdrawal: 0, closing: 70109300, signed: true }
];

// --- Default Data for Fixed Term Deposits (Mode 2) ---
const DEFAULT_FIXED_DEPOSITS = [
  {
    id: "ftd-1",
    depositCode: "CN-FTD-2026-001",
    title: "បញ្ញើមានកាលកំណត់ ១២ ខែ (Fixed Deposit #1)",
    principal: 10000000, // 10 Million KHR
    termMonths: 12,
    rateAnnual: 10.0,
    startDate: "05.05.2026",
    maturityDate: "05.05.2027",
    maturityPayout: 11000000, // 10M + 1M interest
    status: "ACTIVE",
    notes: "ទូទាត់ការប្រាក់ពេញលេញនៅថ្ងៃផុតកំណត់"
  },
  {
    id: "ftd-2",
    depositCode: "CN-FTD-2026-002",
    title: "បញ្ញើមានកាលកំណត់ ២៤ ខែ (Fixed Deposit #2)",
    principal: 20000000, // 20 Million KHR
    termMonths: 24,
    rateAnnual: 11.5,
    startDate: "05.08.2026",
    maturityDate: "05.08.2028",
    maturityPayout: 24600000, // 20M + 4.6M interest
    status: "ACTIVE",
    notes: "អត្រាការប្រាក់ពិសេស ២៤ ខែ"
  }
];

// --- Ready-to-paste SQL Schema for Supabase ---
const SUPABASE_SQL_SCHEMA = `-- Supabase SQL Schema for Chamroeun Nheat Saving Cooperative
-- Run this in your Supabase Dashboard > SQL Editor:

create table if not exists public.savings_flexible_records (
  id bigint primary key,
  seq int not null,
  date text not null,
  opening bigint not null,
  rate numeric not null default 0.8,
  interest bigint not null,
  deposit bigint not null default 0,
  withdrawal bigint not null default 0,
  closing bigint not null,
  signed boolean default true,
  page int default 1,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists public.savings_fixed_deposits (
  id text primary key,
  deposit_code text not null,
  title text not null,
  principal bigint not null,
  term_months int not null,
  rate_annual numeric not null,
  start_date text not null,
  maturity_date text not null,
  maturity_payout bigint not null,
  status text not null default 'ACTIVE',
  notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable public read & write (or customize RLS as needed)
alter table public.savings_flexible_records enable row level security;
alter table public.savings_fixed_deposits enable row level security;

create policy "Allow all operations for anon" on public.savings_flexible_records
  for all using (true) with check (true);

create policy "Allow all operations for anon on fixed" on public.savings_fixed_deposits
  for all using (true) with check (true);
`;

// --- Global Application State ---
const state = {
  currentMode: 'flexible', // 'flexible' (Mode 1) or 'fixed' (Mode 2)
  flexibleData: [],
  fixedData: [],
  currency: 'KHR', // 'KHR' or 'USD'
  exchangeRate: 4050, // 1 USD = 4,050 KHR
  isMasked: false,
  language: 'KM', // 'KM' or 'EN'
  activePassbookPage: 1, // 1 or 2
  currentFlexibleView: 'dashboard', // 'dashboard', 'passbook', 'projection', 'insights'
  simSettings: {
    monthlyDeposit: 700000,
    monthlyRate: 0.8,
    targetGoal: 100000000
  },
  supabase: {
    client: null,
    url: '',
    key: '',
    connected: false
  }
};

// Khmer Digits
const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
function toKhmerNum(num) {
  if (num === null || num === undefined) return '';
  return String(num).replace(/[0-9]/g, digit => KHMER_DIGITS[parseInt(digit, 10)]);
}

// Exact Cambodian Cooperative Nearest 100-Riel Floor Rule
function computeCoopInterest(openingBalance, ratePercent) {
  const rawInterest = (openingBalance * (ratePercent / 100));
  return Math.floor(rawInterest / 100) * 100;
}

// Format Currency
function formatMoney(amount, forceCurrency = null) {
  const curr = forceCurrency || state.currency;
  if (curr === 'USD') {
    const usd = (Number(amount) || 0) / state.exchangeRate;
    return '$' + usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return (Number(amount) || 0).toLocaleString('en-US') + ' ៛';
}

// --- Local Storage & Supabase Persistence ---
const STORAGE_FLEXIBLE_KEY = 'chamroeun_nheat_flexible_v3';
const STORAGE_FIXED_KEY = 'chamroeun_nheat_fixed_v3';
const STORAGE_SUPABASE_CONFIG = 'chamroeun_nheat_supabase_config_v1';

function loadInitialData() {
  // 1. Flexible Records
  const savedFlex = localStorage.getItem(STORAGE_FLEXIBLE_KEY);
  if (savedFlex) {
    try {
      state.flexibleData = JSON.parse(savedFlex);
    } catch (e) {
      state.flexibleData = JSON.parse(JSON.stringify(DEFAULT_FLEXIBLE_DATA));
    }
  } else {
    state.flexibleData = JSON.parse(JSON.stringify(DEFAULT_FLEXIBLE_DATA));
  }

  // 2. Fixed Term Deposits
  const savedFixed = localStorage.getItem(STORAGE_FIXED_KEY);
  if (savedFixed) {
    try {
      state.fixedData = JSON.parse(savedFixed);
    } catch (e) {
      state.fixedData = JSON.parse(JSON.stringify(DEFAULT_FIXED_DEPOSITS));
    }
  } else {
    state.fixedData = JSON.parse(JSON.stringify(DEFAULT_FIXED_DEPOSITS));
  }

  // 3. Supabase Credentials
  const savedSupa = localStorage.getItem(STORAGE_SUPABASE_CONFIG);
  if (savedSupa) {
    try {
      const cfg = JSON.parse(savedSupa);
      state.supabase.url = cfg.url || '';
      state.supabase.key = cfg.key || '';
      if (state.supabase.url && state.supabase.key) {
        initSupabaseClient(state.supabase.url, state.supabase.key);
      }
    } catch (e) {}
  }

  saveLocalData();
}

function saveLocalData() {
  localStorage.setItem(STORAGE_FLEXIBLE_KEY, JSON.stringify(state.flexibleData));
  localStorage.setItem(STORAGE_FIXED_KEY, JSON.stringify(state.fixedData));
}

// Recalculate cascade for Flexible Mode
function recalculateCascade() {
  if (!state.flexibleData || state.flexibleData.length === 0) return;

  for (let i = 0; i < state.flexibleData.length; i++) {
    const row = state.flexibleData[i];
    if (i > 0) {
      row.opening = state.flexibleData[i - 1].closing;
    }
    if (!row.rate) row.rate = 0.8;
    row.interest = computeCoopInterest(row.opening, row.rate);
    const deposit = Number(row.deposit) || 0;
    const withdrawal = Number(row.withdrawal) || 0;
    row.closing = row.opening + row.interest + deposit - withdrawal;
    row.page = i < 12 ? 1 : Math.floor(i / 12) + 1;
    row.seq = (i % 12) + 1;
  }
  saveLocalData();
}

// --- Supabase Cloud Client Integration ---
function initSupabaseClient(url, key) {
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      state.supabase.client = window.supabase.createClient(url, key);
      state.supabase.url = url;
      state.supabase.key = key;
      localStorage.setItem(STORAGE_SUPABASE_CONFIG, JSON.stringify({ url, key }));
      testSupabaseConnection();
    }
  } catch (err) {
    console.error("Supabase init error:", err);
    updateSupabaseStatus(false, "Init Failed: " + err.message);
  }
}

async function testSupabaseConnection() {
  if (!state.supabase.client) {
    updateSupabaseStatus(false, "Storage: Local Storage Mode (Offline)");
    return;
  }

  updateSupabaseStatus(null, "Connecting to Supabase...");
  try {
    const { data, error } = await state.supabase.client
      .from('savings_flexible_records')
      .select('count', { count: 'exact', head: true });

    if (error) {
      // Table might not exist yet
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.code === '42P01') {
        state.supabase.connected = true;
        updateSupabaseStatus(true, "Connected! (Tables pending: click 'Copy SQL')");
        showToast("ភ្ជាប់ Supabase ជោគជ័យ! សូមចុច 'ចម្លងកូដ SQL' ដើម្បីបង្កើតតារាង។", "success");
      } else {
        throw error;
      }
    } else {
      state.supabase.connected = true;
      updateSupabaseStatus(true, "🟢 Supabase Cloud Active");
      showToast("ភ្ជាប់ជាមួយ Supabase Database ជោគជ័យ ១០០%!", "success");
    }
  } catch (err) {
    console.warn("Supabase test warning:", err.message);
    state.supabase.connected = false;
    updateSupabaseStatus(false, "Offline / Check Supabase URL & Key");
  }
}

function updateSupabaseStatus(connected, text) {
  const dot = document.getElementById('supabaseIndicatorDot');
  const label = document.getElementById('supabaseStatusText');
  const modalMsg = document.getElementById('supabaseConnectMsg');

  if (dot && label) {
    if (connected === true) {
      dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      label.textContent = text || 'Supabase: Cloud Connected';
    } else if (connected === false) {
      dot.className = 'w-2 h-2 rounded-full bg-slate-400';
      label.textContent = text || 'Storage: Local Mode';
    } else {
      dot.className = 'w-2 h-2 rounded-full bg-amber-400 animate-ping';
      label.textContent = text || 'Connecting...';
    }
  }

  if (modalMsg) {
    modalMsg.classList.remove('hidden');
    if (connected === true) {
      modalMsg.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-950/60 border border-emerald-500/50 text-emerald-300';
      modalMsg.textContent = text;
    } else {
      modalMsg.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-950/60 border border-rose-500/50 text-rose-300';
      modalMsg.textContent = text;
    }
  }
}

// Push local data to Supabase
async function pushDataToSupabase() {
  if (!state.supabase.client) {
    alert("សូមបញ្ចូល Supabase URL និង Anon Key ជាមុនសិន!");
    return;
  }

  showToast("កំពុងបញ្ជូនទិន្នន័យទៅកាន់ Supabase...", "info");
  try {
    // 1. Push flexible
    const flexRows = state.flexibleData.map(r => ({
      id: r.id,
      seq: r.seq,
      date: r.date,
      opening: r.opening,
      rate: r.rate,
      interest: r.interest,
      deposit: r.deposit,
      withdrawal: r.withdrawal || 0,
      closing: r.closing,
      signed: r.signed || true,
      page: r.page || 1
    }));

    const { error: err1 } = await state.supabase.client
      .from('savings_flexible_records')
      .upsert(flexRows, { onConflict: 'id' });

    if (err1) throw err1;

    // 2. Push fixed
    const fixedRows = state.fixedData.map(f => ({
      id: f.id,
      deposit_code: f.depositCode,
      title: f.title,
      principal: f.principal,
      term_months: f.termMonths,
      rate_annual: f.rateAnnual,
      start_date: f.startDate,
      maturity_date: f.maturityDate,
      maturity_payout: f.maturityPayout,
      status: f.status || 'ACTIVE',
      notes: f.notes || ''
    }));

    const { error: err2 } = await state.supabase.client
      .from('savings_fixed_deposits')
      .upsert(fixedRows, { onConflict: 'id' });

    if (err2) throw err2;

    showToast("បាន Push ទិន្នន័យទាំងអស់ទៅកាន់ Cloud Supabase រួចរាល់!", "success");
  } catch (err) {
    alert("កំហុសក្នុងការបញ្ជូនទិន្នន័យ: " + err.message + "\n(សូមប្រាកដថាបាន Run កូដ SQL Schema ក្នុង Supabase Editor រួច)");
  }
}

// Fetch from Supabase
async function pullDataFromSupabase() {
  if (!state.supabase.client) {
    alert("សូមភ្ជាប់ Supabase ជាមុនសិន!");
    return;
  }

  showToast("កំពុងទាញយកទិន្នន័យពី Supabase...", "info");
  try {
    const { data: flexRows, error: err1 } = await state.supabase.client
      .from('savings_flexible_records')
      .select('*')
      .order('id', { ascending: true });

    if (err1) throw err1;

    if (flexRows && flexRows.length > 0) {
      state.flexibleData = flexRows.map(r => ({
        id: r.id,
        seq: r.seq,
        date: r.date,
        opening: Number(r.opening),
        rate: Number(r.rate),
        interest: Number(r.interest),
        deposit: Number(r.deposit),
        withdrawal: Number(r.withdrawal) || 0,
        closing: Number(r.closing),
        signed: r.signed,
        page: r.page
      }));
      recalculateCascade();
    }

    const { data: fixedRows, error: err2 } = await state.supabase.client
      .from('savings_fixed_deposits')
      .select('*');

    if (err2) throw err2;

    if (fixedRows && fixedRows.length > 0) {
      state.fixedData = fixedRows.map(f => ({
        id: f.id,
        depositCode: f.deposit_code,
        title: f.title,
        principal: Number(f.principal),
        termMonths: Number(f.term_months),
        rateAnnual: Number(f.rate_annual),
        startDate: f.start_date,
        maturityDate: f.maturity_date,
        maturityPayout: Number(f.maturity_payout),
        status: f.status,
        notes: f.notes
      }));
    }

    saveLocalData();
    renderAll();
    showToast("ទាញយកទិន្នន័យពី Cloud Supabase ជោគជ័យ!", "success");
  } catch (err) {
    alert("កំហុសក្នុងការទាញយកទិន្នន័យ: " + err.message);
  }
}

// --- DOM Elements ---
const dom = {
  // Mode Switchers
  modeFlexibleBtn: document.getElementById('modeFlexibleBtn'),
  modeFixedBtn: document.getElementById('modeFixedBtn'),
  flexibleModeContainer: document.getElementById('flexibleModeContainer'),
  fixedModeContainer: document.getElementById('fixedModeContainer'),
  flexibleSubTabsBar: document.getElementById('flexibleSubTabsBar'),
  activeAccountModeBadge: document.getElementById('activeAccountModeBadge'),
  mainAddActionBtn: document.getElementById('mainAddActionBtn'),
  mainAddActionLabel: document.getElementById('mainAddActionLabel'),

  // Header Actions
  togglePrivacyBtn: document.getElementById('togglePrivacyBtn'),
  eyeIconOpen: document.getElementById('eyeIconOpen'),
  eyeIconClosed: document.getElementById('eyeIconClosed'),
  currencyToggleBtn: document.getElementById('currencyToggleBtn'),
  currentCurrencyLabel: document.getElementById('currentCurrencyLabel'),
  altCurrencyLabel: document.getElementById('altCurrencyLabel'),
  langToggleBtn: document.getElementById('langToggleBtn'),
  currentLangLabel: document.getElementById('currentLangLabel'),
  printPassbookBtn: document.getElementById('printPassbookBtn'),
  exportCsvBtn: document.getElementById('exportCsvBtn'),

  // Flexible Sub-tabs
  tabDashboardBtn: document.getElementById('tabDashboardBtn'),
  tabPassbookBtn: document.getElementById('tabPassbookBtn'),
  tabProjectionBtn: document.getElementById('tabProjectionBtn'),
  tabInsightsBtn: document.getElementById('tabInsightsBtn'),
  viewDashboard: document.getElementById('viewDashboard'),
  viewPassbook: document.getElementById('viewPassbook'),
  viewProjection: document.getElementById('viewProjection'),
  viewInsights: document.getElementById('viewInsights'),

  // KPIs
  kpiBalanceValue: document.getElementById('kpiBalanceValue'),
  kpiBalanceGrowth: document.getElementById('kpiBalanceGrowth'),
  kpiInterestValue: document.getElementById('kpiInterestValue'),
  kpiInterestPercent: document.getElementById('kpiInterestPercent'),
  kpiDepositsValue: document.getElementById('kpiDepositsValue'),
  kpiInitialCapital: document.getElementById('kpiInitialCapital'),
  kpiLastMonthlyInterest: document.getElementById('kpiLastMonthlyInterest'),
  kpiNextExpectedInterest: document.getElementById('kpiNextExpectedInterest'),
  ratioDepositsBar: document.getElementById('ratioDepositsBar'),
  ratioInterestBar: document.getElementById('ratioInterestBar'),
  ratioDepositsValue: document.getElementById('ratioDepositsValue'),
  ratioDepositsPct: document.getElementById('ratioDepositsPct'),
  ratioInterestValue: document.getElementById('ratioInterestValue'),
  ratioInterestPct: document.getElementById('ratioInterestPct'),
  snowballInsightText: document.getElementById('snowballInsightText'),
  totalRecordsCount: document.getElementById('totalRecordsCount'),

  // Tables & Canvas
  dashboardRecentTableBody: document.getElementById('dashboardRecentTableBody'),
  passbookTableBody: document.getElementById('passbookTableBody'),
  passbookPageIndicator: document.getElementById('passbookPageIndicator'),
  pageSwitcherBtns: document.getElementById('pageSwitcherBtns'),
  growthChartCanvas: document.getElementById('growthChartCanvas'),
  chartTooltip: document.getElementById('chartTooltip'),
  viewFullPassbookLink: document.getElementById('viewFullPassbookLink'),

  // Simulator
  simDepositInput: document.getElementById('simDepositInput'),
  simDepositDisplay: document.getElementById('simDepositDisplay'),
  simRateInput: document.getElementById('simRateInput'),
  simRateDisplay: document.getElementById('simRateDisplay'),
  simGoalInput: document.getElementById('simGoalInput'),
  simGoalDisplay: document.getElementById('simGoalDisplay'),
  proj1YearBalance: document.getElementById('proj1YearBalance'),
  proj1YearInterest: document.getElementById('proj1YearInterest'),
  proj3YearBalance: document.getElementById('proj3YearBalance'),
  proj3YearInterest: document.getElementById('proj3YearInterest'),
  proj5YearBalance: document.getElementById('proj5YearBalance'),
  proj5YearInterest: document.getElementById('proj5YearInterest'),
  projGoalDate: document.getElementById('projGoalDate'),
  projGoalMonths: document.getElementById('projGoalMonths'),
  simulationForecastTableBody: document.getElementById('simulationForecastTableBody'),

  // Fixed Mode Elements
  openNewFixedDepositBtn: document.getElementById('openNewFixedDepositBtn'),
  fixedTotalPrincipal: document.getElementById('fixedTotalPrincipal'),
  fixedActiveCount: document.getElementById('fixedActiveCount'),
  fixedTotalExpectedInterest: document.getElementById('fixedTotalExpectedInterest'),
  fixedNextMaturityDate: document.getElementById('fixedNextMaturityDate'),
  fixedDaysRemaining: document.getElementById('fixedDaysRemaining'),
  fixedDepositsGrid: document.getElementById('fixedDepositsGrid'),

  // Fixed Deposit Modal
  newFixedModal: document.getElementById('newFixedModal'),
  closeNewFixedModalBtn: document.getElementById('closeNewFixedModalBtn'),
  cancelNewFixedModalBtn: document.getElementById('cancelNewFixedModalBtn'),
  fixedDepositForm: document.getElementById('fixedDepositForm'),
  fixedFormTitle: document.getElementById('fixedFormTitle'),
  fixedFormPrincipal: document.getElementById('fixedFormPrincipal'),
  fixedFormTerm: document.getElementById('fixedFormTerm'),
  fixedFormStartDate: document.getElementById('fixedFormStartDate'),
  fixedPreviewRate: document.getElementById('fixedPreviewRate'),
  fixedPreviewMaturityDate: document.getElementById('fixedPreviewMaturityDate'),
  fixedPreviewInterest: document.getElementById('fixedPreviewInterest'),
  fixedPreviewTotalPayout: document.getElementById('fixedPreviewTotalPayout'),

  // Certificate Modal
  certificateModal: document.getElementById('certificateModal'),
  closeCertificateBtn: document.getElementById('closeCertificateBtn'),
  certDepositCode: document.getElementById('certDepositCode'),
  certPrincipal: document.getElementById('certPrincipal'),
  certRate: document.getElementById('certRate'),
  certStartDate: document.getElementById('certStartDate'),
  certMaturityDate: document.getElementById('certMaturityDate'),
  certTotalPayout: document.getElementById('certTotalPayout'),

  // Flexible Record Modal
  recordModal: document.getElementById('recordModal'),
  recordModalTitle: document.getElementById('recordModalTitle'),
  closeRecordModalBtn: document.getElementById('closeRecordModalBtn'),
  cancelRecordModalBtn: document.getElementById('cancelRecordModalBtn'),
  recordForm: document.getElementById('recordForm'),
  formRecordIndex: document.getElementById('formRecordIndex'),
  formSeqNo: document.getElementById('formSeqNo'),
  formDate: document.getElementById('formDate'),
  formOpeningBalance: document.getElementById('formOpeningBalance'),
  formRate: document.getElementById('formRate'),
  formInterest: document.getElementById('formInterest'),
  formDeposit: document.getElementById('formDeposit'),
  formWithdrawal: document.getElementById('formWithdrawal'),
  formClosingPreview: document.getElementById('formClosingPreview'),

  // Supabase Modal
  openSupabaseModalBtn: document.getElementById('openSupabaseModalBtn'),
  supabaseStatusBtn: document.getElementById('supabaseStatusBtn'),
  supabaseModal: document.getElementById('supabaseModal'),
  closeSupabaseModalBtn: document.getElementById('closeSupabaseModalBtn'),
  supabaseUrlInput: document.getElementById('supabaseUrlInput'),
  supabaseKeyInput: document.getElementById('supabaseKeyInput'),
  testSupabaseBtn: document.getElementById('testSupabaseBtn'),
  pushToSupabaseBtn: document.getElementById('pushToSupabaseBtn'),
  pullFromSupabaseBtn: document.getElementById('pullFromSupabaseBtn'),
  copySqlSchemaBtn: document.getElementById('copySqlSchemaBtn'),

  // Photo Scan Modal
  viewOriginalScanBtn: document.getElementById('viewOriginalScanBtn'),
  photoScanModal: document.getElementById('photoScanModal'),
  closePhotoScanModalBtn: document.getElementById('closePhotoScanModalBtn'),
  photoScanTab1: document.getElementById('photoScanTab1'),
  photoScanTab2: document.getElementById('photoScanTab2'),
  photoScanImg: document.getElementById('photoScanImg'),
  photoDownloadLink: document.getElementById('photoDownloadLink'),

  // Toast
  toastContainer: document.getElementById('toastContainer')
};

// --- Show Toast Notification ---
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-600 border-emerald-500' : (type === 'info' ? 'bg-blue-600 border-blue-500' : 'bg-amber-600 border-amber-500');
  toast.className = `toast-msg px-4 py-3 rounded-2xl text-white text-xs font-semibold shadow-2xl border flex items-center space-x-2 pointer-events-auto transition ${bgClass} z-50`;
  toast.innerHTML = `
    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;
  dom.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Mode Switching (Flexible Mode 1 vs Fixed Mode 2) ---
function switchSavingMode(mode) {
  state.currentMode = mode;
  if (mode === 'flexible') {
    dom.modeFlexibleBtn.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition bg-amber-500 text-slate-950 shadow-md';
    dom.modeFixedBtn.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition text-slate-300 hover:text-white hover:bg-slate-800';
    dom.flexibleModeContainer.classList.remove('hidden');
    dom.fixedModeContainer.classList.add('hidden');
    dom.flexibleSubTabsBar.classList.remove('hidden');
    dom.activeAccountModeBadge.textContent = 'គណនីបញ្ញើសន្សំធម្មតា (គ្មានកាលកំណត់)';
    dom.activeAccountModeBadge.className = 'text-amber-400 font-semibold';
    dom.mainAddActionLabel.textContent = 'បញ្ចូលខែថ្មី';
    renderGrowthChart();
  } else {
    dom.modeFixedBtn.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition bg-emerald-500 text-slate-950 shadow-md';
    dom.modeFlexibleBtn.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition text-slate-300 hover:text-white hover:bg-slate-800';
    dom.flexibleModeContainer.classList.add('hidden');
    dom.fixedModeContainer.classList.remove('hidden');
    dom.flexibleSubTabsBar.classList.add('hidden');
    dom.activeAccountModeBadge.textContent = 'គណនីបញ្ញើសន្សំមានកាលកំណត់ (Fixed Term)';
    dom.activeAccountModeBadge.className = 'text-emerald-400 font-semibold';
    dom.mainAddActionLabel.textContent = 'បើកកិច្ចសន្យាថ្មី';
    renderFixedTermSection();
  }
}

// --- Render Flexible KPIs ---
function renderKPIs() {
  if (state.flexibleData.length === 0) return;

  const lastRow = state.flexibleData[state.flexibleData.length - 1];
  const firstRow = state.flexibleData[0];

  const currentBalance = lastRow.closing;
  const initialCapital = firstRow.opening;

  let totalInterest = 0;
  let totalFreshDeposits = 0;
  let totalWithdrawals = 0;

  state.flexibleData.forEach(r => {
    totalInterest += Number(r.interest) || 0;
    totalFreshDeposits += Number(r.deposit) || 0;
    totalWithdrawals += Number(r.withdrawal) || 0;
  });

  const totalCapitalIn = initialCapital + totalFreshDeposits - totalWithdrawals;
  const growthPercent = (((currentBalance - initialCapital) / initialCapital) * 100).toFixed(1);
  const interestPercentOfTotal = ((totalInterest / currentBalance) * 100).toFixed(2);
  const nextExpectedInterest = computeCoopInterest(currentBalance, 0.8);

  dom.kpiBalanceValue.textContent = formatMoney(currentBalance);
  dom.kpiBalanceGrowth.textContent = `+${growthPercent}%`;
  dom.kpiInterestValue.textContent = formatMoney(totalInterest);
  dom.kpiInterestPercent.textContent = `${interestPercentOfTotal}%`;
  dom.kpiDepositsValue.textContent = formatMoney(totalCapitalIn);
  dom.kpiInitialCapital.textContent = formatMoney(initialCapital);
  dom.kpiLastMonthlyInterest.textContent = formatMoney(lastRow.interest);
  dom.kpiNextExpectedInterest.textContent = `~${formatMoney(nextExpectedInterest)}`;

  const capPct = ((totalCapitalIn / currentBalance) * 100).toFixed(1);
  const intPct = ((totalInterest / currentBalance) * 100).toFixed(1);
  dom.ratioDepositsBar.style.width = `${capPct}%`;
  dom.ratioInterestBar.style.width = `${intPct}%`;
  dom.ratioDepositsValue.textContent = formatMoney(totalCapitalIn);
  dom.ratioInterestValue.textContent = formatMoney(totalInterest);
  dom.ratioDepositsPct.textContent = `${capPct}% នៃសរុប`;
  dom.ratioInterestPct.textContent = `${intPct}% នៃសរុប`;

  const lastDeposit = lastRow.deposit || 700000;
  const coveragePct = ((lastRow.interest / lastDeposit) * 100).toFixed(1);
  dom.snowballInsightText.innerHTML = `
    ការប្រាក់ខែចុងក្រោយ (<span class="text-amber-300 font-bold maskable">${formatMoney(lastRow.interest)}</span>) 
    អាចទូទាត់បានដល់ទៅ <span class="text-emerald-400 font-bold">${coveragePct}%</span> 
    នៃប្រាក់សន្សំបន្ថែមប្រចាំខែ (${formatMoney(lastDeposit)})!
  `;

  dom.totalRecordsCount.textContent = `${state.flexibleData.length} ខែបានកត់ត្រា`;
  applyMaskState();
}

// --- Render Recent Transactions Table ---
function renderDashboardRecentTable() {
  const tbody = dom.dashboardRecentTableBody;
  tbody.innerHTML = '';

  const recent = [...state.flexibleData].slice(-6).reverse();

  recent.forEach((row) => {
    const originalIndex = state.flexibleData.findIndex(r => r.id === row.id);
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-brand-surfaceLight/80 transition group';
    tr.innerHTML = `
      <td class="py-3 px-3 font-semibold text-slate-400">#${row.seq}</td>
      <td class="py-3 px-3 font-mono font-medium text-slate-200">${row.date}</td>
      <td class="py-3 px-3 font-mono text-slate-300 maskable">${formatMoney(row.opening)}</td>
      <td class="py-3 px-3 text-slate-400 font-semibold">${row.rate}%</td>
      <td class="py-3 px-3 font-mono font-bold text-emerald-400 maskable">+${formatMoney(row.interest)}</td>
      <td class="py-3 px-3 font-mono text-blue-400 maskable">${row.deposit > 0 ? '+' + formatMoney(row.deposit) : '-'}</td>
      <td class="py-3 px-3 font-mono text-rose-400 maskable">${row.withdrawal > 0 ? '-' + formatMoney(row.withdrawal) : '-'}</td>
      <td class="py-3 px-3 font-mono font-bold text-amber-300 maskable">${formatMoney(row.closing)}</td>
      <td class="py-3 px-3 text-center">
        <button class="edit-row-btn p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition" data-index="${originalIndex}" title="Edit Row">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.edit-row-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditModal(parseInt(btn.dataset.index, 10));
    });
  });

  applyMaskState();
}

// --- Render Passbook Ledger ---
function renderPassbook() {
  const tbody = dom.passbookTableBody;
  tbody.innerHTML = '';

  const page = state.activePassbookPage;
  dom.passbookPageIndicator.textContent = `ទំព័រសៀវភៅទី ${toKhmerNum(page)} នៃ ២`;

  const startIndex = (page - 1) * 12;
  const pageRows = state.flexibleData.slice(startIndex, startIndex + 12);

  for (let seq = 1; seq <= 12; seq++) {
    const row = pageRows.find(r => r.seq === seq);
    const globalIdx = startIndex + (seq - 1);
    const tr = document.createElement('tr');
    tr.className = "h-11 border-b border-[#9ca3af] hover:bg-[#f0f2eb] transition text-center";

    if (row) {
      tr.innerHTML = `
        <td class="border-r border-[#9ca3af] font-bold text-[#111827] text-sm font-khmer">${toKhmerNum(row.seq)}</td>
        <td class="border-r border-[#9ca3af] font-mono font-semibold text-[#1f2937]">${row.date}</td>
        <td class="border-r border-[#9ca3af] font-mono text-right pr-2 text-[#111827] font-medium maskable">${row.opening.toLocaleString()}</td>
        <td class="border-r border-[#9ca3af] font-semibold text-[#111827]">${row.rate}%</td>
        <td class="border-r border-[#9ca3af] font-mono text-right pr-2 font-bold text-[#065f46] maskable">${row.interest.toLocaleString()}</td>
        <td class="border-r border-[#9ca3af] font-mono text-right pr-2 text-[#1e40af] font-medium maskable">${row.deposit > 0 ? row.deposit.toLocaleString() : ''}</td>
        <td class="border-r border-[#9ca3af] font-mono text-right pr-2 text-[#991b1b] maskable">${row.withdrawal > 0 ? row.withdrawal.toLocaleString() : ''}</td>
        <td class="border-r border-[#9ca3af] font-mono text-right pr-2 font-bold text-[#111827] maskable">${row.closing.toLocaleString()}</td>
        <td class="py-1 px-1">
          <div class="officer-signature-stamp" title="Verified by Savings Cooperative Officer">
            <svg viewBox="0 0 100 45" class="w-full h-full signature-ink">
              <path d="M10 28 C 25 10, 35 38, 48 20 C 55 12, 65 35, 85 18 C 92 14, 75 40, 95 38" />
              <path d="M30 32 C 45 32, 60 30, 80 32" stroke-width="1.5" />
            </svg>
          </div>
        </td>
      `;
      tr.classList.add('cursor-pointer');
      tr.addEventListener('click', () => openEditModal(globalIdx));
    } else {
      const isNextPendingRow = (globalIdx === state.flexibleData.length);
      tr.innerHTML = `
        <td class="border-r border-[#9ca3af] text-[#9ca3af] text-sm font-khmer">${toKhmerNum(seq)}</td>
        <td class="border-r border-[#9ca3af] text-[#9ca3af]">--</td>
        <td class="border-r border-[#9ca3af]"></td>
        <td class="border-r border-[#9ca3af]"></td>
        <td class="border-r border-[#9ca3af]"></td>
        <td class="border-r border-[#9ca3af]"></td>
        <td class="border-r border-[#9ca3af]"></td>
        <td class="border-r border-[#9ca3af]"></td>
        <td class="empty-signature-cell text-center">
          ${isNextPendingRow ? `<button class="quick-add-row-btn px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[11px] shadow hover:bg-emerald-500 font-khmer">+ បញ្ចូលខែ ${toKhmerNum(seq)}</button>` : ''}
        </td>
      `;

      if (isNextPendingRow) {
        tr.querySelector('.quick-add-row-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          openAddModal();
        });
      }
    }

    tbody.appendChild(tr);
  }

  dom.pageSwitcherBtns.querySelectorAll('.page-tab').forEach(btn => {
    const p = parseInt(btn.dataset.page, 10);
    if (p === state.activePassbookPage) {
      btn.className = 'page-tab active px-4 py-1.5 rounded-lg text-xs font-bold transition bg-amber-500 text-slate-950';
    } else {
      btn.className = 'page-tab px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition';
    }
  });

  applyMaskState();
}

// --- Canvas Growth Chart ---
function renderGrowthChart() {
  const canvas = dom.growthChartCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  if (state.flexibleData.length < 2) return;

  const padding = { top: 30, right: 30, bottom: 40, left: 70 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const balances = state.flexibleData.map(d => d.closing);
  const minBal = Math.min(...balances) * 0.9;
  const maxBal = Math.max(...balances) * 1.05;

  const getX = (idx) => padding.left + (idx / (state.flexibleData.length - 1)) * chartWidth;
  const getY = (val) => padding.top + chartHeight - ((val - minBal) / (maxBal - minBal)) * chartHeight;

  // Grid
  ctx.strokeStyle = 'rgba(42, 59, 102, 0.4)';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'right';

  const gridCount = 5;
  for (let i = 0; i <= gridCount; i++) {
    const val = minBal + (i / gridCount) * (maxBal - minBal);
    const y = getY(val);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    const label = state.currency === 'USD'
      ? '$' + ((val / state.exchangeRate) / 1000).toFixed(1) + 'k'
      : (val / 1000000).toFixed(1) + 'M ៛';
    ctx.fillText(label, padding.left - 8, y + 3);
  }

  // Area
  const areaGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  areaGradient.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
  areaGradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)');

  ctx.beginPath();
  ctx.moveTo(getX(0), getY(balances[0]));
  for (let i = 1; i < state.flexibleData.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getY(balances[i - 1]);
    const currX = getX(i);
    const currY = getY(balances[i]);
    const midX = (prevX + currX) / 2;
    ctx.bezierCurveTo(midX, prevY, midX, currY, currX, currY);
  }
  ctx.lineTo(getX(state.flexibleData.length - 1), padding.top + chartHeight);
  ctx.lineTo(getX(0), padding.top + chartHeight);
  ctx.closePath();
  ctx.fillStyle = areaGradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(balances[0]));
  for (let i = 1; i < state.flexibleData.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getY(balances[i - 1]);
    const currX = getX(i);
    const currY = getY(balances[i]);
    const midX = (prevX + currX) / 2;
    ctx.bezierCurveTo(midX, prevY, midX, currY, currX, currY);
  }
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Points
  ctx.textAlign = 'center';
  state.flexibleData.forEach((row, idx) => {
    const x = getX(idx);
    const y = getY(row.closing);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#080d1a';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();

    if (idx % 3 === 0 || idx === state.flexibleData.length - 1) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(row.date, x, height - padding.bottom + 16);
    }
  });

  canvas._points = state.flexibleData.map((row, idx) => ({
    x: getX(idx),
    y: getY(row.closing),
    data: row
  }));
}

// Chart Tooltip
function setupChartInteractivity() {
  const canvas = dom.growthChartCanvas;
  const tooltip = dom.chartTooltip;
  if (!canvas || !tooltip) return;

  canvas.addEventListener('mousemove', (e) => {
    if (!canvas._points) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let nearest = null;
    let minDistance = 25;

    canvas._points.forEach(pt => {
      const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = pt;
      }
    });

    if (nearest) {
      const d = nearest.data;
      tooltip.style.left = `${nearest.x + 10}px`;
      tooltip.style.top = `${nearest.y - 40}px`;
      tooltip.classList.remove('hidden');
      tooltip.innerHTML = `
        <div class="font-bold text-amber-400 font-mono">${d.date} (ខែ #${d.seq})</div>
        <div class="text-white font-extrabold text-sm mt-0.5">${formatMoney(d.closing)}</div>
        <div class="text-emerald-400 text-[11px] font-semibold mt-0.5">ការប្រាក់: +${formatMoney(d.interest)}</div>
        <div class="text-blue-400 text-[11px]">ប្រាក់សន្សំ: +${formatMoney(d.deposit)}</div>
      `;
    } else {
      tooltip.classList.add('hidden');
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
  });
}

// --- Future Wealth Simulator ---
function runSimulation() {
  const deposit = Number(dom.simDepositInput.value);
  const rate = Number(dom.simRateInput.value);
  const goalTarget = Number(dom.simGoalInput.value);

  dom.simDepositDisplay.textContent = formatMoney(deposit);
  dom.simRateDisplay.textContent = `${rate.toFixed(2)}% / ខែ`;
  dom.simGoalDisplay.textContent = formatMoney(goalTarget);

  if (state.flexibleData.length === 0) return;
  const currentBalance = state.flexibleData[state.flexibleData.length - 1].closing;

  let simBalance = currentBalance;
  let totalSimInterest = 0;
  let balanceAt12 = 0, interestAt12 = 0;
  let balanceAt36 = 0, interestAt36 = 0;
  let balanceAt60 = 0, interestAt60 = 0;
  let monthsToGoal = null;
  const forecastTableRows = [];

  const lastDate = state.flexibleData[state.flexibleData.length - 1].date;
  const parts = lastDate.split('.');
  let day = parseInt(parts[0], 10) || 5;
  let month = parseInt(parts[1], 10) || 10;
  let year = parseInt(parts[2], 10) || 26;

  for (let m = 1; m <= 60; m++) {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    const dateStr = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${String(year).padStart(2, '0')}`;
    const opening = simBalance;
    const monthlyInt = computeCoopInterest(opening, rate);
    totalSimInterest += monthlyInt;
    simBalance = opening + monthlyInt + deposit;

    if (m === 12) { balanceAt12 = simBalance; interestAt12 = totalSimInterest; }
    if (m === 36) { balanceAt36 = simBalance; interestAt36 = totalSimInterest; }
    if (m === 60) { balanceAt60 = simBalance; interestAt60 = totalSimInterest; }

    if (simBalance >= goalTarget && monthsToGoal === null) {
      monthsToGoal = { monthCount: m, date: dateStr, balance: simBalance };
    }

    if (m <= 24) {
      forecastTableRows.push({
        monthIndex: m,
        date: dateStr,
        opening,
        interest: monthlyInt,
        deposit,
        closing: simBalance
      });
    }
  }

  dom.proj1YearBalance.textContent = formatMoney(balanceAt12);
  dom.proj1YearInterest.textContent = `+${formatMoney(interestAt12)} ការប្រាក់`;

  dom.proj3YearBalance.textContent = formatMoney(balanceAt36);
  dom.proj3YearInterest.textContent = `+${formatMoney(interestAt36)} ការប្រាក់`;

  dom.proj5YearBalance.textContent = formatMoney(balanceAt60);
  dom.proj5YearInterest.textContent = `+${formatMoney(interestAt60)} ការប្រាក់`;

  if (monthsToGoal) {
    dom.projGoalDate.textContent = monthsToGoal.date;
    dom.projGoalMonths.textContent = `នៅសល់ប្រហែល ${toKhmerNum(monthsToGoal.monthCount)} ខែទៀត`;
  } else {
    dom.projGoalDate.textContent = '> 5 ឆ្នាំ (Years)';
    dom.projGoalMonths.textContent = 'ត្រូវការលើសពី ៦០ ខែ';
  }

  const tbody = dom.simulationForecastTableBody;
  tbody.innerHTML = '';
  forecastTableRows.forEach(r => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-brand-surfaceLight/60 transition';
    tr.innerHTML = `
      <td class="py-2.5 px-3 font-semibold text-slate-400">#${r.monthIndex}</td>
      <td class="py-2.5 px-3 font-mono font-medium text-slate-200">${r.date}</td>
      <td class="py-2.5 px-3 text-right font-mono text-slate-300 maskable">${formatMoney(r.opening)}</td>
      <td class="py-2.5 px-3 text-right font-mono font-bold text-emerald-400 maskable">+${formatMoney(r.interest)}</td>
      <td class="py-2.5 px-3 text-right font-mono text-blue-400 maskable">+${formatMoney(r.deposit)}</td>
      <td class="py-2.5 px-3 text-right font-mono font-bold text-amber-400 maskable">${formatMoney(r.closing)}</td>
    `;
    tbody.appendChild(tr);
  });

  applyMaskState();
}

// =========================================================================
// SECTION: FIXED TERM SAVINGS (MODE 2)
// =========================================================================
function renderFixedTermSection() {
  const grid = dom.fixedDepositsGrid;
  grid.innerHTML = '';

  let totalPrincipal = 0;
  let totalMaturityPayout = 0;

  state.fixedData.forEach(item => {
    totalPrincipal += Number(item.principal) || 0;
    totalMaturityPayout += Number(item.maturityPayout) || 0;

    const interestGain = item.maturityPayout - item.principal;

    const card = document.createElement('div');
    card.className = "rounded-2xl bg-[#080d1a] border border-brand-border p-5 shadow-lg space-y-4 hover:border-emerald-500/50 transition flex flex-col justify-between";
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">${item.depositCode}</span>
          <h4 class="text-base font-bold text-white font-khmer mt-2">${item.title}</h4>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          ${item.status === 'ACTIVE' ? '🟢 កំពុងដំណើរការ' : 'ផុតកំណត់'}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3 bg-[#0d1630] p-3 rounded-xl border border-brand-border/60 text-xs font-sans">
        <div>
          <div class="text-slate-400 text-[11px] font-khmer">ប្រាក់ដើមតម្កល់</div>
          <div class="font-extrabold text-white text-sm maskable">${formatMoney(item.principal)}</div>
        </div>
        <div>
          <div class="text-slate-400 text-[11px] font-khmer">អត្រាប្រចាំឆ្នាំ</div>
          <div class="font-bold text-emerald-400 text-sm">${item.rateAnnual}% / ឆ្នាំ</div>
        </div>
        <div>
          <div class="text-slate-400 text-[11px] font-khmer">កាលបរិច្ឆេទតម្កល់</div>
          <div class="text-slate-300 font-mono">${item.startDate}</div>
        </div>
        <div>
          <div class="text-slate-400 text-[11px] font-khmer">កាលបរិច្ឆេទផុតកំណត់</div>
          <div class="text-amber-400 font-mono font-bold">${item.maturityDate}</div>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex justify-between items-center text-xs">
        <span class="text-emerald-300 font-khmer">ការប្រាក់ទទួលបានពេលដល់កំណត់:</span>
        <span class="font-bold text-emerald-400 font-mono text-sm maskable">+${formatMoney(interestGain)}</span>
      </div>

      <div class="flex items-center justify-between pt-2">
        <button class="view-cert-btn text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1.5 transition" data-id="${item.id}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>មើលវិញ្ញាបនបត្រ (View Certificate)</span>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach Certificate View buttons
  grid.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      openCertificateModal(id);
    });
  });

  const totalExpectedInterest = totalMaturityPayout - totalPrincipal;
  dom.fixedTotalPrincipal.textContent = formatMoney(totalPrincipal);
  dom.fixedActiveCount.textContent = `${state.fixedData.length} កិច្ចសន្យា`;
  dom.fixedTotalExpectedInterest.textContent = `+${formatMoney(totalExpectedInterest)}`;

  if (state.fixedData.length > 0) {
    dom.fixedNextMaturityDate.textContent = state.fixedData[0].maturityDate;
  }

  applyMaskState();
}

// Certificate Modal
function openCertificateModal(depositId) {
  const item = state.fixedData.find(f => f.id === depositId) || state.fixedData[0];
  if (!item) return;

  dom.certDepositCode.textContent = item.depositCode;
  dom.certPrincipal.textContent = formatMoney(item.principal);
  dom.certRate.textContent = `${item.rateAnnual}% / ឆ្នាំ (Term: ${item.termMonths} ខែ)`;
  dom.certStartDate.textContent = item.startDate;
  dom.certMaturityDate.textContent = item.maturityDate;
  dom.certTotalPayout.textContent = formatMoney(item.maturityPayout);

  dom.certificateModal.classList.remove('hidden');
}

// Open New Fixed Term Deposit Modal
function openNewFixedModal() {
  dom.fixedFormPrincipal.value = 10000000;
  dom.fixedFormTerm.value = "12";
  updateFixedPreviewCalculations();
  dom.newFixedModal.classList.remove('hidden');
}

function updateFixedPreviewCalculations() {
  const principal = Number(dom.fixedFormPrincipal.value) || 0;
  const termOption = dom.fixedFormTerm.options[dom.fixedFormTerm.selectedIndex];
  const rateAnnual = Number(termOption.dataset.rate) || 10.0;
  const termMonths = Number(dom.fixedFormTerm.value) || 12;

  const totalInterest = Math.floor((principal * (rateAnnual / 100) * (termMonths / 12)) / 100) * 100;
  const totalPayout = principal + totalInterest;

  // Calculate maturity date (+termMonths)
  const parts = dom.fixedFormStartDate.value.split('.');
  let day = parseInt(parts[0], 10) || 26;
  let month = parseInt(parts[1], 10) || 10;
  let year = parseInt(parts[2], 10) || 2026;

  month += termMonths;
  while (month > 12) {
    month -= 12;
    year++;
  }
  const matDateStr = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;

  dom.fixedPreviewRate.textContent = `${rateAnnual.toFixed(2)}% / ឆ្នាំ`;
  dom.fixedPreviewMaturityDate.textContent = matDateStr;
  dom.fixedPreviewInterest.textContent = formatMoney(totalInterest);
  dom.fixedPreviewTotalPayout.textContent = formatMoney(totalPayout);
}

dom.fixedDepositForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = dom.fixedFormTitle.value.trim();
  const principal = Number(dom.fixedFormPrincipal.value);
  const termOption = dom.fixedFormTerm.options[dom.fixedFormTerm.selectedIndex];
  const rateAnnual = Number(termOption.dataset.rate);
  const termMonths = Number(dom.fixedFormTerm.value);
  const startDate = dom.fixedFormStartDate.value.trim();

  const totalInterest = Math.floor((principal * (rateAnnual / 100) * (termMonths / 12)) / 100) * 100;
  const maturityPayout = principal + totalInterest;

  const parts = startDate.split('.');
  let day = parseInt(parts[0], 10) || 26;
  let month = parseInt(parts[1], 10) || 10;
  let year = parseInt(parts[2], 10) || 2026;

  month += termMonths;
  while (month > 12) {
    month -= 12;
    year++;
  }
  const maturityDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;

  const count = state.fixedData.length + 1;
  const newDeposit = {
    id: `ftd-${Date.now()}`,
    depositCode: `CN-FTD-2026-${String(count).padStart(3, '0')}`,
    title,
    principal,
    termMonths,
    rateAnnual,
    startDate,
    maturityDate,
    maturityPayout,
    status: 'ACTIVE',
    notes: 'ទូទាត់ការប្រាក់ពេញលេញនៅថ្ងៃផុតកំណត់'
  };

  state.fixedData.push(newDeposit);
  saveLocalData();
  renderFixedTermSection();
  dom.newFixedModal.classList.add('hidden');
  showToast("បានបង្កើតកិច្ចសន្យាបញ្ញើមានកាលកំណត់ថ្មីដោយជោគជ័យ!", "success");

  // Open Certificate for review
  openCertificateModal(newDeposit.id);
});

[dom.fixedFormPrincipal, dom.fixedFormTerm, dom.fixedFormStartDate].forEach(inp => {
  inp.addEventListener('input', updateFixedPreviewCalculations);
});

// --- Modal 1: Flexible Record Add / Edit Logic ---
function openAddModal() {
  dom.formRecordIndex.value = -1;
  dom.recordModalTitle.textContent = 'បញ្ចូលប្រតិបត្តិការខែថ្មី';

  const lastRow = state.flexibleData[state.flexibleData.length - 1];
  const nextSeq = (state.flexibleData.length % 12) + 1;
  const nextOpening = lastRow ? lastRow.closing : 25343900;

  let nextDate = '05.11.26';
  if (lastRow && lastRow.date) {
    const parts = lastRow.date.split('.');
    let day = parseInt(parts[0], 10) || 5;
    let month = parseInt(parts[1], 10) || 1;
    let year = parseInt(parts[2], 10) || 26;
    month++;
    if (month > 12) { month = 1; year++; }
    nextDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${String(year).padStart(2, '0')}`;
  }

  dom.formSeqNo.value = nextSeq;
  dom.formDate.value = nextDate;
  dom.formOpeningBalance.value = nextOpening;
  dom.formRate.value = 0.8;
  dom.formDeposit.value = 700000;
  dom.formWithdrawal.value = 0;

  updateFormCalculations();
  dom.recordModal.classList.remove('hidden');
}

function openEditModal(index) {
  if (index < 0 || index >= state.flexibleData.length) return;
  const row = state.flexibleData[index];

  dom.formRecordIndex.value = index;
  dom.recordModalTitle.textContent = `កែប្រែប្រតិបត្តិការខែទី ${toKhmerNum(row.seq)} (${row.date})`;

  dom.formSeqNo.value = row.seq;
  dom.formDate.value = row.date;
  dom.formOpeningBalance.value = row.opening;
  dom.formRate.value = row.rate;
  dom.formDeposit.value = row.deposit;
  dom.formWithdrawal.value = row.withdrawal || 0;

  updateFormCalculations();
  dom.recordModal.classList.remove('hidden');
}

function updateFormCalculations() {
  const opening = Number(dom.formOpeningBalance.value) || 0;
  const rate = Number(dom.formRate.value) || 0.8;
  const deposit = Number(dom.formDeposit.value) || 0;
  const withdrawal = Number(dom.formWithdrawal.value) || 0;

  const interest = computeCoopInterest(opening, rate);
  const closing = opening + interest + deposit - withdrawal;

  dom.formInterest.value = interest;
  dom.formClosingPreview.textContent = formatMoney(closing);
}

dom.recordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const index = parseInt(dom.formRecordIndex.value, 10);
  const seq = parseInt(dom.formSeqNo.value, 10) || 1;
  const date = dom.formDate.value.trim();
  const opening = Number(dom.formOpeningBalance.value);
  const rate = Number(dom.formRate.value);
  const deposit = Number(dom.formDeposit.value);
  const withdrawal = Number(dom.formWithdrawal.value);
  const interest = computeCoopInterest(opening, rate);
  const closing = opening + interest + deposit - withdrawal;

  if (index === -1) {
    const newRecord = {
      id: Date.now(),
      page: state.flexibleData.length < 12 ? 1 : Math.floor(state.flexibleData.length / 12) + 1,
      seq,
      date,
      opening,
      rate,
      interest,
      deposit,
      withdrawal,
      closing,
      signed: true
    };
    state.flexibleData.push(newRecord);
    showToast('បានបញ្ចូលប្រតិបត្តិការខែថ្មីជោគជ័យ', 'success');
  } else {
    const target = state.flexibleData[index];
    target.seq = seq;
    target.date = date;
    target.opening = opening;
    target.rate = rate;
    target.interest = interest;
    target.deposit = deposit;
    target.withdrawal = withdrawal;
    target.closing = closing;

    recalculateCascade();
    showToast('បានកែសម្រួល & គណនាសមតុល្យបន្តជោគជ័យ', 'success');
  }

  saveLocalData();
  dom.recordModal.classList.add('hidden');
  renderAll();
});

[dom.formOpeningBalance, dom.formRate, dom.formDeposit, dom.formWithdrawal].forEach(inp => {
  inp.addEventListener('input', updateFormCalculations);
});

// --- Privacy Toggle ---
function togglePrivacy() {
  state.isMasked = !state.isMasked;
  dom.eyeIconOpen.classList.toggle('hidden', state.isMasked);
  dom.eyeIconClosed.classList.toggle('hidden', !state.isMasked);
  applyMaskState();
}

function applyMaskState() {
  document.querySelectorAll('.maskable').forEach(el => {
    if (state.isMasked) {
      el.classList.add('masked');
    } else {
      el.classList.remove('masked');
    }
  });
}

// --- Currency Toggle ---
function toggleCurrency() {
  state.currency = state.currency === 'KHR' ? 'USD' : 'KHR';
  if (state.currency === 'KHR') {
    dom.currentCurrencyLabel.textContent = 'KHR (៛)';
    dom.altCurrencyLabel.textContent = 'USD ($)';
  } else {
    dom.currentCurrencyLabel.textContent = 'USD ($)';
    dom.altCurrencyLabel.textContent = 'KHR (៛)';
  }
  renderAll();
  showToast(`បានប្តូររូបិយប័ណ្ណទៅជា ${state.currency}`, 'info');
}

// --- Language Toggle ---
function toggleLanguage() {
  state.language = state.language === 'KM' ? 'EN' : 'KM';
  dom.currentLangLabel.textContent = state.language === 'KM' ? 'ខ្មែរ' : 'EN';
  renderAll();
}

// --- Flexible Sub-Tab Switching ---
function switchFlexibleTab(tabName) {
  state.currentFlexibleView = tabName;
  [dom.tabDashboardBtn, dom.tabPassbookBtn, dom.tabProjectionBtn, dom.tabInsightsBtn].forEach(tab => {
    tab.className = 'flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition text-slate-400 hover:text-white hover:bg-slate-800';
  });

  [dom.viewDashboard, dom.viewPassbook, dom.viewProjection, dom.viewInsights].forEach(v => {
    v.classList.add('hidden');
  });

  if (tabName === 'dashboard') {
    dom.tabDashboardBtn.className = 'flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition text-amber-400 bg-amber-500/10 border border-amber-500/30';
    dom.viewDashboard.classList.remove('hidden');
    renderGrowthChart();
  } else if (tabName === 'passbook') {
    dom.tabPassbookBtn.className = 'flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition text-amber-400 bg-amber-500/10 border border-amber-500/30';
    dom.viewPassbook.classList.remove('hidden');
    renderPassbook();
  } else if (tabName === 'projection') {
    dom.tabProjectionBtn.className = 'flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition text-amber-400 bg-amber-500/10 border border-amber-500/30';
    dom.viewProjection.classList.remove('hidden');
    runSimulation();
  } else if (tabName === 'insights') {
    dom.tabInsightsBtn.className = 'flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition text-amber-400 bg-amber-500/10 border border-amber-500/30';
    dom.viewInsights.classList.remove('hidden');
  }
}

// --- Export to CSV ---
function exportToCSV() {
  const isFlex = state.currentMode === 'flexible';
  if (isFlex) {
    const headers = ["No", "Date", "Opening Balance", "Rate %", "Monthly Interest", "Monthly Deposit", "Monthly Withdrawal", "Closing Balance"];
    const rows = state.flexibleData.map(r => [
      r.seq, r.date, r.opening, r.rate + '%', r.interest, r.deposit, r.withdrawal || 0, r.closing
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    downloadFile(csvContent, `Chamroeun_Nheat_Flexible_Passbook_${Date.now()}.csv`);
  } else {
    const headers = ["Code", "Title", "Principal", "Term Months", "Annual Rate %", "Start Date", "Maturity Date", "Total Payout", "Status"];
    const rows = state.fixedData.map(f => [
      f.depositCode, `"${f.title}"`, f.principal, f.termMonths, f.rateAnnual + '%', f.startDate, f.maturityDate, f.maturityPayout, f.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    downloadFile(csvContent, `Chamroeun_Nheat_Fixed_Term_${Date.now()}.csv`);
  }
  showToast("បានទាញយកឯកសារ Excel CSV ដោយជោគជ័យ!", "success");
}

function downloadFile(content, fileName) {
  const encodedUri = encodeURI(content);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- Master Render Function ---
function renderAll() {
  renderKPIs();
  renderDashboardRecentTable();
  renderPassbook();
  renderGrowthChart();
  runSimulation();
  renderFixedTermSection();
}

// --- Initialize Event Listeners ---
function initEvents() {
  // Mode Switchers
  dom.modeFlexibleBtn.addEventListener('click', () => switchSavingMode('flexible'));
  dom.modeFixedBtn.addEventListener('click', () => switchSavingMode('fixed'));

  // Main Add Button switches based on mode
  dom.mainAddActionBtn.addEventListener('click', () => {
    if (state.currentMode === 'flexible') {
      openAddModal();
    } else {
      openNewFixedModal();
    }
  });

  // Flexible Tabs
  dom.tabDashboardBtn.addEventListener('click', () => switchFlexibleTab('dashboard'));
  dom.tabPassbookBtn.addEventListener('click', () => switchFlexibleTab('passbook'));
  dom.tabProjectionBtn.addEventListener('click', () => switchFlexibleTab('projection'));
  dom.tabInsightsBtn.addEventListener('click', () => switchFlexibleTab('insights'));
  dom.viewFullPassbookLink.addEventListener('click', () => switchFlexibleTab('passbook'));

  // Header Actions
  dom.togglePrivacyBtn.addEventListener('click', togglePrivacy);
  dom.currencyToggleBtn.addEventListener('click', toggleCurrency);
  dom.langToggleBtn.addEventListener('click', toggleLanguage);
  dom.printPassbookBtn.addEventListener('click', () => {
    if (state.currentMode === 'flexible') {
      switchFlexibleTab('passbook');
      setTimeout(() => window.print(), 250);
    } else {
      openCertificateModal(state.fixedData[0]?.id);
      setTimeout(() => window.print(), 250);
    }
  });
  dom.exportCsvBtn.addEventListener('click', exportToCSV);

  // Flexible Modals & Actions
  dom.closeRecordModalBtn.addEventListener('click', () => dom.recordModal.classList.add('hidden'));
  dom.cancelRecordModalBtn.addEventListener('click', () => dom.recordModal.classList.add('hidden'));
  dom.pageSwitcherBtns.querySelectorAll('.page-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activePassbookPage = parseInt(btn.dataset.page, 10);
      renderPassbook();
    });
  });

  // Fixed Term Modals
  dom.openNewFixedDepositBtn.addEventListener('click', openNewFixedModal);
  dom.closeNewFixedModalBtn.addEventListener('click', () => dom.newFixedModal.classList.add('hidden'));
  dom.cancelNewFixedModalBtn.addEventListener('click', () => dom.newFixedModal.classList.add('hidden'));
  dom.closeCertificateBtn.addEventListener('click', () => dom.certificateModal.classList.add('hidden'));

  // Photo Scan Modal
  dom.viewOriginalScanBtn?.addEventListener('click', () => dom.photoScanModal.classList.remove('hidden'));
  dom.closePhotoScanModalBtn?.addEventListener('click', () => dom.photoScanModal.classList.add('hidden'));
  dom.photoScanTab1?.addEventListener('click', () => {
    dom.photoScanTab1.className = 'px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold';
    dom.photoScanTab2.className = 'px-3 py-1 rounded text-slate-300 hover:text-white';
    dom.photoScanImg.src = 'photos/page1_2025.jpg';
    dom.photoDownloadLink.href = 'photos/page1_2025.jpg';
  });
  dom.photoScanTab2?.addEventListener('click', () => {
    dom.photoScanTab2.className = 'px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold';
    dom.photoScanTab1.className = 'px-3 py-1 rounded text-slate-300 hover:text-white';
    dom.photoScanImg.src = 'photos/page2_2026.jpg';
    dom.photoDownloadLink.href = 'photos/page2_2026.jpg';
  });

  // Supabase Modal & Cloud Handlers
  const openSupaModal = () => {
    dom.supabaseUrlInput.value = state.supabase.url;
    dom.supabaseKeyInput.value = state.supabase.key;
    dom.supabaseModal.classList.remove('hidden');
  };
  dom.openSupabaseModalBtn.addEventListener('click', openSupaModal);
  dom.supabaseStatusBtn.addEventListener('click', openSupaModal);
  dom.closeSupabaseModalBtn.addEventListener('click', () => dom.supabaseModal.classList.add('hidden'));

  dom.testSupabaseBtn.addEventListener('click', () => {
    const url = dom.supabaseUrlInput.value.trim();
    const key = dom.supabaseKeyInput.value.trim();
    if (!url || !key) {
      alert("សូមបញ្ចូលទាំង Supabase Project URL និង Public Anon API Key!");
      return;
    }
    initSupabaseClient(url, key);
  });

  dom.pushToSupabaseBtn.addEventListener('click', pushDataToSupabase);
  dom.pullFromSupabaseBtn.addEventListener('click', pullDataFromSupabase);

  dom.copySqlSchemaBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA).then(() => {
      showToast("បានចម្លងកូដ SQL Schema ទៅកាន់ Clipboard រួចរាល់!", "success");
    }).catch(() => {
      alert("សូមចម្លងកូដនេះដោយដៃ:\n\n" + SUPABASE_SQL_SCHEMA);
    });
  });

  // Sliders
  [dom.simDepositInput, dom.simRateInput, dom.simGoalInput].forEach(inp => {
    inp.addEventListener('input', runSimulation);
  });

  setupChartInteractivity();

  window.addEventListener('resize', () => {
    if (state.currentMode === 'flexible' && state.currentFlexibleView === 'dashboard') {
      renderGrowthChart();
    }
  });
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  initEvents();
  renderAll();
});
