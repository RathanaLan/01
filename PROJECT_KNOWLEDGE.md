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
  - Fields: `id` (int8, primary key), `created_at` (timestamptz), `User_Name` (text), `User_Sbuject` (text), `User_Message` (text), `User_Like_Count` (int8, default 0).
  - **Purpose**: Stores contact requests, direct inquiries, public guestbook comments, and live like counts from the portfolio.
  - **Policies Needed**: Requires public `anon` INSERT, SELECT, and UPDATE policies so portfolio visitors can submit, read, and like messages (see migration `supabase/migrations/202609300001_user_request.sql`).
  - **Realtime**: Added to `supabase_realtime` publication for instant live comment and like count sync.
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
- **2026-09-30 (Live Database Likes System - User_Like_Count)**:
  - **Feature**: Connected the heart like button on every comment card directly to column `User_Like_Count` in Supabase `public."User_Request"`.
  - **Functionality**:
    1. **Real Count Display**: Cards read and display the actual numeric count from `item.User_Like_Count` (defaults to 0 if null).
    2. **Direct Database Persistence**: Clicking like sends a `PATCH` / `.update()` directly to Supabase (`persistLikeCountToSupabase()`), incrementing or decrementing the persisted count.
    3. **Multi-User Realtime Sync**:
       - Supabase Realtime channel listens for `postgres_changes` with `eventType === 'UPDATE'` and updates the DOM count instantaneously without re-rendering the whole card (`updateCommentLikeCountUI()`).
       - Periodic background auto-poll (3.5s) syncs like counts across tabs and visitors.
    4. **Client-Side State**: `localStorage` records liked comment IDs (`dnkh_portfolio_liked_comments`) so the current visitor's heart toggle (`❤️ / 🤍`) persists across page reloads.
- **2026-09-30 (Mobile Responsiveness Overhaul - Header & Footer)**:
  - **Issues Identified on Phones (<= 768px & <= 480px)**:
    1. **Header Horizontal Overflow**: The theme toggle displayed full text `"Dark mode"` (120px) alongside language selector and hamburger, overflowing narrow phone screens (360px-414px) and pushing elements off-screen.
    2. **Mobile Nav Drawer Offsets**: `nav.main-nav` was positioned absolutely inside `.wrap` (which had a fixed margin and relative positioning), causing it to cut off or float awkwardly with uneven side gutters instead of spanning the full viewport edge-to-edge.
    3. **Hamburger Animation & Accessibility**: Lacked open/close state animations and touch targets were unoptimized for fingers.
    4. **Footer Wrapping Disorder**: `.footer-container` lacked centered column rules for mobile, causing two long lines of copyright and organization text to wrap unevenly against the screen edges.
  - **Fixes Applied**:
    1. **Header Actions Optimization**: On mobile, `#theme-label` text is hidden so `.theme-toggle` becomes a sleek 36px icon button (`◐`); reduced `.language-select` footprint and header gap. Header now fits comfortably even on 320px screens with zero horizontal overflow.
    2. **Fixed Edge-to-Edge Mobile Drawer**: Configured `nav.main-nav` to `position: fixed; top: 60px; left: 0; right: 0; width: 100%; max-height: calc(100vh - 60px); overflow-y: auto;` with smooth slide-down animation and 44px+ tap targets.
    3. **Animated Hamburger 'X'**: Added CSS keyframe transitions turning 3 hamburger lines into a crisp 'X' close icon when opened (`.is-active`), with background scroll locking and outside-click/Escape dismissal in `app.js`.
    4. **Centered Mobile Footer**: Added media query rules converting `.footer-container` into a centered vertical flex column with balanced margins and comfortable line spacing.
- **2026-09-30 (Root index.html 2026 Executive Portal Upgrade)**:
  - **Replaced Legacy 404 Splash Screen**: Replaced the outdated 404 error page at root `index.html` with a modern 2026 **Executive Gateway Portal** connecting all facets of Rathana Lan's digital ecosystem.
  - **Key Capabilities**:
    1. **Bento Portal Architecture**: Features a primary destination card (`Aboutme/index.html`), smart factory project shortcut (`Aboutme/index.html#projects`), and academic research hub (`homework/index.html`).
    2. **Interactive Constellation Canvas**: High-DPI hardware-accelerated particle network with dynamic node connections and pointer attraction for both desktop mouse and mobile touchscreens.
    3. **Time-Aware Greeting**: Automatically renders localized greetings (*"Good morning"*, *"Good afternoon"*, *"Good evening"*).
    4. **Smart Auto-Redirect**: Automatically carries visitors to `Aboutme/index.html` after 7 seconds, with an instant "Stay Here" pause button and "Enter Now" bypass.
    5. **Universal Responsiveness & Accessibility**: 100% responsive down to 320px screens with viewport metadata, reduced motion compatibility, and semantic landmarks.
    6. **Enlarged High-Impact Redirect Banner**: Expanded padding, font size (16px), glowing countdown badge, and prominent dual action buttons (`Stay Here` & `Enter Now 🚀`) for strong visual prominence and thumb ergonomics.








