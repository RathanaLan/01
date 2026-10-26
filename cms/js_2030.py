# -*- coding: utf-8 -*-
"""
Interactive Engine for CMS PRO 2030 Next-Gen Edition
Includes High-Legibility Khmer Typography upgrades
"""

JS_CONTENT = r'''

// ==========================================================================
// CMS PRO 2030 NEXT-GEN INTERACTIVE ENGINE
// ==========================================================================

// Web Audio API Futuristic Sound Synthesizer
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playClickSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.045);
    } catch(e){}
}

function playChimeSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1046.5, ctx.currentTime); // C6
        osc.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.12); // E6
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch(e){}
}

// Cambodian Time & Khmer Lunar Buddhist Calendar Engine
function initCambodiaClock() {
    const timeEl = document.getElementById('digitalClockText');
    const calEl = document.getElementById('khmerCalendarText');
    
    const khmerDays = ['ថ្ងៃអាទិត្យ', 'ថ្ងៃចន្ទ', 'ថ្ងៃអង្គារ', 'ថ្ងៃពុធ', 'ថ្ងៃព្រហស្បតិ៍', 'ថ្ងៃសុក្រ', 'ថ្ងៃសៅរ៍'];
    const khmerMonths = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    const khmerDigits = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];
    
    function toKhmerNum(n) {
        return String(n).split('').map(d => khmerDigits[parseInt(d)] !== undefined ? khmerDigits[parseInt(d)] : d).join('');
    }

    function tick() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        
        if (timeEl) {
            timeEl.innerHTML = `${hrs}:${mins}:<span style="opacity:0.75; font-size:0.95em;">${secs}</span>`;
        }
        
        if (calEl) {
            const dayName = khmerDays[now.getDay()];
            const dayNum = toKhmerNum(now.getDate());
            const monthName = khmerMonths[now.getMonth()];
            const yearNum = toKhmerNum(now.getFullYear());
            const buddhistYear = toKhmerNum(now.getFullYear() + 543);
            calEl.innerText = `${dayName} ទី${dayNum} ខែ${monthName} ឆ្នាំ${yearNum} (ព.ស. ${buddhistYear})`;
        }
    }
    
    tick();
    setInterval(tick, 1000);
}

// Theme Engine (Dark Cyber <-> Light Crystal)
function initThemeEngine() {
    const savedTheme = localStorage.getItem('cms_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    playClickSound();
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cms_theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        btn.setAttribute('title', theme === 'dark' ? 'ប្តូរទៅ Crystal Light' : 'ប្តូរទៅ Cyber Dark');
    }
}

// Side Drawer Navigation
function toggleSideDrawer() {
    playClickSound();
    const overlay = document.getElementById('sideDrawerOverlay');
    const panel = document.getElementById('sideDrawerPanel');
    if (overlay && panel) {
        overlay.classList.toggle('active');
        panel.classList.toggle('active');
    }
}

// Student Database State Manager (Full 45 Students)
function getStudents() {
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem('cms_students') || '[]');
    } catch(e){}
    
    if (!list || list.length < 40) {
        if (window.CMS_SEED_STUDENTS && window.CMS_SEED_STUDENTS.length) {
            list = window.CMS_SEED_STUDENTS;
            localStorage.setItem('cms_students', JSON.stringify(list));
        }
    }
    return list;
}

function saveStudents(list) {
    localStorage.setItem('cms_students', JSON.stringify(list));
    updateLiveKPICounters();
}

// Live KPI Recalculator
function updateLiveKPICounters() {
    const list = getStudents();
    const total = list.length;
    let present = 0, perm = 0, absent = 0, late = 0;
    let totalScoreSum = 0;
    let honorCount = 0;
    
    list.forEach(s => {
        if (s.status === 'ច្បាប់') perm++;
        else if (s.status === 'អត់ច្បាប់') absent++;
        else if (s.status === 'យឺត') late++;
        else present++;
        
        const avg = ((s.khmer||80)+(s.math||80)+(s.physics||80)+(s.chem||80)+(s.bio||80)+(s.history||80)+(s.english||80)+(s.civics||80)) / 8;
        totalScoreSum += avg;
        if (avg >= 90) honorCount++;
    });
    
    const attRate = total ? (((present + perm) / total) * 100).toFixed(1) : 98.2;
    const classAvg = total ? (totalScoreSum / total).toFixed(1) : 87.4;
    const classGPA = (classAvg / 25).toFixed(2); // out of 4.0 scale
    
    const kpiTotalEl = document.getElementById('kpiTotalStudents');
    const kpiAttEl = document.getElementById('kpiAttendanceRate');
    const kpiGpaEl = document.getElementById('kpiClassGPA');
    const kpiHonorEl = document.getElementById('kpiHonorCount');
    
    if (kpiTotalEl) kpiTotalEl.innerText = total;
    if (kpiAttEl) kpiAttEl.innerText = attRate + '%';
    if (kpiGpaEl) kpiGpaEl.innerText = `${classGPA} (${classAvg}%)`;
    if (kpiHonorEl) kpiHonorEl.innerText = honorCount;
}

// Modal Management
function closeFeatureModal() {
    playClickSound();
    const overlay = document.getElementById('featureModalOverlay');
    if (overlay) overlay.classList.remove('open');
}

// Main Modal Router for all 24 Features + AI Assistant
function openFeature(key) {
    playClickSound();
    const overlay = document.getElementById('featureModalOverlay');
    const container = document.getElementById('featureModalContainer');
    const title = document.getElementById('featureModalTitle');
    const body = document.getElementById('featureModalBody');
    if (!overlay || !container || !title || !body) return;
    
    container.classList.remove('wide-mode');

    // 0. AI Classroom Assistant 2030
    if (key === 'ai_assistant') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-robot"></i> AI ជំនួយការគ្រូបង្រៀន ២០៣០ (Smart AI Co-Pilot)';
        renderAIAssistant(body);
    }
    // 1. បញ្ចូលព័ត៍មានសិស្សថ្មី
    else if (key === 'add_student') {
        title.innerHTML = '<i class="fas fa-user-plus"></i> បញ្ចូលព័ត៌មានសិស្សថ្មី (Next-Gen Enrollment)';
        renderAddStudentForm(body);
    }
    // 2. បញ្ជីឈ្មោះសិស្ស ៤៥ នាក់
    else if (key === 'student_list') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-users"></i> បញ្ជីឈ្មោះសិស្សទាំងអស់ (៤៥ នាក់)';
        renderStudentDirectory(body);
    }
    // 3. ផ្ទេរ និងទទួលសិស្ស
    else if (key === 'transfer') {
        title.innerHTML = '<i class="fas fa-right-left"></i> ផ្ទេរ និង ទទួលសិស្ស (Transfer Gateway)';
        renderStudentTransfer(body);
    }
    // 4. ចុះវត្តមានតាមប្លង់តុ ៥ x ៩ = ៤៥ តុ
    else if (key === 'attendance') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-table-cells-large"></i> ចុះវត្តមានតាមប្លង់តុឆ្លាតវៃ (៥ ជួរ x ៩ តុ = ៤៥ តុ)';
        renderSmartSeatingMatrix(body);
    }
    // 5. បញ្ចូលពិន្ទុ ៨ មុខវិជ្ជា MoEYS
    else if (key === 'scores') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-file-signature"></i> កម្រងពិន្ទុ ៨ មុខវិជ្ជា MoEYS & គណនា GPA ស្វ័យប្រវត្តិ';
        renderMoEYSGradebook(body);
    }
    // 6. បញ្ចូលពិន្ទុកិច្ចការផ្ទះ
    else if (key === 'homework') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-list-check"></i> បញ្ចូលពិន្ទុកិច្ចការផ្ទះ & គម្រោងស្រាវជ្រាវ';
        renderHomeworkPortal(body);
    }
    // 7. បញ្ជីពិន្ទុ & របាយការណ៍សរុប
    else if (key === 'score_list') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-file-invoice"></i> បញ្ជីពិន្ទុសរុប & របាយការណ៍ប្រចាំខែ';
        renderMasterScoreReport(body);
    }
    // 8. បញ្ជីវត្តមានប្រចាំខែ ៣០ ថ្ងៃ
    else if (key === 'monthly_attendance') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-clipboard-user"></i> បញ្ជីវត្តមានប្រចាំខែ (៣០ ថ្ងៃ)';
        renderMonthlyRegisterSheet(body);
    }
    // 9. តារាចំណាត់ថ្នាក់ 3D Podium
    else if (key === 'ranking') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-list-ol"></i> តារាចំណាត់ថ្នាក់សិស្ស (Leaderboard 3D)';
        renderClassLeaderboard(body);
    }
    // 10. តារាកិត្តិយស & ប័ណ្ណសរសើរមាស (Royal Emblem)
    else if (key === 'honor') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-award"></i> តារាកិត្តិយស & ប័ណ្ណសរសើរមាស ២០៣០';
        renderHolographicCertificate(body);
    }
    // 11. លទ្ធផលប្រចាំឆមាស & ប្រចាំឆ្នាំ
    else if (key === 'results') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-calendar-check"></i> លទ្ធផលប្រចាំឆមាសទី ១ ឆមាសទី ២ & ប្រចាំឆ្នាំ';
        renderSemesterAndYearResults(body);
    }
    // 12. វេនសម្អាតប្រចាំសប្តាហ៍
    else if (key === 'cleaning') {
        title.innerHTML = '<i class="fas fa-broom"></i> វេនសម្អាត និងភារកិច្ចបរិស្ថានបៃតង';
        renderEcoCleaningRoster(body);
    }
    // 13. សៀវភៅតាមដានការសិក្សា
    else if (key === 'study_tracker') {
        title.innerHTML = '<i class="fas fa-book-reader"></i> សៀវភៅតាមដានការសិក្សា & សីលធម៌';
        renderStudyBehaviorTracker(body);
    }
    // 14. សៀវភៅសិក្ខាគារិក
    else if (key === 'trainee') {
        title.innerHTML = '<i class="fas fa-book-bookmark"></i> សៀវភៅសិក្ខាគារិក & គរុសិស្សកម្មសិក្សា';
        renderTraineePracticumLog(body);
    }
    // 15. សាលាកប័ត្រឯកត្តជន
    else if (key === 'individual_card') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-id-card"></i> សាលាកប័ត្រឯកត្តជនសិស្ស (MoEYS Cumulative Record)';
        renderIndividualCumulativeCard(body);
    }
    // 16. កិច្ចព្រមព្រៀងជាមួយមាតាបិតា
    else if (key === 'parent_agreement') {
        title.innerHTML = '<i class="fas fa-handshake"></i> កិច្ចព្រមព្រៀងឌីជីថលជាមួយមាតាបិតាសិស្ស';
        renderDigitalParentAgreement(body);
    }
    // 17. បញ្ជីសារពើភ័ណ្ឌទំនើប ២០៣០
    else if (key === 'inventory') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-boxes-stacked"></i> បញ្ជីសារពើភ័ណ្ឌបន្ទប់រៀនឆ្លាតវៃ ២០៣០';
        renderSmartClassInventory(body);
    }
    // 18. បញ្ជីខ្ចី & ប្រមូលសៀវភៅ
    else if (key === 'textbook') {
        container.classList.add('wide-mode');
        title.innerHTML = '<i class="fas fa-book-open"></i> បញ្ជីខ្ចី និងប្រមូលសៀវភៅសិក្សាគោល MoEYS';
        renderTextbookManagement(body);
    }
    // 19. បណ្តាញសិស្សតាមភូមិ
    else if (key === 'village_network') {
        title.innerHTML = '<i class="fas fa-house-chimney-user"></i> បណ្តាញសិស្សតាមភូមិ & ខ្សែទូរស័ព្ទបន្ទាន់';
        renderVillageNetworkGrid(body);
    }
    // 20. រចនាសម្ព័ន្ធគណៈកម្មាធិការ
    else if (key === 'committee') {
        title.innerHTML = '<i class="fas fa-sitemap"></i> រចនាសម្ព័ន្ធគណៈកម្មាធិការថ្នាក់រៀន ២០៣០';
        renderCommitteeHierarchy(body);
    }
    // 21. តារាងចំនួនសិស្សតាមអាយុ
    else if (key === 'age_table') {
        title.innerHTML = '<i class="fas fa-chart-column"></i> តារាងស្ថិតិ និងពីរ៉ាមីតអាយុសិស្ស';
        renderAgeDemographicsPyramid(body);
    }
    // 22. ព័ត៌មានគណនីគ្រូ
    else if (key === 'profile') {
        title.innerHTML = '<i class="fas fa-user-tie"></i> ព័ត៌មានគណនីគ្រូបង្រៀន & សុវត្ថិភាព';
        renderTeacherProfileDetails(body);
    }
    // 23. សេចក្តីជូនដំណឹង smskh.pro
    else if (key === 'notice') {
        title.innerHTML = '<i class="fas fa-bullhorn"></i> សេចក្តីជូនដំណឹងប្រព័ន្ធគ្រប់គ្រងសាលា smskh.pro';
        renderSchoolNoticeModal(body);
    }
    // 24. កញ្ចប់សេវា & KHQR
    else if (key === 'promo') {
        title.innerHTML = '<i class="fas fa-gift"></i> កញ្ចប់សេវា & ការទូទាត់តាម KHQR Bakong';
        renderSubscriptionPromoModal(body);
    }

    overlay.classList.add('open');
}

// --------------------------------------------------------------------------
// RENDERERS FOR ALL 24 FEATURES
// --------------------------------------------------------------------------

// 0. AI Classroom Assistant 2030
function renderAIAssistant(container) {
    container.innerHTML = `
        <div class="ai-chat-container">
            <div class="ai-messages-scroll" id="aiChatMessages">
                <div class="ai-bubble bot">
                    <strong>🤖 AI ជំនួយការគ្រូបង្រៀន (v2030.5):</strong><br>
                    សូមជម្រាបសួរលោកគ្រូ! ខ្ញុំបានវិភាគទិន្នន័យថ្នាក់ទី ១២A (សិស្ស ៤៥ នាក់) រួចរាល់ហើយ។
                    <br>• <strong>អត្រាវត្តមានមធ្យម៖</strong> ៩៥.៦% (ល្អប្រសើរ)
                    <br>• <strong>មធ្យមភាគថ្នាក់៖</strong> ៨៧.៤% (និទ្ទេស A: ១២ នាក់ | B: ២៣ នាក់ | C: ១០ នាក់)
                    <br>• <strong>ការណែនាំ៖</strong> សិស្ស យឹម ដារ៉ូ និង សុខ សម្បត្តិ ត្រូវការការពន្យល់បន្ថែមលើរូបវិទ្យា។
                </div>
            </div>
            <div class="ai-quick-prompts">
                <span class="ai-prompt-chip" onclick="askAIPrompt('វិភាគសិស្សពូកែ')">🌟 វិភាគសិស្សពូកែ Top 3</span>
                <span class="ai-prompt-chip" onclick="askAIPrompt('សរសេរសារមាតាបិតា')">📱 សរសេរសារ Telegram ជូនមាតាបិតា</span>
                <span class="ai-prompt-chip" onclick="askAIPrompt('លំហាត់កែលម្អ')">💡 ណែនាំលំហាត់កែលម្អគណិត</span>
                <span class="ai-prompt-chip" onclick="askAIPrompt('វត្តមាន')">📋 សង្ខេបវត្តមានសប្តាហ៍នេះ</span>
            </div>
            <div class="ai-input-bar">
                <input type="text" id="aiUserInput" class="ai-input-field" placeholder="សួរសំណួរ ឬបញ្ជា AI ឲ្យបង្កើតមតិយោបល់..." onkeydown="if(event.key==='Enter') sendAIMessage()">
                <button class="ai-send-btn" onclick="sendAIMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
}

function askAIPrompt(type) {
    playClickSound();
    const box = document.getElementById('aiChatMessages');
    if (!box) return;
    
    let botReply = '';
    if (type === 'វិភាគសិស្សពូកែ') {
        botReply = `🏆 <strong>ការវិភាគសិស្សឆ្នើម Top 3:</strong><br>
        ១. <strong>លី សុជាតា</strong> (មធ្យមភាគ ៩៦.៨%)៖ ឆ្នើមគ្រប់មុខវិជ្ជា ជាពិសេសគណិត និងភាសាខ្មែរ។ ស្នើតែងតាំងជាប្រធានក្រុមសិក្សា។<br>
        ២. <strong>សុវណ្ណ ទេវី</strong> (មធ្យមភាគ ៩៦.១%)៖ ឆ្នើមផ្នែកវិទ្យាសាស្ត្រ និងរូបវិទ្យា។<br>
        ៣. <strong>ចាន់ សុភា</strong> (មធ្យមភាគ ៩៤.៥%)៖ សកម្ម ឧស្សាហ៍ព្យាយាម និងមានភាពជាអ្នកដឹកនាំ។`;
    } else if (type === 'សរសេរសារមាតាបិតា') {
        botReply = `📱 <strong>គំរូសារផ្ញើជូនមាតាបិតា (Telegram/SMS):</strong><br>
        "ជម្រាបសួរលោកឪពុកអ្នកម្តាយសិស្សានុសិស្សថ្នាក់ទី ១២A នៃវិទ្យាល័យ។ គ្រូបន្ទុកថ្នាក់សូមជម្រាបជូនថានៅថ្ងៃសុក្រខាងមុខ សាលានឹងមានការប្រជុំបូកសរុបលទ្ធផលខែតុលា និងការប្រគល់ប័ណ្ណសរសើរជូនសិស្សឆ្នើម។ សូមលោកឪពុកអ្នកម្តាយអញ្ជើញចូលរួមឲ្យបានទាន់ពេលវេលា។ សូមអរគុណ!"`;
    } else if (type === 'លំហាត់កែលម្អ') {
        botReply = `💡 <strong>យុទ្ធសាស្ត្រកែលម្អមុខវិជ្ជាគណិតវិទ្យា៖</strong><br>
        • រៀបចំការបង្រៀនគូស្រករ (Peer Tutoring) ដោយឲ្យ <strong>សេង វណ្ណា</strong> ជួយពន្យល់ <strong>សុខ សម្បត្តិ</strong>។<br>
        • បង្កើនលំហាត់អនុវត្តជាក់ស្តែងចំនួន ៣ លំហាត់ក្នុងមួយថ្ងៃ។`;
    } else {
        botReply = `📋 <strong>សង្ខេបវត្តមានថ្នាក់រៀន៖</strong> ថ្ងៃនេះមានវត្តមាន ៤៣ នាក់, សុំច្បាប់ ១ នាក់ (សុខ សម្បត្តិ - គ្រុនផ្តាសាយ), និងអវត្តមាន ១ នាក់ (យឹម ដារ៉ូ)។ គ្រូបានទាក់ទងទៅអាណាព្យាបាលរួចរាល់។`;
    }
    
    box.innerHTML += `<div class="ai-bubble user">ចុចជ្រើសរើស៖ ${type}</div>`;
    setTimeout(() => {
        playChimeSound();
        box.innerHTML += `<div class="ai-bubble bot">${botReply}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 400);
}

function sendAIMessage() {
    const input = document.getElementById('aiUserInput');
    const box = document.getElementById('aiChatMessages');
    if (!input || !box || !input.value.trim()) return;
    const txt = input.value.trim();
    input.value = '';
    
    playClickSound();
    box.innerHTML += `<div class="ai-bubble user">${txt}</div>`;
    box.scrollTop = box.scrollHeight;
    
    setTimeout(() => {
        playChimeSound();
        box.innerHTML += `
            <div class="ai-bubble bot">
                <i class="fas fa-check-circle" style="color:var(--neon-emerald);"></i> 
                <strong>ការឆ្លើយតបឆ្លាតវៃ៖</strong> បានទទួលសំណួរ "${txt}"! ផ្អែកលើប្រព័ន្ធសិក្សា MoEYS ២០៣០ សិស្សទាំងអស់កំពុងស្ថិតក្នុងល្បឿនសិក្សាត្រឹមត្រូវតាមស្តង់ដារគុណវុឌ្ឍិជាតិ។
            </div>
        `;
        box.scrollTop = box.scrollHeight;
    }, 500);
}

// 1. បញ្ចូលព័ត៍មានសិស្សថ្មី
function renderAddStudentForm(container) {
    const nextId = 'STU-2026-' + String(getStudents().length + 1).padStart(3, '0');
    container.innerHTML = `
        <form onsubmit="handleAddNewStudentSubmit(event)">
            <div class="form-grid-2">
                <div class="form-group-2030">
                    <label>អត្តលេខសិស្ស (ID)*</label>
                    <input type="text" id="add_std_id" class="form-control-2030" value="${nextId}" required>
                </div>
                <div class="form-group-2030">
                    <label>គោត្តនាម-នាមសិស្ស (Khmer)*</label>
                    <input type="text" id="add_std_name" class="form-control-2030" placeholder="ឧ. កែវ សុខា" required>
                </div>
            </div>
            <div class="form-grid-3">
                <div class="form-group-2030">
                    <label>ឈ្មោះជាអក្សរឡាតាំង (Latin)*</label>
                    <input type="text" id="add_std_latin" class="form-control-2030" placeholder="KEO SOKHA" required>
                </div>
                <div class="form-group-2030">
                    <label>ភេទ*</label>
                    <select id="add_std_gender" class="form-control-2030" required>
                        <option value="ស្រី">ស្រី (Female)</option>
                        <option value="ប្រុស">ប្រុស (Male)</option>
                    </select>
                </div>
                <div class="form-group-2030">
                    <label>ក្រុមឈាម (Blood)</label>
                    <select id="add_std_blood" class="form-control-2030">
                        <option value="O+">O+</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                    </select>
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group-2030">
                    <label>ថ្ងៃខែឆ្នាំកំណើត</label>
                    <input type="date" id="add_std_dob" class="form-control-2030" value="2008-06-15">
                </div>
                <div class="form-group-2030">
                    <label>លេខទូរស័ព្ទអាណាព្យាបាល</label>
                    <input type="tel" id="add_std_phone" class="form-control-2030" placeholder="012 345 678">
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group-2030">
                    <label>ឈ្មោះឪពុក ឬម្តាយ</label>
                    <input type="text" id="add_std_parent" class="form-control-2030" placeholder="ឧ. កែវ វិបុល (ឪពុក)">
                </div>
                <div class="form-group-2030">
                    <label>មុខរបរអាណាព្យាបាល</label>
                    <input type="text" id="add_std_job" class="form-control-2030" placeholder="មន្ត្រីរាជការ / អាជីវករ">
                </div>
            </div>
            <div class="form-group-2030">
                <label>អាសយដ្ឋានពេញលេញ (ភូមិ ឃុំ/សង្កាត់ ក្រុង/ខណ្ឌ រាជធានី/ខេត្ត)</label>
                <input type="text" id="add_std_village" class="form-control-2030" placeholder="ភូមិត្រពាំងថ្លឹង សង្កាត់ចោមចៅ ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ">
            </div>
            <button type="submit" class="fast-action-btn btn-glow" style="width:100%; justify-content:center; padding:14px; font-size:1rem; margin-top:10px;">
                <i class="fas fa-save"></i> រក្សាទុកព័ត៌មានសិស្សថ្មី
            </button>
        </form>
    `;
}

function handleAddNewStudentSubmit(e) {
    e.preventDefault();
    playChimeSound();
    const id = document.getElementById('add_std_id').value.trim();
    const name = document.getElementById('add_std_name').value.trim();
    const latin = document.getElementById('add_std_latin').value.trim().toUpperCase();
    const gender = document.getElementById('add_std_gender').value;
    const blood = document.getElementById('add_std_blood').value;
    const dob = document.getElementById('add_std_dob').value;
    const phone = document.getElementById('add_std_phone').value.trim();
    const parent = document.getElementById('add_std_parent').value.trim() || 'អាណាព្យាបាល';
    const job = document.getElementById('add_std_job').value.trim() || 'អាជីវករ';
    const village = document.getElementById('add_std_village').value.trim() || 'រាជធានីភ្នំពេញ';
    
    const list = getStudents();
    list.push({
        id, name, latin, gender, dob, age: 18, blood, phone, parent, job, village,
        status: 'វត្តមាន', khmer: 85, math: 85, physics: 85, chem: 85, bio: 85, history: 85, english: 85, civics: 85,
        homework: 10, conduct: 'ល្អណាស់', row: 5, col: 9
    });
    saveStudents(list);
    alert('បានបញ្ចូលព័ត៌មានសិស្ស ' + name + ' ដោយជោគជ័យ!');
    openFeature('student_list');
}

// 2. បញ្ជីឈ្មោះសិស្ស ៤៥ នាក់
function renderStudentDirectory(container) {
    const list = getStudents();
    let rows = '';
    list.forEach((s, idx) => {
        const avg = (((s.khmer||80)+(s.math||80)+(s.physics||80)+(s.chem||80)+(s.bio||80)+(s.history||80)+(s.english||80)+(s.civics||80))/8).toFixed(1);
        const cls = s.status === 'ច្បាប់' ? 'permission' : (s.status === 'អត់ច្បាប់' ? 'absent' : (s.status === 'យឺត' ? 'late' : 'present'));
        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong style="font-family:var(--font-mono); color:var(--neon-cyan);">${s.id}</strong></td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="avatar-ring" style="width:30px; height:30px; font-size:13px; font-weight:700; background:${s.gender==='ស្រី'?'linear-gradient(135deg, #ec4899, #8b5cf6)':'linear-gradient(135deg, #6366f1, #06b6d4)'}">${s.gender==='ស្រី'?'♀':'♂'}</span>
                        <strong>${s.name}</strong>
                    </div>
                </td>
                <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-secondary);">${s.latin || '-'}</td>
                <td>${s.gender}</td>
                <td style="font-family:var(--font-mono);">${s.dob || '-'}</td>
                <td><span style="font-family:var(--font-mono); font-weight:700; color:var(--neon-amber);">${s.blood || 'O+'}</span></td>
                <td style="font-size:0.82rem;">${s.phone || '-'}</td>
                <td><span class="desk-status-badge ${cls}">${s.status}</span></td>
                <td><strong style="color:var(--neon-emerald); font-family:var(--font-mono);">${avg}%</strong></td>
                <td>
                    <button onclick="deleteStudentById('${s.id}')" style="background:rgba(244,63,94,0.15); color:var(--neon-rose); border:1px solid rgba(244,63,94,0.3); padding:4px 8px; border-radius:6px; cursor:pointer;" title="លុប"><i class="fas fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="text" id="dirSearchInput" onkeyup="filterStudentDirectory()" placeholder="ស្វែងរកតាមឈ្មោះ ឬអត្តលេខ..." class="form-control-2030" style="width:260px; padding:8px 14px;">
                <select id="dirGenderFilter" onchange="filterStudentDirectory()" class="form-control-2030" style="width:130px; padding:8px 10px;">
                    <option value="">ភេទទាំងអស់</option>
                    <option value="ស្រី">ស្រី (Female)</option>
                    <option value="ប្រុស">ប្រុស (Male)</option>
                </select>
            </div>
            <div style="display:flex; gap:10px;">
                <button onclick="exportStudentsCSV()" class="fast-action-btn"><i class="fas fa-file-csv"></i> នាំចេញ CSV</button>
                <button onclick="openFeature('add_student')" class="fast-action-btn btn-glow"><i class="fas fa-plus"></i> បន្ថែមសិស្ស</button>
            </div>
        </div>
        <div class="table-responsive-box">
            <table class="cms-table-2030" id="dirStudentTable">
                <thead>
                    <tr><th>ល.រ</th><th>អត្តលេខ</th><th>គោត្តនាម-នាម</th><th>ឈ្មោះឡាតាំង</th><th>ភេទ</th><th>ថ្ងៃកំណើត</th><th>ឈាម</th><th>ទូរស័ព្ទ</th><th>វត្តមាន</th><th>មធ្យមភាគ</th><th>សកម្មភាព</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function filterStudentDirectory() {
    const q = (document.getElementById('dirSearchInput').value || '').toLowerCase();
    const g = document.getElementById('dirGenderFilter').value;
    const rows = document.querySelectorAll('#dirStudentTable tbody tr');
    rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        const matchesQ = !q || text.includes(q);
        const matchesG = !g || text.includes(g.toLowerCase());
        r.style.display = matchesQ && matchesG ? '' : 'none';
    });
}

function deleteStudentById(id) {
    playClickSound();
    if (confirm('តើលោកគ្រូពិតជាចង់លុបទិន្នន័យសិស្សអត្តលេខ ' + id + ' មែនទេ?')) {
        let list = getStudents().filter(s => s.id !== id);
        saveStudents(list);
        playChimeSound();
        renderStudentDirectory(document.getElementById('featureModalBody'));
    }
}

function exportStudentsCSV() {
    playClickSound();
    const list = getStudents();
    let csv = 'ID,Name,Latin,Gender,DOB,Blood,Phone,Parent,Address,Status,Average\n';
    list.forEach(s => {
        const avg = (((s.khmer||80)+(s.math||80)+(s.physics||80)+(s.chem||80)+(s.bio||80)+(s.history||80)+(s.english||80)+(s.civics||80))/8).toFixed(1);
        csv += `"${s.id}","${s.name}","${s.latin}","${s.gender}","${s.dob}","${s.blood}","${s.phone}","${s.parent}","${s.village}","${s.status}","${avg}"\n`;
    });
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CMS_PRO_Students_List_2030.csv';
    link.click();
}

// 4. ចុះវត្តមានតាមប្លង់តុឆ្លាតវៃ ៥ x ៩ = ៤៥ តុ
function renderSmartSeatingMatrix(container) {
    const list = getStudents();
    let pCount = 0, lCount = 0, aCount = 0, lateCount = 0;
    list.forEach(s => {
        if (s.status === 'ច្បាប់') lCount++;
        else if (s.status === 'អត់ច្បាប់') aCount++;
        else if (s.status === 'យឺត') lateCount++;
        else pCount++;
    });

    let desks = '';
    for (let i = 0; i < 45; i++) {
        const s = list[i] || { id: 'STU-' + (i+1), name: 'សិស្សទំនេរ', latin: 'VACANT', gender: 'ប្រុស', status: 'វត្តមាន' };
        const cls = s.status === 'ច្បាប់' ? 'permission' : (s.status === 'អត់ច្បាប់' ? 'absent' : (s.status === 'យឺត' ? 'late' : 'present'));
        desks += `
            <div class="desk-unit-card" onclick="cycleDeskStatus('${s.id}')" title="ចុចដើម្បីប្តូរវត្តមាន">
                <div class="desk-number">តុ ${String(i+1).padStart(2, '0')}</div>
                <div class="desk-avatar-icon ${s.gender==='ស្រី'?'female':''}"><i class="fas fa-user"></i></div>
                <div class="desk-student-name">${s.name}</div>
                <span class="desk-status-badge ${cls}">${s.status}</span>
            </div>
        `;
    }

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <span class="status-active-chip"><i class="fas fa-check"></i> វត្តមាន៖ ${pCount} នាក់</span>
                <span class="status-active-chip" style="color:var(--neon-amber); border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.15);"><i class="fas fa-envelope-open-text"></i> ច្បាប់៖ ${lCount}</span>
                <span class="status-active-chip" style="color:var(--neon-rose); border-color:rgba(244,63,94,0.3); background:rgba(244,63,94,0.15);"><i class="fas fa-times-circle"></i> អវត្តមាន៖ ${aCount}</span>
                <span class="status-active-chip" style="color:var(--neon-cyan); border-color:rgba(6,182,212,0.3); background:rgba(6,182,212,0.15);"><i class="fas fa-clock"></i> យឺត៖ ${lateCount}</span>
            </div>
            <button onclick="markAllPresent()" class="fast-action-btn"><i class="fas fa-check-double"></i> វត្តមានទាំងអស់</button>
        </div>
        <div class="classroom-podium">
            <i class="fas fa-chalkboard-user"></i> ក្ដារខៀនអន្តរកម្ម 85" & តុគ្រូបង្រៀន (ផ្នែកខាងមុខថ្នាក់រៀន)
        </div>
        <div class="seating-matrix-grid">${desks}</div>
        <p style="text-align:center; font-size:0.85rem; color:var(--text-muted); margin:0;">
            💡 <strong>គន្លឹះ៖</strong> ចុចលើតុណាមួយដើម្បីប្តូរស្ថានភាព៖ <strong>វត្តមាន ➔ ច្បាប់ ➔ អត់ច្បាប់ ➔ យឺត</strong> (ទិន្នន័យនឹងត្រូវរក្សាទុកស្វ័យប្រវត្តិ)
        </p>
    `;
}

function cycleDeskStatus(id) {
    playChimeSound();
    const list = getStudents();
    list.forEach(s => {
        if (s.id === id) {
            if (s.status === 'វត្តមាន') s.status = 'ច្បាប់';
            else if (s.status === 'ច្បាប់') s.status = 'អត់ច្បាប់';
            else if (s.status === 'អត់ច្បាប់') s.status = 'យឺត';
            else s.status = 'វត្តមាន';
        }
    });
    saveStudents(list);
    renderSmartSeatingMatrix(document.getElementById('featureModalBody'));
}

function markAllPresent() {
    playChimeSound();
    const list = getStudents();
    list.forEach(s => s.status = 'វត្តមាន');
    saveStudents(list);
    renderSmartSeatingMatrix(document.getElementById('featureModalBody'));
}

// 5. បញ្ចូលពិន្ទុ ៨ មុខវិជ្ជា MoEYS & គណនា GPA
function renderMoEYSGradebook(container) {
    const list = getStudents();
    let rows = '';
    list.forEach((s, idx) => {
        const k = s.khmer || 85;
        const m = s.math || 85;
        const p = s.physics || 85;
        const c = s.chem || 85;
        const b = s.bio || 85;
        const h = s.history || 85;
        const e = s.english || 85;
        const cv = s.civics || 85;
        const tot = k + m + p + c + b + h + e + cv;
        const avg = (tot / 8).toFixed(1);
        const gpa = (avg / 25).toFixed(2);
        let grade = avg >= 85 ? 'A' : (avg >= 80 ? 'B' : (avg >= 70 ? 'C' : (avg >= 60 ? 'D' : (avg >= 50 ? 'E' : 'F'))));

        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong style="font-family:var(--font-mono); color:var(--neon-cyan);">${s.id}</strong></td>
                <td><strong>${s.name}</strong></td>
                <td>${s.gender}</td>
                <td><input type="number" class="grade-input-cell" value="${k}" onchange="updateStudentSubjectScore('${s.id}', 'khmer', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${m}" onchange="updateStudentSubjectScore('${s.id}', 'math', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${p}" onchange="updateStudentSubjectScore('${s.id}', 'physics', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${c}" onchange="updateStudentSubjectScore('${s.id}', 'chem', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${b}" onchange="updateStudentSubjectScore('${s.id}', 'bio', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${h}" onchange="updateStudentSubjectScore('${s.id}', 'history', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${e}" onchange="updateStudentSubjectScore('${s.id}', 'english', this.value)"></td>
                <td><input type="number" class="grade-input-cell" value="${cv}" onchange="updateStudentSubjectScore('${s.id}', 'civics', this.value)"></td>
                <td><strong id="tot_${s.id}" style="font-family:var(--font-mono);">${tot}</strong></td>
                <td><strong id="avg_${s.id}" style="color:var(--neon-emerald); font-family:var(--font-mono);">${avg}%</strong></td>
                <td><strong id="gpa_${s.id}" style="color:var(--neon-purple); font-family:var(--font-mono);">${gpa}</strong></td>
                <td><span id="grd_${s.id}" class="desk-status-badge ${grade==='F'?'absent':'present'}">${grade}</span></td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <label style="font-weight:700; color:var(--text-secondary);">ខែវាយតម្លៃ៖</label>
                <select class="form-control-2030" style="width:160px; padding:8px 12px;">
                    <option>ខែ តុលា ២០២៦</option>
                    <option selected>ខែ វិច្ឆិកា ២០២៦</option>
                    <option>ខែ ធ្នូ ២០២៦</option>
                    <option>ឆមាសទី ១</option>
                </select>
            </div>
            <div style="display:flex; gap:10px;">
                <button onclick="exportGradebookCSV()" class="fast-action-btn"><i class="fas fa-download"></i> នាំចេញតារាងពិន្ទុ</button>
                <button onclick="alert('ពិន្ទុទាំងអស់ត្រូវបានរក្សាទុកដោយជោគជ័យ!');" class="fast-action-btn btn-glow"><i class="fas fa-floppy-disk"></i> រក្សាទុកទាំងអស់</button>
            </div>
        </div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead>
                    <tr><th>ល.រ</th><th>អត្តលេខ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ខ្មែរ</th><th>គណិត</th><th>រូប</th><th>គីមី</th><th>ជីវ</th><th>ប្រវត្តិ</th><th>អង់គ្លេស</th><th>ពលរដ្ឋ</th><th>សរុប</th><th>មធ្យមភាគ</th><th>GPA</th><th>និទ្ទេស</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function updateStudentSubjectScore(id, subj, val) {
    const list = getStudents();
    list.forEach(s => {
        if (s.id === id) {
            s[subj] = Number(val) || 0;
            const tot = (s.khmer||0) + (s.math||0) + (s.physics||0) + (s.chem||0) + (s.bio||0) + (s.history||0) + (s.english||0) + (s.civics||0);
            const avg = (tot / 8).toFixed(1);
            const gpa = (avg / 25).toFixed(2);
            let grade = avg >= 85 ? 'A' : (avg >= 80 ? 'B' : (avg >= 70 ? 'C' : (avg >= 60 ? 'D' : (avg >= 50 ? 'E' : 'F'))));
            
            const totEl = document.getElementById('tot_' + id);
            const avgEl = document.getElementById('avg_' + id);
            const gpaEl = document.getElementById('gpa_' + id);
            const grdEl = document.getElementById('grd_' + id);
            if (totEl) totEl.innerText = tot;
            if (avgEl) avgEl.innerText = avg + '%';
            if (gpaEl) gpaEl.innerText = gpa;
            if (grdEl) {
                grdEl.innerText = grade;
                grdEl.className = 'desk-status-badge ' + (grade === 'F' ? 'absent' : 'present');
            }
        }
    });
    saveStudents(list);
}

function exportGradebookCSV() {
    playClickSound();
    const list = getStudents();
    let csv = 'ID,Name,Gender,Khmer,Math,Physics,Chemistry,Biology,History,English,Civics,Total,Average,GPA,Grade\n';
    list.forEach(s => {
        const tot = (s.khmer||0) + (s.math||0) + (s.physics||0) + (s.chem||0) + (s.bio||0) + (s.history||0) + (s.english||0) + (s.civics||0);
        const avg = (tot / 8).toFixed(1);
        const gpa = (avg / 25).toFixed(2);
        let grade = avg >= 85 ? 'A' : (avg >= 80 ? 'B' : (avg >= 70 ? 'C' : (avg >= 60 ? 'D' : (avg >= 50 ? 'E' : 'F'))));
        csv += `"${s.id}","${s.name}","${s.gender}",${s.khmer},${s.math},${s.physics},${s.chem},${s.bio},${s.history},${s.english},${s.civics},${tot},${avg},${gpa},${grade}\n`;
    });
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CMS_PRO_MoEYS_Gradebook_2030.csv';
    link.click();
}

// 10. តារាកិត្តិយស & ប័ណ្ណសរសើរមាស (Royal Emblem)
function renderHolographicCertificate(container) {
    const list = getStudents();
    const sorted = list.slice().sort((a,b) => {
        const avgA = ((a.khmer||80)+(a.math||80)+(a.physics||80)+(a.chem||80)+(a.bio||80)+(a.history||80)+(a.english||80)+(a.civics||80))/8;
        const avgB = ((b.khmer||80)+(b.math||80)+(b.physics||80)+(b.chem||80)+(b.bio||80)+(b.history||80)+(b.english||80)+(b.civics||80))/8;
        return avgB - avgA;
    });
    
    const topStd = sorted[0] || { name: 'លី សុជាតា', latin: 'LY SOCHEATAR' };

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <label style="font-weight:700; color:var(--text-secondary);">ជ្រើសរើសសិស្សទទួលប័ណ្ណ៖</label>
                <select id="certStdSelect" class="form-control-2030" style="width:240px; padding:8px 12px;" onchange="updateCertDisplay(this.value)">
                    ${sorted.map((s, idx) => `<option value="${s.name}|${s.latin}|${idx+1}">${idx+1}. ${s.name} (${s.gender})</option>`).join('')}
                </select>
            </div>
            <button onclick="window.print()" class="fast-action-btn btn-glow"><i class="fas fa-print"></i> បោះពុម្ពប័ណ្ណសរសើរ A4</button>
        </div>

        <div class="hologram-certificate" id="printableCertArea">
            <div class="cert-guilloche-border"></div>
            <!-- Royal Emblem of Cambodia SVG -->
            <svg class="cert-royal-emblem-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-dasharray="4,2"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#d4af37" stroke-width="1.5"/>
                <path d="M50 15 L53 28 L66 28 L56 36 L60 48 L50 41 L40 48 L44 36 L34 28 L47 28 Z" fill="#d4af37"/>
                <path d="M30 65 Q50 50 70 65 Q50 75 30 65 Z" fill="#d4af37" opacity="0.85"/>
                <text x="50" y="85" text-anchor="middle" fill="#d4af37" font-size="8" font-family="'Kantumruy Pro'" font-weight="bold">ព្រះរាជាណាចក្រកម្ពុជា</text>
            </svg>
            <div class="cert-khmer-motto">ព្រះរាជាណាចក្រកម្ពុជា · ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">ក្រសួងអប់រំ យុវជន និងកីឡា · វិទ្យាល័យជំនាន់ថ្មី ២០៣០</div>
            <div class="cert-title-moul">ប័ណ្ណសរសើរមាស</div>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin:6px 0;">គណៈគ្រប់គ្រងសាលា និងលោកគ្រូអ្នកគ្រូ សូមប្រគល់ប័ណ្ណសរសើរនេះជូនចំពោះ</p>
            <div class="cert-student-highlight" id="certStdNameText">${topStd.name}</div>
            <div style="font-family:var(--font-mono); font-size:1.05rem; color:var(--neon-cyan); margin-bottom:12px;" id="certStdLatinText">${topStd.latin}</div>
            <p style="max-width:650px; margin:0 auto 20px; font-size:0.98rem; line-height:1.7; color:var(--text-primary);">
                ដែលបានខិតខំប្រឹងប្រែងសិក្សារៀនសូត្រ ប្រកបដោយវិន័យ សីលធម៌ល្អ និងទទួលបាន <strong><span id="certRankText" style="color:var(--gold-cert);">ចំណាត់ថ្នាក់លេខ ១</span></strong> ប្រចាំឆមាសទី ១ ឆ្នាំសិក្សា ២០២៥ - ២០២៦។
            </p>
            <div style="display:flex; justify-content:space-around; align-items:center; margin-top:24px; flex-wrap:wrap; gap:20px;">
                <div style="text-align:center;">
                    <div class="cert-qr-box">
                        <i class="fas fa-qrcode" style="font-size:78px; color:#1e1b4b;"></i>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-secondary); font-family:var(--font-mono); font-weight:600; margin-top:6px;">VERIFY: CMS-2030-QR</div>
                </div>
                <div class="cert-red-seal">
                    <span>ក្រសួងអប់រំ</span>
                    <span style="font-size:13px; font-weight:800; font-family:var(--font-title); letter-spacing:0.5px;">★ ត្រាផ្លូវការ ★</span>
                    <span>២០៣០</span>
                </div>
                <div style="text-align:center; min-width:180px;">
                    <div style="font-size:0.95rem; color:var(--text-secondary); font-family:var(--font-khmer);">រាជធានីភ្នំពេញ, ថ្ងៃទី ២៦ តុលា ២០២៦</div>
                    <div style="font-weight:800; font-size:1rem; margin-top:20px; color:#fff;">លោកគ្រូ ជា ស៊ីឌឿង</div>
                    <div style="font-size:0.92rem; color:var(--neon-cyan); font-weight:700;">គ្រូបន្ទុកថ្នាក់ទី ១២A</div>
                </div>
            </div>
        </div>
    `;
}

function updateCertDisplay(val) {
    playClickSound();
    const parts = val.split('|');
    const name = parts[0];
    const latin = parts[1] || '';
    const rank = parts[2] || '១';
    
    const nameEl = document.getElementById('certStdNameText');
    const latinEl = document.getElementById('certStdLatinText');
    const rankEl = document.getElementById('certRankText');
    if (nameEl) nameEl.innerText = name;
    if (latinEl) latinEl.innerText = latin;
    if (rankEl) rankEl.innerText = `ចំណាត់ថ្នាក់លេខ ${rank}`;
}

// 9. តារាចំណាត់ថ្នាក់ Leaderboard 3D
function renderClassLeaderboard(container) {
    const list = getStudents().slice().sort((a,b) => {
        const avgA = ((a.khmer||80)+(a.math||80)+(a.physics||80)+(a.chem||80)+(a.bio||80)+(a.history||80)+(a.english||80)+(a.civics||80))/8;
        const avgB = ((b.khmer||80)+(b.math||80)+(b.physics||80)+(b.chem||80)+(b.bio||80)+(b.history||80)+(b.english||80)+(b.civics||80))/8;
        return avgB - avgA;
    });

    const top1 = list[0] || { name: 'លី សុជាតា' };
    const top2 = list[1] || { name: 'សុវណ្ណ ទេវី' };
    const top3 = list[2] || { name: 'ចាន់ សុភា' };

    let rows = '';
    list.forEach((s, idx) => {
        const tot = (s.khmer||0)+(s.math||0)+(s.physics||0)+(s.chem||0)+(s.bio||0)+(s.history||0)+(s.english||0)+(s.civics||0);
        const avg = (tot / 8).toFixed(1);
        const gpa = (avg / 25).toFixed(2);
        let badge = idx === 0 ? '🥇 លេខ ១' : (idx === 1 ? '🥈 លេខ ២' : (idx === 2 ? '🥉 លេខ ៣' : 'លេខ ' + (idx + 1)));
        rows += `
            <tr>
                <td><strong>${badge}</strong></td>
                <td><strong style="font-family:var(--font-mono); color:var(--neon-cyan);">${s.id}</strong></td>
                <td><strong>${s.name}</strong></td>
                <td>${s.gender}</td>
                <td><strong style="font-family:var(--font-mono);">${tot}</strong></td>
                <td><strong style="color:var(--neon-emerald); font-family:var(--font-mono);">${avg}%</strong></td>
                <td><strong style="color:var(--neon-purple); font-family:var(--font-mono);">${gpa}</strong></td>
                <td>${idx < 8 ? '<span class="status-active-chip">សិស្សឆ្នើម</span>' : '<span style="color:var(--text-muted);">មធ្យម</span>'}</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:24px; text-align:center;">
            <div class="kpi-card-2030" style="--card-accent:#94a3b8;">
                <span style="font-size:38px;">🥈</span>
                <div style="font-weight:800; font-size:1.1rem; color:#94a3b8;">ជើងឯកលេខ ២</div>
                <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:6px 0;">${top2.name}</div>
                <span class="status-active-chip" style="color:#94a3b8; border-color:#94a3b8;">មធ្យមភាគ ៩៦.១%</span>
            </div>
            <div class="kpi-card-2030" style="--card-accent:var(--gold-cert); transform:translateY(-8px); box-shadow:0 0 30px rgba(212,175,55,0.35);">
                <span style="font-size:48px;">🥇</span>
                <div style="font-weight:800; font-size:1.25rem; color:var(--gold-cert);">ជើងឯកលេខ ១ (ឆ្នើម)</div>
                <div style="font-size:1.25rem; font-weight:800; color:#fff; margin:6px 0;">${top1.name}</div>
                <span class="status-active-chip" style="color:var(--gold-cert); border-color:var(--gold-cert);">មធ្យមភាគ ៩៦.៨%</span>
            </div>
            <div class="kpi-card-2030" style="--card-accent:#d97706;">
                <span style="font-size:38px;">🥉</span>
                <div style="font-weight:800; font-size:1.1rem; color:#d97706;">ជើងឯកលេខ ៣</div>
                <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:6px 0;">${top3.name}</div>
                <span class="status-active-chip" style="color:#d97706; border-color:#d97706;">មធ្យមភាគ ៩៤.៥%</span>
            </div>
        </div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>ចំណាត់ថ្នាក់</th><th>អត្តលេខ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ពិន្ទុសរុប (៨០០)</th><th>មធ្យមភាគ</th><th>GPA</th><th>កិត្តិយស</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// 7. បញ្ជីពិន្ទុ & របាយការណ៍សរុប
function renderMasterScoreReport(container) {
    const list = getStudents();
    let rows = '';
    list.forEach((s, idx) => {
        const tot = (s.khmer||0)+(s.math||0)+(s.physics||0)+(s.chem||0)+(s.bio||0)+(s.history||0)+(s.english||0)+(s.civics||0);
        const avg = (tot / 8).toFixed(1);
        const pass = avg >= 50;
        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td>${s.id}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.gender}</td>
                <td>${tot}</td>
                <td><strong style="color:var(--neon-emerald);">${avg}%</strong></td>
                <td>${pass ? '<span class="desk-status-badge present">ជាប់ (Passed)</span>' : '<span class="desk-status-badge absent">ធ្លាក់</span>'}</td>
            </tr>
        `;
    });
    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <h4 style="margin:0; color:var(--text-primary);">របាយការណ៍លទ្ធផលសិក្សាប្រចាំខែវិច្ឆិកា ថ្នាក់ទី ១២A</h4>
            <button onclick="window.print()" class="fast-action-btn"><i class="fas fa-print"></i> បោះពុម្ពបញ្ជីពិន្ទុ</button>
        </div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>ល.រ</th><th>អត្តលេខ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ពិន្ទុសរុប</th><th>មធ្យមភាគ</th><th>លទ្ធផល</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// 8. បញ្ជីវត្តមានប្រចាំខែ
function renderMonthlyRegisterSheet(container) {
    const list = getStudents();
    let rows = '';
    list.forEach((s, idx) => {
        let cells = '';
        for (let d = 1; d <= 15; d++) {
            cells += `<td style="text-align:center; font-family:var(--font-mono); font-size:13.5px; font-weight:700; color:var(--neon-emerald);">P</td>`;
        }
        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.gender}</td>
                ${cells}
                <td><strong style="color:var(--neon-cyan); font-family:var(--font-mono);">98.5%</strong></td>
            </tr>
        `;
    });
    container.innerHTML = `
        <div style="margin-bottom:12px; font-weight:800; color:var(--text-primary);">បញ្ជីវត្តមានប្រចាំខែវិច្ឆិកា (ថ្ងៃទី ១ ដល់ ទី ១៥)</div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead>
                    <tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>១</th><th>២</th><th>៣</th><th>៤</th><th>៥</th><th>៦</th><th>៧</th><th>៨</th><th>៩</th><th>១០</th><th>១១</th><th>១២</th><th>១៣</th><th>១៤</th><th>១៥</th><th>វត្តមាន%</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// 6. បញ្ចូលពិន្ទុកិច្ចការផ្ទះ
function renderHomeworkPortal(container) {
    const list = getStudents();
    let rows = '';
    list.forEach((s, idx) => {
        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.gender}</td>
                <td><span class="desk-status-badge present">បានប្រគល់</span></td>
                <td><input type="number" min="0" max="10" class="grade-input-cell" value="${s.homework || 10}"> / 10</td>
                <td><input type="text" class="form-control-2030" style="padding:6px 10px; font-size:0.85rem;" value="ការវិភាគរូបមន្តបានត្រឹមត្រូវ"></td>
            </tr>
        `;
    });
    container.innerHTML = `
        <div style="background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.3); border-radius:var(--radius-md); padding:16px; margin-bottom:16px;">
            <strong style="color:var(--neon-cyan);"><i class="fas fa-book"></i> កិច្ចការផ្ទះ៖ គណិតវិទ្យា (អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត)</strong>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">ពិន្ទុអតិបរមា៖ ១០ ពិន្ទុ · កាលកំណត់៖ ថ្ងៃស្អែក ម៉ោង ៧:០០ ព្រឹក</div>
        </div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ស្ថានភាព</th><th>ពិន្ទុ</th><th>ការកែលម្អ</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <button onclick="alert('បានរក្សាទុកពិន្ទុកិច្ចការផ្ទះដោយជោគជ័យ!'); closeFeatureModal();" class="fast-action-btn btn-glow" style="width:100%; justify-content:center; margin-top:14px; padding:12px;">
            <i class="fas fa-save"></i> រក្សាទុកពិន្ទុកិច្ចការផ្ទះ
        </button>
    `;
}

// 11. លទ្ធផលប្រចាំឆមាស & ប្រចាំឆ្នាំ
function renderSemesterAndYearResults(container) {
    const list = getStudents();
    let rows = '';
    list.forEach((s, idx) => {
        const s1 = ((s.khmer||80)+(s.math||80)+(s.physics||80)+(s.chem||80)+(s.bio||80)+(s.history||80)+(s.english||80)+(s.civics||80))/8;
        const s2 = s1 + (idx % 2 === 0 ? 1.5 : -0.5);
        const year = ((s1 + s2)/2).toFixed(1);
        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.gender}</td>
                <td><strong style="font-family:var(--font-mono);">${s1.toFixed(1)}%</strong></td>
                <td><strong style="font-family:var(--font-mono);">${s2.toFixed(1)}%</strong></td>
                <td><strong style="color:var(--neon-emerald); font-family:var(--font-mono);">${year}%</strong></td>
                <td><span class="desk-status-badge present">ឡើងថ្នាក់ (Promoted)</span></td>
            </tr>
        `;
    });
    container.innerHTML = `
        <div style="margin-bottom:12px; font-weight:800; color:var(--text-primary);">លទ្ធផលសិក្សាប្រចាំឆមាសទី ១ ឆមាសទី ២ និងមធ្យមភាគប្រចាំឆ្នាំ ២០២៥ - ២០២៦</div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ឆមាសទី ១</th><th>ឆមាសទី ២</th><th>ប្រចាំឆ្នាំ</th><th>សេចក្តីសម្រេច</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// 12. វេនសម្អាត និងភារកិច្ចបរិស្ថានបៃតង
function renderEcoCleaningRoster(container) {
    container.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-cyan);"><i class="fas fa-calendar-day"></i> ថ្ងៃចន្ទ</strong>
                <div style="font-size:0.9rem; color:var(--text-primary); margin-top:6px;">ចាន់ សុភា, សេង វណ្ណា (បោសសំអាត និងជូតក្តារខៀនឌីជីថល)</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-cyan);"><i class="fas fa-calendar-day"></i> ថ្ងៃអង្គារ</strong>
                <div style="font-size:0.9rem; color:var(--text-primary); margin-top:6px;">លី សុជាតា, កែវ វិសាល (រៀបចំតុសិស្ស ៤៥ តុ)</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-cyan);"><i class="fas fa-calendar-day"></i> ថ្ងៃពុធ</strong>
                <div style="font-size:0.9rem; color:var(--text-primary); margin-top:6px;">ហេង ម៉ានី, សុខ សម្បត្តិ (ស្រោចផ្កា និងថែទាំរុក្ខជាតិបៃតង)</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-cyan);"><i class="fas fa-calendar-day"></i> ថ្ងៃព្រហស្បតិ៍</strong>
                <div style="font-size:0.9rem; color:var(--text-primary); margin-top:6px;">ជា រដ្ឋា, ណុប ស្រីនិច (ញែកសំរាម និងប្លាស្ទិក)</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-cyan);"><i class="fas fa-calendar-day"></i> ថ្ងៃសុក្រ</strong>
                <div style="font-size:0.9rem; color:var(--text-primary); margin-top:6px;">ម៉ៅ ពិសិដ្ឋ, ពេជ្រ ធីតា (ត្រួតពិនិត្យប្រព័ន្ធភ្លើង និងកង្ហារ)</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-cyan);"><i class="fas fa-calendar-day"></i> ថ្ងៃសៅរ៍</strong>
                <div style="font-size:0.9rem; color:var(--text-primary); margin-top:6px;">សិស្សានុសិស្សទាំងអស់ (សម្អាតធំបរិស្ថានបៃតងទូទាំងថ្នាក់)</div>
            </div>
        </div>
    `;
}

// 13. សៀវភៅតាមដានការសិក្សា & សីលធម៌
function renderStudyBehaviorTracker(container) {
    const list = getStudents();
    container.innerHTML = `
        <div class="form-group-2030">
            <label>ជ្រើសរើសសិស្សដើម្បីតាមដាន៖</label>
            <select class="form-control-2030">${list.map(s => `<option>${s.id} - ${s.name} (${s.gender})</option>`).join('')}</select>
        </div>
        <div class="kpi-card-2030">
            <h4 style="margin:0 0 12px; color:var(--text-primary);">កំណត់ត្រាការសិក្សា & សីលធម៌</h4>
            <div class="form-grid-2">
                <div class="form-group-2030"><label>ការគោរពវិន័យ</label><select class="form-control-2030"><option>ល្អណាស់</option><option>ល្អ</option><option>មធ្យម</option></select></div>
                <div class="form-group-2030"><label>ការយកចិត្តទុកដាក់</label><select class="form-control-2030"><option>ល្អណាស់</option><option>ល្អ</option><option>មធ្យម</option></select></div>
            </div>
            <div class="form-group-2030">
                <label>មតិយោបល់របស់គ្រូបន្ទុកថ្នាក់</label>
                <textarea class="form-control-2030" rows="3" placeholder="សិស្សឧស្សាហ៍ព្យាយាម រួសរាយ និងសកម្មក្នុងការងារក្រុម..."></textarea>
            </div>
            <button onclick="alert('បានកត់ត្រាការតាមដានដោយជោគជ័យ!'); closeFeatureModal();" class="fast-action-btn btn-glow" style="width:100%; justify-content:center;">
                <i class="fas fa-save"></i> រក្សាទុកកំណត់ត្រា
            </button>
        </div>
    `;
}

// 14. សៀវភៅសិក្ខាគារិក
function renderTraineePracticumLog(container) {
    container.innerHTML = `
        <div style="background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.3); border-radius:var(--radius-md); padding:16px; margin-bottom:16px;">
            <strong style="color:var(--neon-indigo);"><i class="fas fa-graduation-cap"></i> សៀវភៅតាមដានគរុសិស្ស / និស្សិតកម្មសិក្សាគរុកោសល្យ</strong>
            <p style="margin:6px 0 0; font-size:0.88rem; color:var(--text-secondary);">កំណត់ត្រាការចុះកម្មសិក្សាគរុកោសល្យ និងការបង្រៀនជាក់ស្តែងក្នុងថ្នាក់រៀន។</p>
        </div>
        <div class="form-grid-2">
            <div class="form-group-2030"><label>ឈ្មោះគរុសិស្ស</label><input type="text" class="form-control-2030" value="សេង វណ្ណឌី"></div>
            <div class="form-group-2030"><label>គ្រូណែនាំ</label><input type="text" class="form-control-2030" value="ជា ស៊ីឌឿង"></div>
        </div>
        <div class="form-grid-2">
            <div class="form-group-2030"><label>កាលបរិច្ឆេទបង្រៀនសាកល្បង</label><input type="date" class="form-control-2030" value="${new Date().toISOString().split('T')[0]}"></div>
            <div class="form-group-2030"><label>មុខវិជ្ជា</label><input type="text" class="form-control-2030" value="គណិតវិទ្យា ថ្នាក់ទី ១២"></div>
        </div>
        <button onclick="alert('បានរក្សាទុកកំណត់ត្រាកម្មសិក្សាដោយជោគជ័យ!'); closeFeatureModal();" class="fast-action-btn btn-glow" style="width:100%; justify-content:center;">
            <i class="fas fa-save"></i> រក្សាទុក
        </button>
    `;
}

// 15. សាលាកប័ត្រឯកត្តជន (MoEYS Cumulative Record)
function renderIndividualCumulativeCard(container) {
    const list = getStudents();
    const s = list[0] || { name: 'ចាន់ សុភា', id: 'STU-2026-001', latin: 'CHAN SOPHEA', gender: 'ស្រី', dob: '2008-05-14', blood: 'O+', village: 'ភូមិត្រពាំងថ្លឹង សង្កាត់ចោមចៅ រាជធានីភ្នំពេញ', phone: '012 334 455', parent: 'ចាន់ សារិទ្ធ (ឪពុក)', job: 'មន្ត្រីរាជការ' };
    
    container.innerHTML = `
        <div style="border:2px solid var(--border-glass); border-radius:var(--radius-lg); padding:24px; background:var(--bg-glass-card);">
            <div style="text-align:center; border-bottom:1px solid var(--border-glass); padding-bottom:16px; margin-bottom:18px;">
                <h3 style="margin:0 0 6px; font-family:var(--font-heading); color:var(--neon-cyan);">សាលាកប័ត្រឯកត្តជនសិស្ស</h3>
                <span style="font-size:0.85rem; color:var(--text-muted);">(ក្រសួងអប់រំ យុវជន និងកីឡា · វិទ្យាល័យជំនាន់ថ្មី ២០៣០)</span>
            </div>
            <div class="form-grid-2" style="font-size:0.95rem; line-height:2.2;">
                <div><strong>អត្តលេខសិស្ស៖</strong> <span style="font-family:var(--font-mono); color:var(--neon-cyan);">${s.id}</span></div>
                <div><strong>គោត្តនាម-នាម៖</strong> <strong>${s.name} (${s.latin})</strong></div>
                <div><strong>ភេទ៖</strong> ${s.gender}</div>
                <div><strong>ថ្ងៃខែឆ្នាំកំណើត៖</strong> <span style="font-family:var(--font-mono);">${s.dob} (អាយុ ១៨ ឆ្នាំ)</span></div>
                <div><strong>ក្រុមឈាម៖</strong> <span style="color:var(--neon-amber); font-weight:700;">${s.blood}</span></div>
                <div><strong>លេខទូរស័ព្ទ៖</strong> ${s.phone}</div>
                <div><strong>ឈ្មោះអាណាព្យាបាល៖</strong> ${s.parent}</div>
                <div><strong>មុខរបរអាណាព្យាបាល៖</strong> ${s.job}</div>
                <div style="grid-column:1/-1;"><strong>អាសយដ្ឋានបច្ចុប្បន្ន៖</strong> ${s.village}</div>
            </div>
            <button onclick="window.print()" class="fast-action-btn btn-glow" style="margin-top:20px; width:100%; justify-content:center;">
                <i class="fas fa-print"></i> បោះពុម្ពសាលាកប័ត្រ A4
            </button>
        </div>
    `;
}

// 16. កិច្ចព្រមព្រៀងឌីជីថលជាមួយមាតាបិតាសិស្ស
function renderDigitalParentAgreement(container) {
    container.innerHTML = `
        <div style="line-height:1.8; color:var(--text-primary);">
            <h4 style="text-align:center; margin:0 0 14px; color:var(--neon-indigo); font-size:1.15rem;">កិច្ចព្រមព្រៀងភាពជាដៃគូរវាងមាតាបិតា និងសាលារៀន ២០៣០</h4>
            <div class="kpi-card-2030" style="margin-bottom:16px;">
                <ol style="margin:0; padding-left:22px; font-size:0.92rem; color:var(--text-secondary);">
                    <li>ធានាឲ្យកូនមកសាលារៀនបានទៀងទាត់ និងទាន់ពេលវេលា (អត្រាវត្តមានអប្បបរមា ៩៥%)។</li>
                    <li>តាមដានការធ្វើកិច្ចការផ្ទះ និងការសិក្សាតាមប្រព័ន្ធឌីជីថលជារៀងរាល់ថ្ងៃ។</li>
                    <li>ទំនាក់ទំនងជិតស្និទ្ធជាមួយគ្រូបន្ទុកថ្នាក់តាមរយៈប្រព័ន្ធ SMS/Telegram។</li>
                    <li>អប់រំកូនឲ្យគោរពវិន័យ សីលធម៌ និងប្រកាន់ខ្ជាប់តម្លៃនៃការសិក្សា។</li>
                    <li>ចូលរួមគ្រប់កិច្ចប្រជុំមាតាបិតាសិស្សដែលសាលារៀបចំ។</li>
                </ol>
            </div>
            <button onclick="alert('បានចុះហត្ថលេខាឌីជីថលលើកិច្ចព្រមព្រៀងដោយជោគជ័យ!'); closeFeatureModal();" class="fast-action-btn btn-glow" style="width:100%; justify-content:center; padding:12px;">
                <i class="fas fa-signature"></i> យល់ព្រម និងចុះហត្ថលេខាឌីជីថល
            </button>
        </div>
    `;
}

// 17. បញ្ជីសារពើភ័ណ្ឌបន្ទប់រៀនឆ្លាតវៃ ២០៣០
function renderSmartClassInventory(container) {
    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <span style="font-weight:800; color:var(--text-primary);">សម្ភារៈបន្ទប់រៀនឆ្លាតវៃ (Smart Classroom Inventory)</span>
            <button onclick="alert('បានកត់ត្រាសម្ភារៈថ្មី!');" class="fast-action-btn"><i class="fas fa-plus"></i> បន្ថែមសម្ភារៈ</button>
        </div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>ល.រ</th><th>ឈ្មោះឧបករណ៍</th><th>ចំនួន</th><th>ស្ថានភាព</th><th>កូដ Barcode</th><th>កំណត់សម្គាល់</th></tr></thead>
                <tbody>
                    <tr><td>១</td><td>ក្តារខៀនឆ្លាតវៃ Smartboard 85"</td><td>១</td><td><span class="desk-status-badge present">ដំណើរការល្អ</span></td><td><code>AST-2030-SB01</code></td><td>អេក្រង់ប៉ះ 4K</td></tr>
                    <tr><td>២</td><td>កាមេរ៉ាស្កេនវត្តមាន AI Camera</td><td>២</td><td><span class="desk-status-badge present">ដំណើរការល្អ</span></td><td><code>AST-2030-CAM02</code></td><td>ស្កេនមុខស្វ័យប្រវត្តិ</td></tr>
                    <tr><td>៣</td><td>កុំព្យូទ័រយួរដៃសិស្ស (Laptops)</td><td>៤៥</td><td><span class="desk-status-badge present">ល្អ ៤៥/៤៥</span></td><td><code>AST-2030-LP45</code></td><td>បំពាក់កម្មវិធីសិក្សា</td></tr>
                    <tr><td>៤</td><td>វ៉ែនតា VR Headset (Meta Quest)</td><td>១០</td><td><span class="desk-status-badge present">ល្អ ១០/១០</span></td><td><code>AST-2030-VR10</code></td><td>ពិសោធន៍វិទ្យាសាស្ត្រ</td></tr>
                    <tr><td>៥</td><td>ម៉ាស៊ីនត្រជាក់ Inverter 2.5HP</td><td>២</td><td><span class="desk-status-badge present">ដំណើរការល្អ</span></td><td><code>AST-2030-AC02</code></td><td>សន្សំសំចៃថាមពល</td></tr>
                    <tr><td>៦</td><td>រ៉ោតទ័រ Wi-Fi 7 Fiber 1Gbps</td><td>១</td><td><span class="desk-status-badge present">ដំណើរការល្អ</span></td><td><code>AST-2030-WF01</code></td><td>ល្បឿនលឿនពិសេស</td></tr>
                </tbody>
            </table>
        </div>
    `;
}

// 18. បញ្ជីខ្ចី និងប្រមូលសៀវភៅសិក្សាគោល MoEYS
function renderTextbookManagement(container) {
    const list = getStudents().slice(0, 10);
    let rows = '';
    list.forEach((s, idx) => {
        rows += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong>${s.name}</strong></td>
                <td>គណិតវិទ្យា, រូបវិទ្យា, គីមីវិទ្យា, ភាសាខ្មែរ</td>
                <td>០១ តុលា ២០២៦</td>
                <td><span class="desk-status-badge present" onclick="this.classList.toggle('absent'); this.innerText = this.classList.contains('absent') ? 'មិនទាន់សង' : 'បានសងវិញ';">បានសងវិញ</span></td>
            </tr>
        `;
    });
    container.innerHTML = `
        <div style="margin-bottom:12px; font-weight:800; color:var(--text-primary);">បញ្ជីខ្ចី និងប្រមូលសៀវភៅពុម្ព MoEYS ថ្នាក់ទី ១២A</div>
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>សៀវភៅខ្ចី</th><th>កាលបរិច្ឆេទ</th><th>ស្ថានភាពប្រមូល</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

// 19. បណ្តាញសិស្សតាមភូមិ
function renderVillageNetworkGrid(container) {
    container.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-indigo); font-size:1.05rem;"><i class="fas fa-location-dot"></i> ភូមិត្រពាំងថ្លឹង (១២ នាក់)</strong>
                <div style="margin:8px 0; font-size:0.9rem; color:var(--text-primary);">ប្រធានក្រុម៖ <strong>ចាន់ សុភា</strong> (012 334 455)</div>
                <div style="font-size:0.82rem; color:var(--text-secondary);">សមាជិក៖ ហេង ម៉ានី, ពេជ្រ ធីតា, ព្រំ រ៉ាវី, ស៊ន សុវណ្ណ...</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-indigo); font-size:1.05rem;"><i class="fas fa-location-dot"></i> ភូមិព្រៃស (១១ នាក់)</strong>
                <div style="margin:8px 0; font-size:0.9rem; color:var(--text-primary);">ប្រធានក្រុម៖ <strong>សេង វណ្ណា</strong> (098 776 554)</div>
                <div style="font-size:0.82rem; color:var(--text-secondary);">សមាជិក៖ សុខ សម្បត្តិ, ម៉ៅ ពិសិដ្ឋ, ឡុង វិបុល, ជុំ ចរិយា...</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-indigo); font-size:1.05rem;"><i class="fas fa-location-dot"></i> ភូមិស្ទឹងមានជ័យ (១១ នាក់)</strong>
                <div style="margin:8px 0; font-size:0.9rem; color:var(--text-primary);">ប្រធានក្រុម៖ <strong>លី សុជាតា</strong> (015 998 877)</div>
                <div style="font-size:0.82rem; color:var(--text-secondary);">សមាជិក៖ ជា រដ្ឋា, គង់ មុន្នីរ័ត្ន, អ៊ុច វល័ក្ខ, ថោង សុម៉ាលី...</div>
            </div>
            <div class="kpi-card-2030">
                <strong style="color:var(--neon-indigo); font-size:1.05rem;"><i class="fas fa-location-dot"></i> ភូមិចោមចៅ (១១ នាក់)</strong>
                <div style="margin:8px 0; font-size:0.9rem; color:var(--text-primary);">ប្រធានក្រុម៖ <strong>កែវ វិសាល</strong> (097 554 332)</div>
                <div style="font-size:0.82rem; color:var(--text-secondary);">សមាជិក៖ ណុប ស្រីនិច, តែម ស្រីរ័ត្ន, យឹម ដារ៉ូ, វ៉ាន់ ពិទូ...</div>
            </div>
        </div>
    `;
}

// 20. រចនាសម្ព័ន្ធគណៈកម្មាធិការថ្នាក់រៀន ២០៣០
function renderCommitteeHierarchy(container) {
    container.innerHTML = `
        <div style="text-align:center; padding:10px;">
            <div style="display:inline-block; background:rgba(99,102,241,0.2); border:2px solid var(--neon-indigo); border-radius:var(--radius-md); padding:14px 28px; margin-bottom:16px;">
                <div style="font-size:0.95rem; color:var(--neon-cyan); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">ប្រធានថ្នាក់រៀន (President)</div>
                <strong style="font-size:1.15rem; color:#fff;">លី សុជាតា (015 998 877)</strong>
            </div>
            <div style="width:2px; height:20px; background:var(--border-glass); margin:0 auto 16px;"></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                <div style="background:rgba(16,185,129,0.15); border:1.5px solid var(--neon-emerald); border-radius:var(--radius-sm); padding:12px;">
                    <div style="font-size:0.92rem; color:var(--neon-emerald); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">អនុប្រធានទី ១ (សិក្សា)</div>
                    <strong style="font-size:1rem; color:#fff;">សេង វណ្ណា</strong>
                </div>
                <div style="background:rgba(236,72,153,0.15); border:1.5px solid var(--neon-pink); border-radius:var(--radius-sm); padding:12px;">
                    <div style="font-size:0.92rem; color:var(--neon-pink); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">អនុប្រធានទី ២ (វិន័យ)</div>
                    <strong style="font-size:1rem; color:#fff;">ចាន់ សុភា</strong>
                </div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
                <div style="background:var(--bg-glass-card); border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:12px;">
                    <div style="font-size:0.92rem; color:var(--neon-cyan); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">គណៈកម្មការអនាម័យ</div>
                    <strong>ហេង ម៉ានី</strong>
                </div>
                <div style="background:var(--bg-glass-card); border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:12px;">
                    <div style="font-size:0.92rem; color:var(--neon-amber); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">គណៈកម្មការកីឡា</div>
                    <strong>ជា រដ្ឋា</strong>
                </div>
                <div style="background:var(--bg-glass-card); border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:12px;">
                    <div style="font-size:0.92rem; color:var(--neon-purple); font-weight:800; font-family:var(--font-title); margin-bottom:4px;">គណៈកម្មការបច្ចេកវិទ្យា</div>
                    <strong>ព្រំ រ៉ាវី</strong>
                </div>
            </div>
        </div>
    `;
}

// 21. តារាងស្ថិតិ និងពីរ៉ាមីតអាយុសិស្ស
function renderAgeDemographicsPyramid(container) {
    container.innerHTML = `
        <div class="table-responsive-box">
            <table class="cms-table-2030">
                <thead><tr><th>កម្រិតអាយុ</th><th>សិស្សប្រុស</th><th>សិស្សស្រី</th><th>សរុប</th><th>ភាគរយ</th></tr></thead>
                <tbody>
                    <tr><td>១៧ ឆ្នាំ</td><td>២</td><td>៣</td><td><strong>៥</strong></td><td>១១.១%</td></tr>
                    <tr><td>១៨ ឆ្នាំ</td><td>១៩</td><td>១៨</td><td><strong style="color:var(--neon-emerald);">៣៧</strong></td><td>៨២.២%</td></tr>
                    <tr><td>១៩ ឆ្នាំ</td><td>២</td><td>១</td><td><strong>៣</strong></td><td>៦.៧%</td></tr>
                    <tr style="background:rgba(99,102,241,0.15); font-weight:800;"><td>សរុបទាំងអស់</td><td>២៣</td><td>២២</td><td><strong>៤៥</strong></td><td>១០០%</td></tr>
                </tbody>
            </table>
        </div>
    `;
}

// 22. ព័ត៌មានគណនីគ្រូបង្រៀន & សុវត្ថិភាព
function renderTeacherProfileDetails(container) {
    let teacher = { name: 'លោកគ្រូ ជា ស៊ីឌឿង', phone: '096 7 70 80 90', school: 'វិទ្យាល័យជំនាន់ថ្មី ២០៣០', level: 'ថ្នាក់ទី ១២A' };
    try {
        const reg = JSON.parse(localStorage.getItem('cms_registered_user') || 'null') || JSON.parse(localStorage.getItem('cms_current_user') || 'null');
        if (reg) {
            teacher.name = reg.name || teacher.name;
            teacher.phone = reg.phone || teacher.phone;
            teacher.school = reg.schoolUnit || teacher.school;
        }
    } catch(e){}

    container.innerHTML = `
        <div style="text-align:center; padding:15px;">
            <div style="width:84px; height:84px; border-radius:50%; background:linear-gradient(135deg, var(--neon-indigo), var(--neon-purple)); color:#fff; display:flex; align-items:center; justify-content:center; font-size:42px; margin:0 auto 16px; box-shadow:0 0 25px rgba(99,102,241,0.5);">
                <i class="fas fa-user-tie"></i>
            </div>
            <h3 style="margin:0 0 6px; color:var(--text-primary); font-size:1.35rem;">${teacher.name}</h3>
            <p style="color:var(--neon-cyan); margin:0 0 20px; font-weight:700;">${teacher.school} · ${teacher.level}</p>
            <div class="kpi-card-2030" style="text-align:left; line-height:2.2; margin-bottom:20px;">
                <div><strong>លេខទូរស័ព្ទ៖</strong> ${teacher.phone}</div>
                <div><strong>តួនាទី៖</strong> គ្រូបង្រៀនបន្ទុកថ្នាក់ (Homeroom Teacher)</div>
                <div><strong>កំណែប្រព័ន្ធ៖</strong> <span class="hologram-chip">CMS PRO 2030 v2030.5</span></div>
                <div><strong>ស្ថានភាពសមកាលកម្ម៖</strong> <span style="color:var(--neon-emerald); font-weight:700;">● Cloud Sync សកម្ម</span></div>
            </div>
            <button onclick="performUserLogout()" class="fast-action-btn" style="width:100%; justify-content:center; background:rgba(244,63,94,0.15); color:var(--neon-rose); border-color:var(--neon-rose); padding:12px;">
                <i class="fas fa-sign-out-alt"></i> ចាកចេញពីគណនី (Logout)
            </button>
        </div>
    `;
}

// 23. សេចក្តីជូនដំណឹង smskh.pro
function renderSchoolNoticeModal(container) {
    container.innerHTML = `
        <div style="text-align:left; line-height:1.7; color:var(--text-primary);">
            <div style="background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); padding:18px; border-radius:var(--radius-md); margin-bottom:16px;">
                <strong style="color:var(--neon-cyan); font-size:1.1rem;"><i class="fas fa-school"></i> ប្រព័ន្ធគ្រប់គ្រងសាលារៀន smskh.pro</strong>
                <p style="margin:8px 0 0; font-size:0.92rem; color:var(--text-secondary);">យើងបានបង្កើតប្រព័ន្ធគ្រប់គ្រងសាលារៀន smskh.pro រួចរាល់ហើយ! សូមលោកគ្រូ អ្នកគ្រូ បញ្ចូលលេខកូដសាលា ដើម្បីធ្វើសមកាលកម្មទិន្នន័យទៅនាយកសាលា។</p>
            </div>
            <div class="form-group-2030">
                <label>បញ្ចូលលេខកូដសាលារបស់លោកគ្រូ៖</label>
                <input type="text" id="schoolCodeField" class="form-control-2030" value="${localStorage.getItem('cms_school_code') || 'SCH-2026-008'}" placeholder="ឧ. SCH-2026-008">
            </div>
            <button onclick="localStorage.setItem('cms_school_code', document.getElementById('schoolCodeField').value); alert('បានរក្សាទុកលេខកូដសាលាដោយជោគជ័យ!'); closeFeatureModal();" class="fast-action-btn btn-glow" style="width:100%; justify-content:center; padding:12px;">
                <i class="fas fa-check"></i> រក្សាទុកលេខកូដសាលា
            </button>
        </div>
    `;
}

// 24. កញ្ចប់សេវា & ការបង់ប្រាក់ KHQR (ABA Bank - RATHANA LAN)
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
                    <div style="position:absolute; bottom:12px; right:12px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.85rem; font-weight:700; padding:4px 10px; border-radius:6px; backdrop-filter:blur(4px); pointer-events:none;">
                        <i class="fas fa-magnifying-glass-plus"></i> ពង្រីក
                    </div>
                </div>

                <!-- Bank & Account Information Details -->
                <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px 14px; text-align:left; font-size:0.96rem; line-height:2.0; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--text-muted);">ឈ្មោះគណនី៖</span>
                        <strong style="color:#fff; font-size:0.96rem; letter-spacing:0.5px;">RATHANA LAN</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--text-muted);"><i class="fas fa-dollar-sign" style="color:var(--neon-emerald);"></i> គណនី USD៖</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <strong style="color:var(--neon-emerald); font-family:var(--font-mono); font-size:0.95rem;">500 054 951</strong>
                            <button onclick="copyToClipboard('500054951', 'USD')" style="background:rgba(16,185,129,0.25); color:var(--neon-emerald); border:none; border-radius:6px; padding:2px 8px; cursor:pointer; font-size:0.88rem; font-weight:700; padding:4px 12px;" title="ចម្លងលេខគណនី"><i class="fas fa-copy"></i> ចម្លង</button>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--text-muted);"><i class="fas fa-coins" style="color:var(--neon-amber);"></i> គណនី KHR (៛)៖</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <strong style="color:var(--neon-amber); font-family:var(--font-mono); font-size:0.95rem;">600 332 124</strong>
                            <button onclick="copyToClipboard('600332124', 'KHR')" style="background:rgba(245,158,11,0.25); color:var(--neon-amber); border:none; border-radius:6px; padding:2px 8px; cursor:pointer; font-size:0.88rem; font-weight:700; padding:4px 12px;" title="ចម្លងលេខគណនី"><i class="fas fa-copy"></i> ចម្លង</button>
                        </div>
                    </div>
                </div>

                <!-- Action Download & Confirm Buttons -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <a href="images/khqr_aba.png" download="ABA_KHQR_RATHANA_LAN.png" class="fast-action-btn" style="padding:9px 10px; font-size:0.92rem; font-weight:700; padding:11px 16px; justify-content:center; text-decoration:none;">
                        <i class="fas fa-download"></i> ទាញយក QR
                    </a>
                    <a href="https://t.me/cmskh_support" target="_blank" class="fast-action-btn" style="padding:9px 10px; font-size:0.92rem; font-weight:700; padding:11px 16px; justify-content:center; text-decoration:none; background:rgba(6,182,212,0.18); color:var(--neon-cyan); border-color:var(--neon-cyan);">
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


// 3. ផ្ទេរ និងទទួលសិស្ស
function renderStudentTransfer(container) {
    const list = getStudents();
    container.innerHTML = `
        <div style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); padding:16px; border-radius:var(--radius-md); margin-bottom:16px;">
            <strong style="color:var(--neon-emerald);"><i class="fas fa-file-export"></i> លិខិតផ្ទេរសិស្សចេញ / ចូលផ្លូវការ</strong>
            <p style="margin:6px 0 0; font-size:0.88rem; color:var(--text-secondary);">លោកគ្រូអាចចេញលិខិតផ្ទេរសិស្សទៅកាន់សាលារៀនផ្សេង ឬទទួលសិស្សផ្ទេរចូល។</p>
        </div>
        <form onsubmit="event.preventDefault(); alert('បានបង្កើត និងបោះពុម្ពលិខិតផ្ទេរសិស្សដោយជោគជ័យ!'); closeFeatureModal();">
            <div class="form-grid-2">
                <div class="form-group-2030">
                    <label>ជ្រើសរើសសិស្ស</label>
                    <select class="form-control-2030">${list.map(s=>`<option>${s.id} - ${s.name} (${s.gender})</option>`).join('')}</select>
                </div>
                <div class="form-group-2030">
                    <label>ប្រភេទនៃការផ្ទេរ</label>
                    <select class="form-control-2030">
                        <option>ផ្ទេរចេញ (Transfer Out)</option>
                        <option>ទទួលផ្ទេរចូល (Transfer In)</option>
                    </select>
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group-2030">
                    <label>ផ្ទេរទៅកាន់ / មកពីសាលារៀន</label>
                    <input type="text" class="form-control-2030" required placeholder="ឧ. វិទ្យាល័យព្រះស៊ីសុវត្ថិ">
                </div>
                <div class="form-group-2030">
                    <label>កាលបរិច្ឆេទផ្ទេរ</label>
                    <input type="date" class="form-control-2030" value="${new Date().toISOString().split('T')[0]}">
                </div>
            </div>
            <div class="form-group-2030">
                <label>មូលហេតុនៃការផ្ទេរ</label>
                <textarea class="form-control-2030" rows="2" placeholder="ប្តូរទីលំនៅតាមឪពុកម្តាយ..."></textarea>
            </div>
            <button type="submit" class="fast-action-btn btn-glow" style="width:100%; justify-content:center; padding:12px;">
                <i class="fas fa-print"></i> បង្កើត និងបោះពុម្ពលិខិតផ្ទេរ
            </button>
        </form>
    `;
}

// Global Menu Filter
function filterMenuGrid() {
    const input = document.getElementById('menuSearchInput');
    if (!input) return;
    const q = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.menu-grid-2030 .menu-card-2030');
    cards.forEach(card => {
        const title = (card.querySelector('.menu-card-title') || {}).innerText || '';
        const match = !q || title.toLowerCase().includes(q);
        card.style.display = match ? 'flex' : 'none';
    });
}

// User Session Management
function initUserSession() {
    const loggedIn = localStorage.getItem('cms_logged_in') === 'true';
    let user = { name: 'លោកគ្រូ ជា ស៊ីឌឿង', role: 'គ្រូបន្ទុកថ្នាក់ ១២A' };
    try {
        const u = JSON.parse(localStorage.getItem('cms_registered_user') || 'null') || JSON.parse(localStorage.getItem('cms_current_user') || 'null');
        if (u && u.name) {
            user.name = u.name;
        }
    } catch(e){}
    
    const chipName = document.getElementById('topbarUserName');
    if (chipName) chipName.innerText = user.name;
}

function performUserLogout() {
    playClickSound();
    if (confirm('តើលោកគ្រូពិតជាចង់ចាកចេញពីប្រព័ន្ធមែនទេ?')) {
        localStorage.removeItem('cms_logged_in');
        localStorage.removeItem('cms_current_user');
        window.location.reload();
    }
}

// Infinite Marquee Engine
function initQuickMarquee() {
    const track = document.getElementById('quickMarqueeTrack');
    const container = document.getElementById('quickBarGlass');
    if (!track || !container) return;
    
    // Duplicate set to create seamless infinite loop
    const items = Array.from(track.children);
    items.forEach(it => {
        const clone = it.cloneNode(true);
        track.appendChild(clone);
    });
    
    let pos = 0;
    const speed = 0.55;
    let isHover = false;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    
    container.addEventListener('mouseenter', () => isHover = true);
    container.addEventListener('mouseleave', () => isHover = false);
    
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = pos;
    });
    window.addEventListener('mouseup', () => isDown = false);
    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        pos = scrollLeft - walk;
        track.style.transform = `translateX(${-pos}px)`;
    });
    
    function animateMarquee() {
        if (!isHover && !isDown) {
            pos += speed;
            const halfW = track.scrollWidth / 2;
            if (pos >= halfW) {
                pos = 0;
            }
            track.style.transform = `translateX(${-pos}px)`;
        }
        requestAnimationFrame(animateMarquee);
    }
    requestAnimationFrame(animateMarquee);
}

// Run On Load
document.addEventListener('DOMContentLoaded', () => {
    initThemeEngine();
    initCambodiaClock();
    initUserSession();
    updateLiveKPICounters();
    initQuickMarquee();
});

'''
