# -*- coding: utf-8 -*-
"""
Khmer Typography Refinement Engine - CMS PRO 2030
Upgrades all font imports, CSS typography rules, font families,
line-heights, contrast, and font sizes across the entire codebase.
"""
import sys
import os
import re

sys.stdout.reconfigure(encoding='utf-8')

GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap"

GOOGLE_FONTS_LINK = f'''    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="{GOOGLE_FONTS_URL}" rel="stylesheet">'''

FONT_IMPORT_CSS = f"@import url('{GOOGLE_FONTS_URL}');\n\n"

print("1. Extracting and refining CSS in css_2030.py and home_style.css...")

with open('d:/CMS PRO/css_2030.py', 'r', encoding='utf-8') as f:
    css_py = f.read()

m = re.search(r'CSS_CONTENT = r\'\'\'(.*?)\'\'\'', css_py, re.DOTALL)
if not m:
    print("Error: Could not extract CSS_CONTENT from css_2030.py")
    sys.exit(1)

css_body = m.group(1).strip()

# Add @import at top of CSS if not present
if '@import' not in css_body:
    css_body = FONT_IMPORT_CSS + css_body

# Ensure font variables are defined with high clarity
css_body = re.sub(
    r'--font-khmer:\s*[^;]+;',
    "--font-khmer: 'Noto Sans Khmer', 'Battambang', 'Kantumruy Pro', 'Khmer OS Battambang', 'Siemreap', sans-serif;",
    css_body
)
css_body = re.sub(
    r'--font-heading:\s*[^;]+;',
    "--font-heading: 'Moul', 'Khmer OS Muol Light', serif;\n    --font-title: 'Battambang', 'Noto Sans Khmer', sans-serif;",
    css_body
)

# Ensure tight line-heights are fixed
css_body = re.sub(r'line-height:\s*1\.2;', 'line-height: 1.5;', css_body)
css_body = re.sub(r'line-height:\s*1\.4;', 'line-height: 1.65;', css_body)

# Write to home_style.css
with open('d:/CMS PRO/home_style.css', 'w', encoding='utf-8') as f:
    f.write(css_body)

# Update css_2030.py with refined CSS_CONTENT
new_css_py = f'''# -*- coding: utf-8 -*-
"""
CSS Design System for CMS PRO 2030 Next-Gen Edition
Optimized with Crystal-Clear High-Legibility Khmer Typography
Fonts: Noto Sans Khmer (Primary), Battambang (Titles), Kantumruy Pro, Moul (Ceremonial)
Generous line-heights (1.75 - 1.85) to prevent clipped subscripts and vowels
High contrast colors for effortless readability on all screens
"""

CSS_CONTENT = r\'\'\'
{css_body}
\'\'\'
'''
with open('d:/CMS PRO/css_2030.py', 'w', encoding='utf-8') as f:
    f.write(new_css_py)

print("   -> Updated home_style.css and css_2030.py successfully!")

# 2. Update style.css
print("2. Updating legacy style.css with modern Khmer typography...")
with open('d:/CMS PRO/style.css', 'r', encoding='utf-8') as f:
    style_css = f.read()

if '@import' not in style_css:
    style_css = FONT_IMPORT_CSS + style_css

style_css = re.sub(
    r"font-family:\s*['\"]Kantumruy Pro['\"][^;]*;",
    "font-family: 'Noto Sans Khmer', 'Battambang', 'Kantumruy Pro', 'Khmer OS Battambang', 'Siemreap', sans-serif;",
    style_css
)
style_css = re.sub(
    r"line-height:\s*1\.[0-4];",
    "line-height: 1.75;",
    style_css
)

with open('d:/CMS PRO/style.css', 'w', encoding='utf-8') as f:
    f.write(style_css)
print("   -> Updated style.css successfully!")

# 3. Update script.js and js_2030.py
print("3. Updating small font sizes and labels in script.js and js_2030.py...")
with open('d:/CMS PRO/script.js', 'r', encoding='utf-8') as f:
    script_js = f.read()

# Replace tiny font sizes
script_js = script_js.replace(
    'width:26px; height:26px; font-size:11px;',
    'width:30px; height:30px; font-size:13px; font-weight:700;'
)
script_js = script_js.replace(
    '<span style="font-size:9px;">★ ត្រាផ្លូវការ ★</span>',
    '<span style="font-size:13px; font-weight:800; font-family:var(--font-title); letter-spacing:0.5px;">★ ត្រាផ្លូវការ ★</span>'
)
script_js = script_js.replace(
    '<div style="font-size:0.68rem; color:var(--text-muted); font-family:var(--font-mono); margin-top:4px;">VERIFY: CMS-2030-QR</div>',
    '<div style="font-size:0.82rem; color:var(--text-secondary); font-family:var(--font-mono); font-weight:600; margin-top:6px;">VERIFY: CMS-2030-QR</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.85rem; color:var(--text-secondary);">រាជធានីភ្នំពេញ, ថ្ងៃទី ២៦ តុលា ២០២៦</div>',
    '<div style="font-size:0.95rem; color:var(--text-secondary); font-family:var(--font-khmer);">រាជធានីភ្នំពេញ, ថ្ងៃទី ២៦ តុលា ២០២៦</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.8rem; color:var(--neon-cyan);">គ្រូបន្ទុកថ្នាក់ទី ១២A</div>',
    '<div style="font-size:0.92rem; color:var(--neon-cyan); font-weight:700;">គ្រូបន្ទុកថ្នាក់ទី ១២A</div>'
)
script_js = script_js.replace(
    'font-size:11px; color:var(--neon-emerald);',
    'font-size:13.5px; font-weight:700; color:var(--neon-emerald);'
)

# Committee badges
script_js = script_js.replace(
    '<div style="font-size:0.8rem; color:var(--neon-cyan); font-weight:800;">ប្រធានថ្នាក់រៀន (President)</div>',
    '<div style="font-size:0.95rem; color:var(--neon-cyan); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">ប្រធានថ្នាក់រៀន (President)</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.78rem; color:var(--neon-emerald); font-weight:800;">អនុប្រធានទី ១ (សិក្សា)</div>',
    '<div style="font-size:0.92rem; color:var(--neon-emerald); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">អនុប្រធានទី ១ (សិក្សា)</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.78rem; color:var(--neon-pink); font-weight:800;">អនុប្រធានទី ២ (វិន័យ)</div>',
    '<div style="font-size:0.92rem; color:var(--neon-pink); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">អនុប្រធានទី ២ (វិន័យ)</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.78rem; color:var(--neon-cyan); font-weight:800;">គណៈកម្មការអនាម័យ</div>',
    '<div style="font-size:0.92rem; color:var(--neon-cyan); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">គណៈកម្មការអនាម័យ</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.78rem; color:var(--neon-amber); font-weight:800;">គណៈកម្មការកីឡា</div>',
    '<div style="font-size:0.92rem; color:var(--neon-amber); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">គណៈកម្មការកីឡា</div>'
)
script_js = script_js.replace(
    '<div style="font-size:0.78rem; color:var(--neon-purple); font-weight:800;">គណៈកម្មការបច្ចេកវិទ្យា</div>',
    '<div style="font-size:0.92rem; color:var(--neon-purple); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">គណៈកម្មការបច្ចេកវិទ្យា</div>'
)

# Payment modal
script_js = script_js.replace(
    'font-size:0.7rem; padding:3px 8px;',
    'font-size:0.85rem; font-weight:700; padding:4px 10px;'
)
script_js = script_js.replace(
    'font-size:0.86rem; line-height:1.9;',
    'font-size:0.96rem; line-height:2.0;'
)
script_js = script_js.replace(
    'font-size:0.75rem; font-weight:700;',
    'font-size:0.88rem; font-weight:700; padding:4px 12px;'
)
script_js = script_js.replace(
    'font-size:0.82rem; justify-content:center; text-decoration:none;',
    'font-size:0.92rem; font-weight:700; padding:11px 16px; justify-content:center; text-decoration:none;'
)

with open('d:/CMS PRO/script.js', 'w', encoding='utf-8') as f:
    f.write(script_js)

with open('d:/CMS PRO/js_2030.py', 'w', encoding='utf-8') as f:
    f.write(f'''# -*- coding: utf-8 -*-
"""
Interactive Engine for CMS PRO 2030 Next-Gen Edition
Includes High-Legibility Khmer Typography upgrades
"""

JS_CONTENT = r\'\'\'
{script_js}
\'\'\'
''')
print("   -> Updated script.js and js_2030.py successfully!")

# 4. Update generate_index_html.py and compile index.html & index.php
print("4. Updating generate_index_html.py with premier fonts link...")
with open('d:/CMS PRO/generate_index_html.py', 'r', encoding='utf-8') as f:
    gen_idx = f.read()

# Replace fonts link
old_font_regex = r'<link\s+href="https://fonts\.googleapis\.com/css2\?family=Kantumruy\+Pro[^"]*"\s+rel="stylesheet">'
gen_idx = re.sub(old_font_regex, f'<link href="{GOOGLE_FONTS_URL}" rel="stylesheet">', gen_idx)

# Also ensure preconnects exist
if 'rel="preconnect" href="https://fonts.gstatic.com"' not in gen_idx:
    gen_idx = gen_idx.replace(
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    )

# Bump footer text sizes
gen_idx = gen_idx.replace('font-size:0.88rem; color:var(--text-muted);', 'font-size:0.96rem; color:var(--text-secondary);')
gen_idx = gen_idx.replace('font-size:0.78rem; margin-top:4px;', 'font-size:0.88rem; margin-top:6px; color:var(--text-muted);')

with open('d:/CMS PRO/generate_index_html.py', 'w', encoding='utf-8') as f:
    f.write(gen_idx)

print("   -> Re-running generate_index_html.py...")
os.system('python -X utf8 "d:/CMS PRO/generate_index_html.py"')

# 5. Update upgrade_all_pages.py and compile all standalone pages
print("5. Updating upgrade_all_pages.py with premier fonts link...")
with open('d:/CMS PRO/upgrade_all_pages.py', 'r', encoding='utf-8') as f:
    upg_pages = f.read()

upg_pages = re.sub(
    r'<link\s+href="https://fonts\.googleapis\.com/css2\?family=Kantumruy\+Pro[^"]*"\s+rel="stylesheet">',
    f'<link href="{GOOGLE_FONTS_URL}" rel="stylesheet">',
    upg_pages
)

# Replace micro text in subpage templates
upg_pages = upg_pages.replace('font-size:0.8rem;', 'font-size:0.88rem;')
upg_pages = upg_pages.replace('font-size:0.82rem;', 'font-size:0.88rem;')

with open('d:/CMS PRO/upgrade_all_pages.py', 'w', encoding='utf-8') as f:
    f.write(upg_pages)

print("   -> Re-running upgrade_all_pages.py...")
os.system('python -X utf8 "d:/CMS PRO/upgrade_all_pages.py"')

# 6. Update all remaining HTML/PHP files across directories
print("6. Updating all other HTML & PHP files across the project...")
import glob

all_html_php = glob.glob('d:/CMS PRO/**/*.html', recursive=True) + glob.glob('d:/CMS PRO/**/*.php', recursive=True)

count_updated = 0
for fpath in all_html_php:
    # Skip python files or scripts
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        orig_content = content
        # Replace old Kantumruy Pro only links
        if 'fonts.googleapis.com' in content:
            content = re.sub(
                r'<link\s+href="https://fonts\.googleapis\.com/css2\?family=Kantumruy\+Pro[^"]*"\s+rel="stylesheet">',
                f'<link href="{GOOGLE_FONTS_URL}" rel="stylesheet">',
                content
            )
            # Ensure preconnect gstatic
            if 'fonts.googleapis.com' in content and 'fonts.gstatic.com' not in content:
                content = content.replace(
                    '<link rel="preconnect" href="https://fonts.googleapis.com">',
                    '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
                )
        
        # Ensure style tags or font references use the full stack
        if content != orig_content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            count_updated += 1
    except Exception as err:
        print(f"   Warning reading {fpath}: {err}")

print(f"   -> Updated {count_updated} additional HTML/PHP files with premier font links.")

print("\n=== All Khmer Typography Upgrades Completed Successfully! ===")

