# -*- coding: utf-8 -*-
"""
Integrate User's Official ABA KHQR Payment Screen into CMS PRO 2030
Account: RATHANA LAN
USD: 500 054 951
KHR: 600 332 124
"""
import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

print("Integrating official ABA KHQR Payment...")

# 1. Update script.js
with open('d:/CMS PRO/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_promo_function = r'''// 24. កញ្ចប់សេវា & ការបង់ប្រាក់ KHQR (ABA Bank - RATHANA LAN)
function renderSubscriptionPromoModal(container) {
    container.innerHTML = `
        <div style="text-align:center; padding:4px 8px;">
            <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-bottom:10px;">
                <span class="hologram-chip" style="background:rgba(239,68,68,0.18); border-color:#ef4444; color:#ef4444;"><i class="fas fa-fire"></i> ប្រូម៉ូសិនពិសេស ២០៣០</span>
                <span class="hologram-chip" style="background:rgba(6,182,212,0.18); border-color:var(--neon-cyan); color:var(--neon-cyan);"><i class="fas fa-bolt"></i> ស្កេនទូទាត់រហ័ស</span>
            </div>
            
            <h3 style="margin:0 0 6px; color:var(--text-primary); font-size:1.35rem;">កញ្ចប់ប្រើប្រាស់ប្រព័ន្ធប្រចាំឆ្នាំ (Annual License)</h3>
            <div style="font-size:2rem; font-weight:800; color:var(--neon-rose); margin-bottom:14px; font-family:var(--font-mono); display:flex; align-items:center; justify-content:center; gap:10px;">
                <span style="font-size:1.25rem; color:var(--text-muted); text-decoration:line-through;">8$/ឆ្នាំ</span>
                <span>5$<small style="font-size:1rem; color:var(--neon-emerald); font-weight:700;">/ឆ្នាំ (បញ្ចុះតម្លៃ ~៤០%)</small></span>
            </div>

            <!-- Authentic ABA KHQR Card Container -->
            <div style="background:linear-gradient(180deg, #131d36 0%, #0a0f1d 100%); border:1.5px solid var(--border-glass); border-radius:24px; padding:18px; max-width:360px; margin:0 auto 16px; box-shadow:0 20px 45px -10px rgba(0,0,0,0.7), 0 0 35px rgba(239,68,68,0.25); position:relative; overflow:hidden;">
                <!-- Decorative Top Shimmer -->
                <div style="position:absolute; top:0; left:0; right:0; height:3.5px; background:linear-gradient(90deg, #ef4444, #06b6d4, #ef4444);"></div>

                <!-- High-Res Cropped Card Image -->
                <div style="background:#fff; border-radius:18px; padding:6px; box-shadow:0 8px 25px rgba(0,0,0,0.4); margin-bottom:14px; position:relative; cursor:pointer;" onclick="window.open('images/khqr_aba.png', '_blank')" title="ចុចដើម្បីមើលរូបភាពធំពេញ">
                    <img src="images/khqr_card.png" alt="KHQR ABA Payment - RATHANA LAN" style="width:100%; height:auto; display:block; border-radius:14px; margin:0 auto;">
                    <div style="position:absolute; bottom:12px; right:12px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.7rem; padding:3px 8px; border-radius:6px; backdrop-filter:blur(4px); pointer-events:none;">
                        <i class="fas fa-magnifying-glass-plus"></i> ពង្រីក
                    </div>
                </div>

                <!-- Bank & Account Information Details -->
                <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px 14px; text-align:left; font-size:0.86rem; line-height:1.9; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--text-muted);">ឈ្មោះគណនី៖</span>
                        <strong style="color:#fff; font-size:0.96rem; letter-spacing:0.5px;">RATHANA LAN</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--text-muted);"><i class="fas fa-dollar-sign" style="color:var(--neon-emerald);"></i> គណនី USD៖</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <strong style="color:var(--neon-emerald); font-family:var(--font-mono); font-size:0.95rem;">500 054 951</strong>
                            <button onclick="copyToClipboard('500054951', 'USD')" style="background:rgba(16,185,129,0.25); color:var(--neon-emerald); border:none; border-radius:6px; padding:2px 8px; cursor:pointer; font-size:0.75rem; font-weight:700;" title="ចម្លងលេខគណនី"><i class="fas fa-copy"></i> ចម្លង</button>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--text-muted);"><i class="fas fa-coins" style="color:var(--neon-amber);"></i> គណនី KHR (៛)៖</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <strong style="color:var(--neon-amber); font-family:var(--font-mono); font-size:0.95rem;">600 332 124</strong>
                            <button onclick="copyToClipboard('600332124', 'KHR')" style="background:rgba(245,158,11,0.25); color:var(--neon-amber); border:none; border-radius:6px; padding:2px 8px; cursor:pointer; font-size:0.75rem; font-weight:700;" title="ចម្លងលេខគណនី"><i class="fas fa-copy"></i> ចម្លង</button>
                        </div>
                    </div>
                </div>

                <!-- Action Download & Confirm Buttons -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <a href="images/khqr_aba.png" download="ABA_KHQR_RATHANA_LAN.png" class="fast-action-btn" style="padding:9px 10px; font-size:0.82rem; justify-content:center; text-decoration:none;">
                        <i class="fas fa-download"></i> ទាញយក QR
                    </a>
                    <a href="https://t.me/cmskh_support" target="_blank" class="fast-action-btn" style="padding:9px 10px; font-size:0.82rem; justify-content:center; text-decoration:none; background:rgba(6,182,212,0.18); color:var(--neon-cyan); border-color:var(--neon-cyan);">
                        <i class="fab fa-telegram"></i> ផ្ញើបង្កាន់ដៃ
                    </a>
                </div>
            </div>

            <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:14px;">
                <i class="fas fa-phone" style="color:var(--neon-emerald);"></i> ជំនួយបច្ចេកទេស និងទូទាត់៖ <strong>096 7 70 80 90</strong>
            </div>

            <button onclick="closeFeatureModal()" class="fast-action-btn btn-glow" style="min-width:180px; margin:0 auto; justify-content:center;">
                <i class="fas fa-check"></i> យល់ព្រម
            </button>
        </div>
    `;
}

function copyToClipboard(text, type) {
    playChimeSound();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            alert('បានចម្លងលេខគណនី ' + type + ' (' + text + ') ដោយជោគជ័យ!');
        }).catch(function() {
            prompt('សូមចម្លងលេខគណនី៖', text);
        });
    } else {
        prompt('សូមចម្លងលេខគណនី៖', text);
    }
}
'''

import re
old_fn_pattern = r'// 24\. កញ្ចប់សេវា & ការបង់ប្រាក់ KHQR[\s\S]*?function renderSubscriptionPromoModal[\s\S]*?\n\}'
if re.search(old_fn_pattern, js):
    js = re.sub(old_fn_pattern, new_promo_function, js)
    print("Replaced renderSubscriptionPromoModal in script.js")
else:
    # Just append or replace function renderSubscriptionPromoModal
    js = re.sub(r'function renderSubscriptionPromoModal[\s\S]*?\n\}', new_promo_function, js)
    print("Replaced by function name in script.js")

with open('d:/CMS PRO/script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated script.js successfully!")
