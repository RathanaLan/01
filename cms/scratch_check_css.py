# -*- coding: utf-8 -*-
with open('d:/CMS PRO/home_style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Tight line heights:")
for i, line in enumerate(lines, 1):
    if any(lh in line for lh in ['line-height: 1;', 'line-height: 1.1;', 'line-height: 1.2;', 'line-height: 1.3;', 'line-height: 1.4;']):
        context = lines[max(0, i-4):i]
        header = [c.strip() for c in context if '{' in c or '.' in c or '#' in c]
        print(f"Line {i}: {line.strip()} | Selector: {header[-1] if header else 'unknown'}")

