# -*- coding: utf-8 -*-
"""
Upgrades all standalone subpages to the 2030 Futuristic CMS PRO theme
"""
import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('d:/CMS PRO/students_seed.json', 'r', encoding='utf-8') as f:
    students_json = f.read().strip()

print("Upgrading standalone pages to CMS PRO 2030...")

# 1. student_list.html & student_list.php
student_list_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>បញ្ជីឈ្មោះសិស្ស ៤៥ នាក់ - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>បញ្ជីឈ្មោះសិស្ស (៤៥ នាក់)</span>
                <span class="hologram-chip">CLASS 12A</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
            <a href="add_student.html" class="fast-action-btn btn-glow"><i class="fas fa-plus"></i> បន្ថែមសិស្ស</a>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px;">
        <div class="hero-glass-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                    <input type="text" id="subSearchInput" onkeyup="filterSubList()" placeholder="ស្វែងរកតាមឈ្មោះ ឬអត្តលេខ..." class="form-control-2030" style="width:260px; padding:9px 14px;">
                    <select id="subGenderFilter" onchange="filterSubList()" class="form-control-2030" style="width:140px; padding:9px 10px;">
                        <option value="">ភេទទាំងអស់</option>
                        <option value="ស្រី">ស្រី (Female)</option>
                        <option value="ប្រុស">ប្រុស (Male)</option>
                    </select>
                </div>
                <button onclick="exportSubCSV()" class="fast-action-btn"><i class="fas fa-file-csv"></i> នាំចេញ CSV</button>
            </div>
            <div class="table-responsive-box">
                <table class="cms-table-2030" id="subStdTable">
                    <thead>
                        <tr><th>ល.រ</th><th>អត្តលេខ</th><th>គោត្តនាម-នាម</th><th>ឈ្មោះឡាតាំង</th><th>ភេទ</th><th>ថ្ងៃកំណើត</th><th>ឈាម</th><th>ទូរស័ព្ទ</th><th>អាណាព្យាបាល</th><th>វត្តមាន</th><th>សកម្មភាព</th></tr>
                    </thead>
                    <tbody id="subStdBody"></tbody>
                </table>
            </div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderSubList() {
            const list = getStudents();
            let rows = '';
            list.forEach((s, idx) => {
                const cls = s.status === 'ច្បាប់' ? 'permission' : (s.status === 'អត់ច្បាប់' ? 'absent' : (s.status === 'យឺត' ? 'late' : 'present'));
                rows += `
                    <tr>
                        <td>${idx + 1}</td>
                        <td><strong style="font-family:var(--font-mono); color:var(--neon-cyan);">${s.id}</strong></td>
                        <td><strong>${s.name}</strong></td>
                        <td style="font-family:var(--font-mono); font-size:0.88rem; color:var(--text-secondary);">${s.latin || '-'}</td>
                        <td>${s.gender}</td>
                        <td style="font-family:var(--font-mono);">${s.dob || '-'}</td>
                        <td><span style="font-family:var(--font-mono); color:var(--neon-amber); font-weight:700;">${s.blood || 'O+'}</span></td>
                        <td>${s.phone || '-'}</td>
                        <td style="font-size:0.88rem;">${s.parent || '-'}</td>
                        <td><span class="desk-status-badge ${cls}">${s.status}</span></td>
                        <td>
                            <button onclick="deleteSubStudent('${s.id}')" style="background:rgba(244,63,94,0.15); color:var(--neon-rose); border:1px solid rgba(244,63,94,0.3); padding:4px 8px; border-radius:6px; cursor:pointer;"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById('subStdBody').innerHTML = rows;
        }

        function filterSubList() {
            const q = (document.getElementById('subSearchInput').value || '').toLowerCase();
            const g = document.getElementById('subGenderFilter').value;
            const rows = document.querySelectorAll('#subStdBody tr');
            rows.forEach(r => {
                const text = r.innerText.toLowerCase();
                const matchesQ = !q || text.includes(q);
                const matchesG = !g || text.includes(g.toLowerCase());
                r.style.display = matchesQ && matchesG ? '' : 'none';
            });
        }

        function deleteSubStudent(id) {
            playClickSound();
            if (confirm('តើលោកគ្រូពិតជាចង់លុបសិស្សនេះមែនទេ?')) {
                let list = getStudents().filter(s => s.id !== id);
                saveStudents(list);
                renderSubList();
            }
        }

        function exportSubCSV() {
            exportStudentsCSV();
        }

        document.addEventListener('DOMContentLoaded', renderSubList);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/student_list.html', 'w', encoding='utf-8') as f:
    f.write(student_list_tpl)
with open('d:/CMS PRO/student_list.php', 'w', encoding='utf-8') as f:
    f.write(student_list_tpl)
print("Updated student_list.html/.php")

# 2. attendance.html & attendance.php
attendance_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ចុះវត្តមានតាមប្លង់តុ (៤៥ តុ) - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>ប្លង់តុឆ្លាតវៃ (៥ x ៩ = ៤៥ តុ)</span>
                <span class="hologram-chip">LIVE ATTENDANCE</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
            <button onclick="markAllPresent(); renderAttendancePage();" class="fast-action-btn btn-glow"><i class="fas fa-check-double"></i> វត្តមានទាំងអស់</button>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px;">
        <div class="hero-glass-card">
            <div id="attendancePageBody"></div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderAttendancePage() {
            renderSmartSeatingMatrix(document.getElementById('attendancePageBody'));
        }
        document.addEventListener('DOMContentLoaded', renderAttendancePage);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/attendance.html', 'w', encoding='utf-8') as f:
    f.write(attendance_tpl)
with open('d:/CMS PRO/attendance.php', 'w', encoding='utf-8') as f:
    f.write(attendance_tpl)
print("Updated attendance.html/.php")

# 3. add_score.html & add_score.php
add_score_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>កម្រងពិន្ទុ ៨ មុខវិជ្ជា MoEYS - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>បញ្ចូលពិន្ទុ ៨ មុខវិជ្ជា MoEYS</span>
                <span class="hologram-chip">AUTO GPA</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
            <button onclick="exportGradebookCSV()" class="fast-action-btn"><i class="fas fa-file-csv"></i> នាំចេញ</button>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px;">
        <div class="hero-glass-card">
            <div id="gradebookPageBody"></div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderGradebookPage() {
            renderMoEYSGradebook(document.getElementById('gradebookPageBody'));
        }
        document.addEventListener('DOMContentLoaded', renderGradebookPage);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/add_score.html', 'w', encoding='utf-8') as f:
    f.write(add_score_tpl)
with open('d:/CMS PRO/add_score.php', 'w', encoding='utf-8') as f:
    f.write(add_score_tpl)
print("Updated add_score.html/.php")

# 4. score_list.html & score_list.php
score_list_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>បញ្ជីពិន្ទុ & របាយការណ៍ - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>បញ្ជីពិន្ទុ & របាយការណ៍សរុប</span>
                <span class="hologram-chip">MASTER REPORT</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
            <button onclick="window.print()" class="fast-action-btn btn-glow"><i class="fas fa-print"></i> បោះពុម្ព</button>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px;">
        <div class="hero-glass-card">
            <div id="scoreReportPageBody"></div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderScoreReportPage() {
            renderMasterScoreReport(document.getElementById('scoreReportPageBody'));
        }
        document.addEventListener('DOMContentLoaded', renderScoreReportPage);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/score_list.html', 'w', encoding='utf-8') as f:
    f.write(score_list_tpl)
with open('d:/CMS PRO/score_list.php', 'w', encoding='utf-8') as f:
    f.write(score_list_tpl)
print("Updated score_list.html/.php")

# 5. add_student.html & add_student.php
add_student_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>បញ្ចូលព័ត៌មានសិស្សថ្មី - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>បញ្ចូលព័ត៌មានសិស្សថ្មី</span>
                <span class="hologram-chip">ENROLLMENT</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
            <a href="student_list.html" class="fast-action-btn"><i class="fas fa-users"></i> បញ្ជីសិស្ស</a>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px; max-width:800px;">
        <div class="hero-glass-card">
            <div id="addStudentPageBody"></div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderAddStudentPage() {
            renderAddStudentForm(document.getElementById('addStudentPageBody'));
        }
        document.addEventListener('DOMContentLoaded', renderAddStudentPage);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/add_student.html', 'w', encoding='utf-8') as f:
    f.write(add_student_tpl)
with open('d:/CMS PRO/add_student.php', 'w', encoding='utf-8') as f:
    f.write(add_student_tpl)
print("Updated add_student.html/.php")

# 6. inventory.html & inventory.php
inventory_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>សារពើភ័ណ្ឌបន្ទប់រៀនឆ្លាតវៃ - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>បញ្ជីសារពើភ័ណ្ឌបន្ទប់រៀនឆ្លាតវៃ</span>
                <span class="hologram-chip">SMART ASSETS</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px;">
        <div class="hero-glass-card">
            <div id="inventoryPageBody"></div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderInventoryPage() {
            renderSmartClassInventory(document.getElementById('inventoryPageBody'));
        }
        document.addEventListener('DOMContentLoaded', renderInventoryPage);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/inventory.html', 'w', encoding='utf-8') as f:
    f.write(inventory_tpl)
with open('d:/CMS PRO/inventory.php', 'w', encoding='utf-8') as f:
    f.write(inventory_tpl)
print("Updated inventory.html/.php")

# 7. teacher_profile.html & teacher_profile.php
profile_tpl = '''<!DOCTYPE html>
<html lang="km" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ព័ត៌មានគណនីគ្រូ - CMS PRO 2030</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="home_style.css">
    <script>window.CMS_SEED_STUDENTS = __STUDENTS_JSON__;</script>
</head>
<body style="padding-top: 85px;">
    <div class="cyber-grid-overlay"></div>
    <header class="top-glass-bar">
        <div class="top-left-group">
            <a href="index.html" class="hamburger-btn-2030" title="ត្រឡប់ទៅទំព័រដើម"><i class="fas fa-arrow-left"></i></a>
            <div class="brand-title">
                <span>ព័ត៌មានគណនីគ្រូបង្រៀន</span>
                <span class="hologram-chip">CREDENTIALS</span>
            </div>
        </div>
        <div class="top-right-group">
            <button class="theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>
        </div>
    </header>

    <main class="hero-container" style="margin-top: 10px; max-width:650px;">
        <div class="hero-glass-card">
            <div id="profilePageBody"></div>
        </div>
    </main>

    <script src="script.js"></script>
    <script>
        function renderProfilePage() {
            renderTeacherProfileDetails(document.getElementById('profilePageBody'));
        }
        document.addEventListener('DOMContentLoaded', renderProfilePage);
    </script>
</body>
</html>
'''.replace('__STUDENTS_JSON__', students_json)

with open('d:/CMS PRO/teacher_profile.html', 'w', encoding='utf-8') as f:
    f.write(profile_tpl)
with open('d:/CMS PRO/teacher_profile.php', 'w', encoding='utf-8') as f:
    f.write(profile_tpl)
print("Updated teacher_profile.html/.php")

print("All standalone pages successfully upgraded to 2030 Next-Gen Edition!")

