# Project Knowledge Base: My_PortFolio

> **Purpose**: This living document stores knowledge, architectural details, configurations, conventions, and discovered patterns for the `My_PortFolio` project. It is automatically updated as new features, fixes, or requirements emerge.

---

## 1. Project Overview & Identity
- **Owner**: Rathana Lan
- **Role**: Digital Transformation (DX) Supervisor at DNKH (Cambodia)
- **Focus Areas**: Manufacturing Digital Transformation, DX Strategy & Governance, Power Platform, Smart Factory Readiness.
- **Tech Stack**:
  - **Frontend**: Vanilla HTML5, Modern CSS (Custom Properties, responsive design, dark/light theme), JavaScript (ES6+).
  - **CSS Framework**: Tailwind CSS (used in `homework/01.html`).
  - **Backend / BaaS**: Supabase (PostgreSQL, Auth, Storage, Edge Functions).
  - **Icons & Fonts**: Google Fonts (*DM Sans*, *Manrope*, *Noto Sans Khmer*, *Inter*), Lucide Icons.
  - **Desktop / AI Experiment**: Python with CustomTkinter & Ollama (`codellama`).

---

## 2. Directory & Architecture Map

| Path | Purpose |
| :--- | :--- |
| `index.html` | Animated landing / 404 canvas page (particle water droplet trails) redirecting to `/Aboutme`. |
| `Aboutme/index.html` | Main professional portfolio website with multilingual toggle (EN, KM, JA, ZH), theme switch, timeline, and project highlights. |
| `login.html` & `profile.html` | Authentication and user profile management pages powered by Supabase. |
| `assets/css/` | Core styles: `styles.css` (portfolio theme & typography), `login.css`, `profile.css`. |
| `assets/js/` | Client scripts: `theme.js` (dark/light toggle), `supabase-config.js` (credentials), `login.js`, `profile.js`, `app.js`. |
| `homework/01.html` | "User Record Directory" — Full-featured admin/user management CRUD dashboard using Tailwind CSS and Supabase. |
| `homework/index.html` | Sandbox / homework page with scroll-to-top interaction. |
| `homework/supabaseConfig.js` | ES Module exporting Supabase credentials for homework exercises. |
| `supabase/` | Database migrations (`202609290001_profiles.sql`) and Edge Functions (`delete-account`). |
| `chatbot.py` | Local desktop AI assistant GUI running via Ollama. |

---

## 3. Backend & Supabase Configuration

### Environment & Endpoints
- **Supabase URL**: `https://dgehlxhbggqxiznsryrv.supabase.co`
- **Publishable Key**: `sb_publishable_0r0SqqjiXg8KGQVqQZM0TQ_KuCheFqj`
- **Config locations**:
  - Global browser window: `assets/js/supabase-config.js` (`window.PORTFOLIO_SUPABASE_CONFIG`)
  - ES Module import: `homework/supabaseConfig.js`

### Database Schema & Policies
- **Table `public.profiles`**:
  - Fields: `id` (uuid, references `auth.users`), `display_name` (text <= 100), `job_title` (text <= 120), `location` (text <= 120), `bio` (text <= 1200), `website` (text <= 300), `avatar_path` (text), `updated_at` (timestamptz).
  - **Row Level Security (RLS)**: Enabled. Users can only select, insert, or update their own profile matching `auth.uid() = id`.
  - **Triggers**: `on_auth_user_created_profile` automatically creates a profile row upon signup via `create_profile_for_new_user()`.
- **Table `public."User_Request"`**:
  - Fields: `id` (int8, primary key), `created_at` (timestamptz), `User_Name` (text), `User_Sbuject` (text), `User_Message` (text).
  - **Purpose**: Stores contact requests, direct inquiries, and public guestbook comments from the portfolio.
  - **Policies Needed**: Requires public `anon` INSERT and SELECT policies so portfolio visitors can submit and view messages without logging in (see migration `supabase/migrations/202609300001_user_request.sql`).
  - **Realtime**: Added to `supabase_realtime` publication for instant live comment sync.
- **Storage Buckets**:
  - `profile-photos`: Private bucket (5MB limit; jpg, png, webp).

---

## 4. Design System & Conventions
- **Theming**:
  - Handled via `assets/js/theme.js` using `data-theme="dark"` or `"light"` attribute on the `<html>` root.
  - Preference saved in `localStorage.getItem("theme")`.
- **Responsive Layout**:
  - Mobile-first to desktop breakpoints using standard CSS grid and flexbox.
  - Multi-language support in `Aboutme/index.html` configured for English, Khmer (`Noto Sans Khmer`), Japanese, and Chinese.

---

## 5. Discovered Patterns & Update Log
*Whenever new workflows, quirks, or features are added or discovered, record them here:*

- **2026-09-30**: Initial knowledge base established. Root `index.html` identified as a stylized redirect/404 canvas screen pointing to `/Aboutme`. Supabase authentication and homework CRUD systems mapped.
- **2026-09-30 (Modernization Update)**:
  - **Path Fixes**: `Aboutme/index.html` had broken relative script reference to `assets/js/app.js` and relative links to `login.html` and `profile.html`. Fixed to `../assets/js/app.js`, `../login.html`, `../profile.html`, plus added link to `../homework/01.html`.
  - **Modern 2026 UI Architecture**: Refactored `assets/css/styles.css` into a clean, unified, high-performance design system with design tokens, glassmorphic sticky header, ambient gradients, mobile hamburger drawer, responsive bento grids, and print stylesheet.
  - **Interactive Features**: Added click-to-copy email button with visual feedback, floating back-to-top button, radar availability ping badge, and enhanced project category filter tabs.
- **2026-09-30 (Direct Supabase Contact & Realtime Comments Feed)**:
  - Connected the contact form directly to Supabase table `User_Request` via `@supabase/supabase-js@2`.
  - Removed all legacy `mailto:` listeners that triggered OS/browser email popups; submissions now send 100% directly from the webpage.
  - Added cache-buster `?v=20260930_v2` to prevent stale script execution in the browser.
  - Added public visitor inquiries and live comments feed below the contact form with instant realtime updates using `supabase.channel(...)`.
- **2026-09-30 (Multi-Layer Realtime Sync Architecture)**:
  - Upgraded `assets/js/app.js` with a 4-tier sync strategy:
    1. **Instant UI Prepend**: Immediate optimistic rendering with highlight-flash on submission.
    2. **Smart Diffing**: Server re-fetch checks for unrendered `id`s to avoid list wiping.
    3. **Background Auto-Poll (3.5s)**: Guaranteed live sync across all tabs and devices even if WebSocket publications are restricted.
    4. **WebSocket Channel**: Supabase Realtime channel (`event: '*'`) for millisecond push events.
    5. **Manual Refresh Trigger**: Added interactive `↻` button in `.live-status-pill`.




