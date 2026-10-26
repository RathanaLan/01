# ⚡ HabitCraft: Daily Habit Routine & 1-Week Success Plan

A science-backed daily habit routine, nutrition architecture, productivity framework, and weekly budget system designed specifically for full-time professionals working **7:30 AM to 4:30 PM, Monday through Friday**.

---

## 🎯 Core Objectives & Success Architecture

1. **Morning Momentum:** Wake up at 5:30 AM without sleep inertia, prime circadian rhythm, physical movement, and clear daily priorities.
2. **Workplace Deep Work:** Execute two protected deep work blocks (8:00–10:00 AM and 1:00–3:00 PM) with Pomodoro intervals and batch shallow admin tasks.
3. **Compound Skill Learning:** Dedicate 60 focused minutes every evening (7:15–8:15 PM) to career-advancing skills (coding, AI, certifications, financial intelligence).
4. **Restorative Sleep:** 10-3-2-1-0 digital sunset wind-down at 9:00 PM for a solid 7.5 hours of high-quality sleep (10:00 PM – 5:30 AM).
5. **Intentional Financial Health:** Systematic weekly budget allocation (Food, Learning, Leisure, Savings/Investments) with live calculator.

---

## 📁 Project & Website Structure

```
habit-success-planner/
├── index.html                  # Homepage: Hour-by-Hour Master Schedule, Pomodoro Widget & Habit Tracker
├── templates/
│   ├── daily.html              # Template version for Flask / HTTP servers
│   └── weekly.html             # Separate Page: 1-Week Goals Checklist, Budget Breakdown & Calculator
├── static/
│   ├── css/
│   │   ├── style.css           # Modern theme styling, dark/light mode, responsive cards & tables
│   │   └── print.css           # Clean print-to-PDF stylesheet for physical desk sheets
│   └── js/
│       ├── app.js              # Routine filter, live hour highlighter, persistent daily checklist
│       ├── pomodoro.js         # Interactive Pomodoro focus timer with Web Audio API chime
│       ├── weekly.js           # Weekly goals checklist & dynamic interactive budget calculator
│       ├── recorder.js         # Daily journal/log recorder & microphone voice reflection memos
│       ├── supabase-config.js  # Supabase client credentials & configuration
│       └── supabase-sync.js    # Two-way sync engine, status badges & modal controls
├── supabase_schema.sql         # SQL schema migration for daily_habit_tracking table
├── app.py                      # Optional lightweight server (runs with `python app.py`)
└── README.md                   # Full documentation & habit science guide
```

---

## ⏱️ Master Schedule (Hour-by-Hour)

| Time Window | Phase | Primary Action | Key Protocol & Focus |
|---|---|---|---|
| **05:30 – 06:00 AM** | Morning Fuel | Wake up, 500ml water + lemon, open blinds | Circadian reset; zero smartphone scrolling |
| **06:00 – 06:40 AM** | Movement | Workout: Strength (M/W/F) or Cardio/Mobility (T/Th) | Endorphin surge; metabolic activation |
| **06:40 – 07:00 AM** | Mindset | Quick shower, 5-min gratitude & 3 MITs journaling | Intentional focus & mental clarity |
| **07:00 – 07:30 AM** | Nutrition | High-protein breakfast & commute transition | Sustained energy; listen to educational podcast |
| **07:30 – 08:00 AM** | Work Start | Workplace arrival, desk setup, calendar triage | Green tea; set the day's singular anchor goal |
| **08:00 – 10:00 AM** | Deep Work 1 | High-leverage execution (Pomodoro 50/10) | Zero Slack/email; tackle hardest cognitive task |
| **10:00 – 10:15 AM** | Refresh | Almonds/snack, posture stretch, eye break | Hydrate & stand up |
| **10:15 – 12:00 PM** | Collaboration | Meetings, team standups, urgent correspondence | Batched shallow work communication |
| **12:00 – 01:00 PM** | Lunch & Walk | Balanced meal + 15-minute outdoor walk in sunlight | Aids digestion; resets mental alertness |
| **01:00 – 03:00 PM** | Deep Work 2 | Core deliverable execution & problem solving | Two 50-minute sprints |
| **03:00 – 03:15 PM** | Break | Hydration, dark chocolate (85%), deep breathing | Overcome afternoon circadian dip |
| **03:15 – 04:15 PM** | Admin Wrap | Secondary tasks, approving requests, ticket triage | Low-cognitive-load processing |
| **04:15 – 04:30 PM** | Shutdown | Daily work shutdown ritual & prep tomorrow's top 3 | "Workday Complete" psychological boundary |
| **04:30 – 05:15 PM** | Transition | Commute home & cognitive decompression | Relaxing music / podcasts; shed workplace stress |
| **05:15 – 06:15 PM** | Conditioning | Outdoor walk / gym / sport / active recovery | Physical resilience & stress release |
| **06:15 – 07:15 PM** | Dinner | Nutritious dinner (salmon/tofu, greens, brown rice) | Whole foods; screen-free mindful eating |
| **07:15 – 08:15 PM** | Skill Sprint | 60 mins dedicated skill learning (coding, AI, finance) | Compounding personal career capital |
| **08:15 – 09:00 PM** | Leisure | Family, friends, gaming, music, guilt-free hobbies | Emotional joy and social connection |
| **09:00 – 09:30 PM** | Digital Sunset | Screens off, dim home lights, warm shower, herbal tea | Core body temperature drop for melatonin |
| **09:30 – 10:00 PM** | Reflection | 3 wins journal + 15 pages physical book reading | Calm nervous system; phone across the room |
| **10:00 PM – 05:30 AM** | Deep Sleep | Lights out: 7.5 hours uninterrupted restorative sleep | Full 5 x 90-minute sleep cycles |

---

## 🥗 Healthy Meal Suggestions

### 🍳 Breakfast (07:00 – 07:30 AM)
- **Option 1:** Greek yogurt bowl with chia seeds, blueberries, walnuts, and a light honey drizzle.
- **Option 2:** 3 scrambled eggs with baby spinach & half an avocado on whole grain sourdough toast.
- **Option 3 (Grab-and-Go):** Protein smoothie with oats, banana, plant/whey protein, and unsweetened almond milk.

### 🥙 Lunch (12:00 – 01:00 PM)
- **Option 1:** Mediterranean quinoa bowl with grilled chicken or tofu, diced cucumber, cherry tomatoes, and olive oil dressing.
- **Option 2:** Pan-baked salmon or lentil salad with roasted sweet potatoes and mixed greens.
- **Option 3:** Whole wheat wrap with lean turkey, hummus, baby spinach, and roasted peppers.

### 🍲 Dinner (06:15 – 07:15 PM)
- **Option 1:** Pan-seared white fish or tempeh with steamed asparagus and herb brown rice.
- **Option 2:** Lean turkey or grass-fed beef chili loaded with kidney beans and diced zucchini.
- **Option 3:** Asian-style vegetable stir-fry with edamame, broccoli, mushrooms, and sesame-garlic sauce.

### 🍎 Smart Snacks (10:00 AM & 03:00 PM)
- Crisp apple or banana with 1 tbsp raw almond butter.
- Handful of raw mixed nuts (almonds, walnuts) with 2 squares of 85% dark chocolate.
- Steamed edamame with sea salt or low-fat string cheese.

---

## 💰 Weekly Budget Plan Breakdown

Sample based on **$650 / week net earnings** (customizable via the interactive calculator on the Weekly page):

| Category | Weekly Target | % of Income | Strategic Purpose |
|---|---|---|---|
| **🥗 Food & Groceries** | **$140** | ~22% | High-protein whole foods, fresh veggies, smart meal prep. Zero wasted takeout. |
| **📚 Learning & Skills** | **$40** | ~6% | Books, online courses, software subscriptions, developer tools, certifications. |
| **☕ Leisure & Social** | **$75** | ~12% | Weekend dinners with friends, specialty coffee, hobbies, streaming entertainment. |
| **📈 Savings & Wealth** | **$395** | ~60% | Emergency runway, index fund contributions, retirement investing. |

---

## 🚀 How to Run the Website

### Option 1: Direct File Access (No installation required)
Simply double-click `index.html` in file explorer or open it in any browser:
```bash
# Windows
start index.html
```

### Option 2: Run via Python Server
```bash
python app.py
```
Then open your browser to **http://localhost:5050**.

---

## 💡 Key Features Built-In
- **Dynamic Current Hour Highlighter:** Automatically detects the current time and highlights the active routine block.
- **Interactive Habit Checklist:** Toggle items and see completion percentages update in real-time, saved to `localStorage`.
- **Integrated Pomodoro Timer:** 25m Focus / 5m Short Break / 15m Long Break with zero-dependency Web Audio API alert.
- **Interactive Budget Calculator:** Recalculates exact dollar targets based on your custom weekly income and preferred savings strategy.
- **Supabase Cloud Daily Tracking:** Automatic two-way cloud persistence for daily habits, energy levels, and reflections in a PostgreSQL table with live sync status.
- **Dark & Light Mode:** Seamlessly toggle between dark slate and clean light themes.
- **Print to PDF:** One-click print stylesheet that renders clean, black-and-white daily schedules for your desk.

---

## ⚡ Supabase Daily Tracking Setup

### 1. Run the SQL Migration
Open the Supabase Dashboard -> **SQL Editor** -> paste the contents of `supabase_schema.sql` (or `supabase/migrations/202610050001_daily_habit_tracking.sql`) and run it:
```sql
create table if not exists public.daily_habit_tracking (
  id text primary key,
  log_date date not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_email text default 'anonymous',
  mood text,
  sleep_hours numeric(3, 1) default 7.5,
  water_liters numeric(3, 2) default 2.5,
  morning_reflection text,
  evening_reflection text,
  habit_score text,
  completed_habits jsonb default '[]'::jsonb,
  raw_data jsonb default '{}'::jsonb
);

alter table public.daily_habit_tracking enable row level security;
create policy "Allow all daily habit tracking" on public.daily_habit_tracking for all using (true) with check (true);
```

### 2. Configure Credentials in the UI
1. Click the **Supabase Sync** badge button in the top navigation of the website.
2. Enter your Project URL and Publishable/Anon Key (pre-filled by default).
3. Click **Test Connection** — once verified, click **Sync Local & Cloud Records**.
4. Every time you record a daily log, it is saved both locally and pushed directly to your Supabase PostgreSQL table!

