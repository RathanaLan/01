# -*- coding: utf-8 -*-
"""
CSS Design System for CMS PRO 2030 Next-Gen Edition
Optimized with Crystal-Clear High-Legibility Khmer Typography
Fonts: Noto Sans Khmer (Primary), Battambang (Titles), Kantumruy Pro, Moul (Ceremonial)
Generous line-heights (1.75 - 1.85) to prevent clipped subscripts and vowels
High contrast colors for effortless readability on all screens
"""

CSS_CONTENT = r'''
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap');

/* ==========================================================================
   CMS PRO 2030 NEXT-GEN DESIGN SYSTEM - KHMER TYPOGRAPHY ENHANCED
   ========================================================================== */

:root {
    /* Cyber Dark Mode (Default) */
    --bg-canvas: #070913;
    --bg-surface: #0e1322;
    --bg-glass: rgba(15, 23, 42, 0.78);
    --bg-glass-card: rgba(19, 29, 54, 0.72);
    --bg-glass-hover: rgba(30, 43, 77, 0.88);
    --bg-input: rgba(10, 16, 31, 0.9);
    
    --border-glass: rgba(255, 255, 255, 0.14);
    --border-glow: rgba(99, 102, 241, 0.4);
    --border-highlight: rgba(255, 255, 255, 0.25);
    
    /* High-Contrast Crystal-Clear Text Colors */
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --text-muted: #94a3b8;
    --text-accent: #a5b4fc;
    
    /* Futuristic Neon Palette */
    --neon-indigo: #6366f1;
    --neon-purple: #8b5cf6;
    --neon-cyan: #06b6d4;
    --neon-pink: #ec4899;
    --neon-emerald: #10b981;
    --neon-amber: #f59e0b;
    --neon-rose: #f43f5e;
    --gold-cert: #d4af37;
    
    --shadow-glass: 0 20px 45px -15px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.35);
    --radius-sm: 14px;
    --radius-md: 20px;
    --radius-lg: 28px;
    --radius-full: 9999px;
    
    /* Premier Khmer Font Family Stack */
    --font-khmer: 'Noto Sans Khmer', 'Battambang', 'Kantumruy Pro', 'Khmer OS Battambang', 'Siemreap', sans-serif;
    --font-heading: 'Moul', 'Khmer OS Muol Light', serif;
    --font-title: 'Battambang', 'Noto Sans Khmer', sans-serif;
    --font-mono: 'Outfit', 'Inter', monospace;
    --transition-spring: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Light Crystal Luxury Mode */
[data-theme="light"] {
    --bg-canvas: #f4f6fc;
    --bg-surface: #ffffff;
    --bg-glass: rgba(255, 255, 255, 0.88);
    --bg-glass-card: rgba(255, 255, 255, 0.95);
    --bg-glass-hover: #ffffff;
    --bg-input: #ffffff;
    
    --border-glass: rgba(99, 102, 241, 0.16);
    --border-glow: rgba(99, 102, 241, 0.28);
    --border-highlight: rgba(255, 255, 255, 0.95);
    
    --text-primary: #0f172a;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --text-accent: #4338ca;
    
    --shadow-glass: 0 15px 35px -10px rgba(99, 102, 241, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.95);
    --shadow-glow: 0 0 25px rgba(99, 102, 241, 0.2);
}

/* Base Reset & Smooth Scroll */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    font-size: 16.5px; /* Generous base scale for Khmer legibility */
}

body {
    background-color: var(--bg-canvas);
    color: var(--text-primary);
    font-family: var(--font-khmer);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    line-height: 1.8; /* Crucial for Khmer vowels and subscripts */
    font-weight: 500;
    letter-spacing: 0;
    transition: background-color 0.4s ease, color 0.4s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}

/* Dynamic Aurora Mesh Glow */
body::before, body::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    z-index: -1;
    pointer-events: none;
    opacity: 0.55;
    will-change: transform;
}

body::before {
    width: 600px;
    height: 600px;
    top: -150px;
    left: -100px;
    background: radial-gradient(circle, var(--neon-purple) 0%, rgba(99,102,241,0.4) 50%, transparent 80%);
    animation: auroraFloat1 22s infinite alternate ease-in-out;
}

body::after {
    width: 650px;
    height: 650px;
    bottom: -150px;
    right: -100px;
    background: radial-gradient(circle, var(--neon-cyan) 0%, rgba(16,185,129,0.3) 50%, transparent 80%);
    animation: auroraFloat2 26s infinite alternate-reverse ease-in-out;
}

@keyframes auroraFloat1 {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(120px, 80px) scale(1.15); }
    100% { transform: translate(60px, 160px) scale(0.95); }
}

@keyframes auroraFloat2 {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-100px, -60px) scale(1.1); }
    100% { transform: translate(-50px, -140px) scale(0.9); }
}

/* Cyber Grid Texture Overlay */
.cyber-grid-overlay {
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: -1;
    opacity: 0.6;
}

[data-theme="light"] .cyber-grid-overlay {
    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.08) 1px, transparent 1px);
}

/* ==========================================================================
   TOP FLOATING GLASS BAR
   ========================================================================== */
.top-glass-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 72px;
    background: var(--bg-glass);
    backdrop-filter: blur(22px) saturate(180%);
    -webkit-backdrop-filter: blur(22px) saturate(180%);
    border-bottom: 1px solid var(--border-glass);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.top-left-group {
    display: flex;
    align-items: center;
    gap: 16px;
}

.hamburger-btn-2030 {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-sm);
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    cursor: pointer;
    transition: var(--transition-spring);
}

.hamburger-btn-2030:hover {
    background: var(--neon-indigo);
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
}

.brand-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
}

.brand-logo-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--neon-indigo), var(--neon-purple));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.35rem;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

.brand-title {
    font-weight: 800;
    font-size: 1.25rem;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.5;
}

.hologram-chip {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2));
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Center Clock & Lunar Buddhist Calendar */
.top-center-clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
}

.clock-digital {
    font-family: var(--font-mono);
    font-size: 1.22rem;
    font-weight: 800;
    color: var(--neon-cyan);
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-shadow: 0 0 12px rgba(6, 182, 212, 0.5);
}

.clock-pulse-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--neon-emerald);
    box-shadow: 0 0 8px var(--neon-emerald);
    animation: pulseDot 1.4s infinite ease-in-out;
}

@keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
}

.calendar-khmer-badge {
    font-size: 0.92rem;
    color: var(--text-secondary);
    font-weight: 600;
    line-height: 1.5;
}

/* Right Actions */
.top-right-group {
    display: flex;
    align-items: center;
    gap: 12px;
}

.theme-toggle-btn {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-sm);
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    cursor: pointer;
    transition: var(--transition-spring);
}

.theme-toggle-btn:hover {
    background: var(--bg-glass-hover);
    color: var(--neon-amber);
    transform: rotate(15deg);
}

.ai-assistant-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
    color: #fff;
    border: none;
    font-family: var(--font-khmer);
    font-weight: 700;
    font-size: 0.94rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.35);
    transition: var(--transition-spring);
}

.ai-assistant-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 25px rgba(236, 72, 153, 0.5);
}

.user-profile-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px 6px 6px;
    border-radius: var(--radius-full);
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    cursor: pointer;
    transition: var(--transition-spring);
    text-decoration: none;
    color: inherit;
}

.user-profile-chip:hover {
    background: var(--bg-glass-hover);
    border-color: var(--neon-indigo);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
}

.avatar-ring {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--neon-indigo), var(--neon-cyan));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.9rem;
}

.user-info-text {
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: 1.35;
}

.user-name-label {
    font-weight: 700;
    font-size: 0.92rem;
}

.user-role-label {
    font-size: 0.8rem;
    color: var(--neon-emerald);
    font-weight: 600;
}

/* ==========================================================================
   MAIN HERO & KPI DASHBOARD
   ========================================================================== */
.hero-container {
    max-width: 1200px;
    margin: 92px auto 20px;
    padding: 0 20px;
}

.hero-glass-card {
    background: var(--bg-glass);
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-lg);
    padding: 34px 30px 28px;
    box-shadow: var(--shadow-glass);
    position: relative;
    overflow: hidden;
    margin-bottom: 24px;
}

.hero-glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3.5px;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-indigo), var(--neon-pink));
}

.hero-header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 24px;
}

.hero-title-box h1 {
    font-family: var(--font-heading);
    font-size: 2.1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ffffff 30%, var(--neon-cyan) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.7; /* Ample line height for Moul glyphs */
    margin-bottom: 8px;
    padding-bottom: 4px;
}

[data-theme="light"] .hero-title-box h1 {
    background: linear-gradient(135deg, #3730a3 30%, #4338ca 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.02rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    line-height: 1.8;
}

.status-active-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.18);
    color: var(--neon-emerald);
    border: 1px solid rgba(16, 185, 129, 0.35);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: 0.88rem;
    font-weight: 700;
}

/* Fast Action Bar */
.fast-action-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.fast-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 18px;
    border-radius: var(--radius-md);
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    font-family: var(--font-khmer);
    font-weight: 700;
    font-size: 0.94rem;
    line-height: 1.5;
    cursor: pointer;
    transition: var(--transition-spring);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.fast-action-btn:hover {
    background: var(--neon-indigo);
    color: #fff;
    transform: translateY(-2px);
    border-color: var(--neon-indigo);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.fast-action-btn.btn-glow {
    background: linear-gradient(135deg, var(--neon-indigo), var(--neon-purple));
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
}

/* Notice Ticker 2030 */
.notice-glass-ticker {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(99, 102, 241, 0.14);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: var(--radius-md);
    padding: 12px 18px;
    margin-bottom: 20px;
    text-decoration: none;
    color: inherit;
    transition: var(--transition-spring);
    overflow: hidden;
}

.notice-glass-ticker:hover {
    background: rgba(99, 102, 241, 0.22);
    border-color: var(--neon-cyan);
    transform: translateY(-2px);
}

.notice-pill {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--neon-indigo);
    color: #fff;
    padding: 5px 14px;
    border-radius: var(--radius-full);
    font-size: 0.88rem;
    font-weight: 800;
}

.notice-text-scroll {
    flex: 1 1 auto;
    font-size: 0.96rem;
    line-height: 1.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-primary);
}

.notice-text-scroll strong {
    color: var(--neon-cyan);
}

.notice-arrow {
    flex: 0 0 auto;
    color: var(--neon-cyan);
    font-size: 0.95rem;
}

/* Promo Banner 2030 (KHQR ABA) */
.promo-glass-banner {
    display: flex;
    align-items: center;
    gap: 16px;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%);
    border: 1.5px solid rgba(239, 68, 68, 0.4);
    border-radius: var(--radius-md);
    padding: 14px 20px;
    margin-bottom: 24px;
    text-decoration: none;
    color: inherit;
    transition: var(--transition-spring);
    box-shadow: 0 8px 25px -10px rgba(239, 68, 68, 0.35);
    position: relative;
    overflow: hidden;
}

.promo-glass-banner:hover {
    transform: translateY(-2px);
    border-color: #ef4444;
    box-shadow: 0 12px 30px -8px rgba(239, 68, 68, 0.5);
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.22) 0%, rgba(99, 102, 241, 0.22) 100%);
}

.promo-badge-pulse {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ef4444;
    color: #fff;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    font-size: 0.88rem;
    font-weight: 800;
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
}

.promo-banner-text {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.promo-banner-text strong {
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.promo-banner-text span {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary);
}

.promo-cta-chip {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, #ef4444, #f43f5e);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 800;
    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.45);
    transition: var(--transition-spring);
}

.promo-glass-banner:hover .promo-cta-chip {
    transform: scale(1.05);
}

@media (max-width: 640px) {
    .promo-glass-banner {
        flex-wrap: wrap;
        padding: 14px;
        gap: 12px;
    }
    .promo-banner-text strong {
        white-space: normal;
    }
    .promo-cta-chip {
        width: 100%;
        justify-content: center;
    }
}

/* ==========================================================================
   EXECUTIVE 2030 KPI DASHBOARD (4 CARDS + SPARKLINE)
   ========================================================================== */
.kpi-grid-2030 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
    margin-bottom: 24px;
}

.kpi-card-2030 {
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    padding: 22px 20px;
    position: relative;
    overflow: hidden;
    transition: var(--transition-spring);
    box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.35);
    cursor: pointer;
}

.kpi-card-2030:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: var(--neon-indigo);
    box-shadow: 0 14px 30px -10px rgba(99, 102, 241, 0.4);
}

.kpi-card-2030::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--card-accent, var(--neon-indigo));
}

.kpi-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.kpi-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--icon-bg, rgba(99, 102, 241, 0.15));
    color: var(--icon-color, var(--neon-indigo));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.kpi-tag {
    font-size: 0.85rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
}

.kpi-value-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
}

.kpi-number {
    font-family: var(--font-mono);
    font-size: 2.1rem;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.1;
}

.kpi-unit {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-secondary);
}

.kpi-label {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 10px;
    line-height: 1.5;
}

.kpi-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-secondary);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 10px;
}

.kpi-badge-good {
    color: var(--neon-emerald);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

/* Sparkline Trend Chart Card */
.sparkline-container {
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    padding: 20px 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
}

.sparkline-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.sparkline-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.6;
}

.sparkline-desc {
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--text-secondary);
}

.sparkline-chart-svg {
    width: 320px;
    height: 52px;
    overflow: visible;
}

/* ==========================================================================
   QUICK-BAR MARQUEE (11 NEON PILLS)
   ========================================================================== */
.quick-bar-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto 30px;
    padding: 0 20px;
}

.quick-bar-glass {
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-lg);
    padding: 14px 0;
    overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-glass);
}

.quick-bar-glass::before, .quick-bar-glass::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 45px;
    z-index: 2;
    pointer-events: none;
}

.quick-bar-glass::before {
    left: 0;
    background: linear-gradient(90deg, var(--bg-canvas), transparent);
}

.quick-bar-glass::after {
    right: 0;
    background: linear-gradient(270deg, var(--bg-canvas), transparent);
}

.quick-marquee-track {
    display: flex;
    align-items: center;
    gap: 14px;
    width: max-content;
    will-change: transform;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    padding: 0 12px;
}

.quick-marquee-track:active {
    cursor: grabbing;
}

.quick-pill-card {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 9px 18px;
    border-radius: var(--radius-full);
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    text-decoration: none;
    color: var(--text-primary);
    font-size: 0.94rem;
    font-weight: 700;
    line-height: 1.5;
    transition: var(--transition-spring);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.quick-pill-card:hover {
    background: var(--pill-bg, var(--neon-indigo));
    color: #fff;
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 8px 20px var(--pill-glow, rgba(99, 102, 241, 0.45));
    border-color: transparent;
}

.quick-pill-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.92rem;
}

/* ==========================================================================
   2030 FUTURISTIC MENU GRID
   ========================================================================== */
.menu-grid-section {
    max-width: 1200px;
    margin: 0 auto 50px;
    padding: 0 20px;
}

.section-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    flex-wrap: wrap;
    gap: 14px;
}

.section-title {
    font-size: 1.35rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-primary);
    line-height: 1.6;
}

.section-title i {
    color: var(--neon-indigo);
}

.menu-search-input {
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-full);
    padding: 10px 18px 10px 42px;
    font-family: inherit;
    font-size: 0.98rem;
    color: var(--text-primary);
    outline: none;
    transition: var(--transition-spring);
    width: 270px;
}

.menu-search-input:focus {
    border-color: var(--neon-indigo);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.35);
    width: 310px;
}

.search-input-wrapper {
    position: relative;
    display: inline-block;
}

.search-input-wrapper i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 0.95rem;
    pointer-events: none;
}

.menu-grid-2030 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
    gap: 20px;
}

.menu-card-2030 {
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-lg);
    padding: 26px 16px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: var(--text-primary);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-spring);
    box-shadow: var(--shadow-glass);
}

.menu-card-2030::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    padding: 1.5px;
    background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.18), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

.menu-card-2030:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--card-color, var(--neon-indigo));
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.45), 0 0 25px var(--card-glow, rgba(99, 102, 241, 0.4));
    background: var(--bg-glass-hover);
}

.menu-card-icon-box {
    width: 70px;
    height: 70px;
    border-radius: 20px;
    background: linear-gradient(135deg, var(--c1, var(--neon-indigo)), var(--c2, var(--neon-purple)));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.95rem;
    margin-bottom: 16px;
    box-shadow: 0 10px 22px -6px var(--c1, rgba(99, 102, 241, 0.5));
    transition: var(--transition-spring);
}

.menu-card-2030:hover .menu-card-icon-box {
    transform: scale(1.12) rotate(4deg);
}

.menu-card-title {
    font-weight: 700;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.menu-card-badge {
    font-size: 0.82rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
}

.menu-card-2030:hover .menu-card-badge {
    background: var(--card-color, var(--neon-indigo));
    color: #fff;
}

/* ==========================================================================
   2030 INTERACTIVE MODAL ENGINE
   ========================================================================== */
.modal-overlay-2030 {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(7, 9, 19, 0.84);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: 2500;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.modal-overlay-2030.open {
    display: flex;
    opacity: 1;
}

.modal-container-2030 {
    background: var(--bg-surface);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 840px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.75), 0 0 35px rgba(99, 102, 241, 0.25);
    transform: scale(0.92) translateY(20px);
    transition: var(--transition-spring);
}

.modal-overlay-2030.open .modal-container-2030 {
    transform: scale(1) translateY(0);
}

.modal-container-2030.wide-mode {
    max-width: 1120px;
}

.modal-header-2030 {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.25));
    border-bottom: 1px solid var(--border-glass);
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-title-2030 {
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.6;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 12px;
}

.modal-title-2030 i {
    color: var(--neon-cyan);
}

.modal-close-btn-2030 {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.1rem;
    transition: var(--transition-spring);
}

.modal-close-btn-2030:hover {
    background: var(--neon-rose);
    color: #fff;
    transform: rotate(90deg) scale(1.05);
}

.modal-body-2030 {
    padding: 26px;
    overflow-y: auto;
    max-height: calc(90vh - 120px);
    font-size: 0.98rem;
    line-height: 1.8;
}

/* Modal Form Controls */
.form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-bottom: 16px;
}

.form-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 18px;
    margin-bottom: 16px;
}

@media (max-width: 640px) {
    .form-grid-2, .form-grid-3 {
        grid-template-columns: 1fr;
    }
}

.form-group-2030 {
    margin-bottom: 18px;
    text-align: left;
}

.form-group-2030 label {
    display: block;
    font-size: 0.96rem;
    font-weight: 700;
    line-height: 1.6;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.form-control-2030 {
    width: 100%;
    padding: 13px 16px;
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    border: 1.5px solid var(--border-glass);
    color: var(--text-primary);
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.7;
    transition: var(--transition-spring);
    outline: none;
}

.form-control-2030:focus {
    border-color: var(--neon-indigo);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.35);
    background: var(--bg-surface);
}

/* ==========================================================================
   SMART SEATING MATRIX (5x9 = 45 DESKS)
   ========================================================================== */
.classroom-podium {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2));
    border: 1.5px dashed var(--neon-cyan);
    border-radius: var(--radius-md);
    padding: 15px;
    text-align: center;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--neon-cyan);
    line-height: 1.6;
}

.seating-matrix-grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 11px;
    margin-bottom: 22px;
}

@media (max-width: 900px) {
    .seating-matrix-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}

@media (max-width: 550px) {
    .seating-matrix-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.desk-unit-card {
    background: var(--bg-glass-card);
    border: 1.5px solid var(--border-glass);
    border-radius: var(--radius-sm);
    padding: 11px 8px;
    text-align: center;
    cursor: pointer;
    transition: var(--transition-spring);
    user-select: none;
    position: relative;
}

.desk-unit-card:hover {
    transform: translateY(-4px) scale(1.05);
    border-color: var(--neon-indigo);
    box-shadow: 0 8px 18px rgba(99, 102, 241, 0.35);
}

.desk-number {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-secondary);
    margin-bottom: 4px;
}

.desk-avatar-icon {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin: 0 auto 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    color: #fff;
    background: linear-gradient(135deg, var(--neon-indigo), var(--neon-purple));
}

.desk-avatar-icon.female {
    background: linear-gradient(135deg, var(--neon-pink), var(--neon-purple));
}

.desk-student-name {
    font-weight: 700;
    font-size: 0.92rem;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 6px;
    color: var(--text-primary);
}

.desk-status-badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: var(--radius-full);
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1.65;
}

.desk-status-badge.present {
    background: rgba(16, 185, 129, 0.22);
    color: var(--neon-emerald);
    border: 1px solid var(--neon-emerald);
}

.desk-status-badge.permission {
    background: rgba(245, 158, 11, 0.22);
    color: var(--neon-amber);
    border: 1px solid var(--neon-amber);
}

.desk-status-badge.absent {
    background: rgba(244, 63, 94, 0.22);
    color: var(--neon-rose);
    border: 1px solid var(--neon-rose);
}

.desk-status-badge.late {
    background: rgba(6, 182, 212, 0.22);
    color: var(--neon-cyan);
    border: 1px solid var(--neon-cyan);
}

/* ==========================================================================
   8-SUBJECT MOEYS GRADEBOOK TABLE
   ========================================================================== */
.table-responsive-box {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    background: var(--bg-glass-card);
}

.cms-table-2030 {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.96rem;
    line-height: 1.7;
    text-align: left;
    white-space: nowrap;
}

.cms-table-2030 th, .cms-table-2030 td {
    padding: 13px 16px;
    border-bottom: 1px solid var(--border-glass);
}

.cms-table-2030 th {
    background: rgba(99, 102, 241, 0.15);
    color: var(--text-primary);
    font-weight: 800;
    position: sticky;
    top: 0;
    z-index: 10;
}

.cms-table-2030 tbody tr:hover {
    background: rgba(99, 102, 241, 0.09);
}

.grade-input-cell {
    width: 62px;
    padding: 7px 8px;
    border-radius: 8px;
    background: var(--bg-input);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.95rem;
    text-align: center;
    outline: none;
}

.grade-input-cell:focus {
    border-color: var(--neon-indigo);
    background: var(--bg-surface);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.35);
}

/* ==========================================================================
   HOLOGRAPHIC CERTIFICATE OF HONOR (ROYAL EMBLEM)
   ========================================================================== */
.hologram-certificate {
    background: #0d111e;
    color: #f8fafc;
    border: 4px solid var(--gold-cert);
    border-radius: var(--radius-md);
    padding: 38px 32px;
    position: relative;
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.28), inset 0 0 40px rgba(212, 175, 55, 0.12);
    text-align: center;
    margin: 10px 0;
}

.cert-guilloche-border {
    position: absolute;
    inset: 10px;
    border: 2px dashed rgba(212, 175, 55, 0.65);
    pointer-events: none;
    border-radius: 12px;
}

.cert-royal-emblem-svg {
    width: 85px;
    height: 85px;
    margin: 0 auto 10px;
    filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));
}

.cert-khmer-motto {
    font-weight: 800;
    font-size: 1.15rem;
    color: var(--gold-cert);
    letter-spacing: 0.5px;
    line-height: 1.8;
    margin-bottom: 4px;
}

.cert-title-moul {
    font-family: var(--font-heading);
    font-size: 2.1rem;
    color: #fff;
    margin: 10px 0;
    line-height: 1.8;
    text-shadow: 0 0 15px rgba(212, 175, 55, 0.45);
}

.cert-student-highlight {
    font-size: 2.1rem;
    font-weight: 800;
    color: var(--gold-cert);
    text-decoration: underline;
    margin: 14px 0 8px;
    font-family: var(--font-khmer);
    line-height: 1.8;
}

.cert-qr-box {
    width: 95px;
    height: 95px;
    background: #fff;
    padding: 6px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(0,0,0,0.4);
}

.cert-red-seal {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 3px dashed #ef4444;
    color: #ef4444;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    transform: rotate(-12deg);
    line-height: 1.35;
}

/* ==========================================================================
   2030 AI CLASSROOM ASSISTANT PANEL
   ========================================================================== */
.ai-chat-container {
    display: flex;
    flex-direction: column;
    height: 500px;
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.ai-messages-scroll {
    flex: 1 1 auto;
    padding: 22px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.ai-bubble {
    max-width: 85%;
    padding: 16px 20px;
    border-radius: 20px;
    font-size: 1rem;
    line-height: 1.85;
}

.ai-bubble.bot {
    align-self: flex-start;
    background: rgba(99, 102, 241, 0.16);
    border: 1px solid rgba(99, 102, 241, 0.35);
    color: var(--text-primary);
    border-bottom-left-radius: 4px;
}

.ai-bubble.user {
    align-self: flex-end;
    background: linear-gradient(135deg, var(--neon-indigo), var(--neon-purple));
    color: #fff;
    border-bottom-right-radius: 4px;
}

.ai-quick-prompts {
    display: flex;
    gap: 10px;
    padding: 12px 18px;
    overflow-x: auto;
    border-top: 1px solid var(--border-glass);
    background: rgba(0, 0, 0, 0.12);
}

.ai-prompt-chip {
    flex: 0 0 auto;
    padding: 8px 16px;
    border-radius: var(--radius-full);
    background: var(--bg-glass-card);
    border: 1px solid var(--border-glass);
    color: var(--text-secondary);
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition-spring);
}

.ai-prompt-chip:hover {
    background: var(--neon-indigo);
    color: #fff;
    border-color: var(--neon-indigo);
}

.ai-input-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid var(--border-glass);
    background: var(--bg-surface);
}

.ai-input-field {
    flex: 1 1 auto;
    background: var(--bg-input);
    border: 1.5px solid var(--border-glass);
    border-radius: var(--radius-full);
    padding: 12px 20px;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 0.98rem;
    outline: none;
}

.ai-send-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--neon-indigo), var(--neon-purple));
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: var(--transition-spring);
}

.ai-send-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}

/* ==========================================================================
   SIDE DRAWER MENU 2030
   ========================================================================== */
.side-drawer-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 2000;
}

.side-drawer-overlay.active {
    display: block;
}

.side-drawer-panel {
    position: fixed;
    top: 0;
    left: -350px;
    width: 330px;
    height: 100vh;
    background: var(--bg-surface);
    border-right: 1px solid var(--border-glass);
    box-shadow: 20px 0 50px rgba(0, 0, 0, 0.55);
    z-index: 2100;
    display: flex;
    flex-direction: column;
    transition: left 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.side-drawer-panel.active {
    left: 0;
}

.drawer-header {
    padding: 22px 20px;
    border-bottom: 1px solid var(--border-glass);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.drawer-list-scroll {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 16px 12px;
    list-style: none;
}

.drawer-item a {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 18px;
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.98rem;
    line-height: 1.6;
    transition: var(--transition-spring);
    margin-bottom: 4px;
}

.drawer-item a:hover {
    background: rgba(99, 102, 241, 0.16);
    color: var(--neon-cyan);
    transform: translateX(6px);
}

.drawer-item a i {
    width: 24px;
    text-align: center;
    color: var(--neon-indigo);
    font-size: 1.15rem;
}

/* Print Rules for Certificates & Reports */
@media print {
    body { background: #fff !important; color: #000 !important; }
    .top-glass-bar, .fast-action-bar, .notice-glass-ticker, .promo-glass-banner, .menu-grid-section, .modal-close-btn-2030, .fast-action-btn { display: none !important; }
    .modal-overlay-2030 { position: static !important; display: block !important; background: transparent !important; padding: 0 !important; }
    .modal-container-2030 { max-width: 100% !important; border: none !important; box-shadow: none !important; }
    .hologram-certificate { border: 4px solid #b8860b !important; color: #000 !important; background: #fff !important; }
}
'''
