<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['first-name'] ?? '';
    $lastName  = $_POST['last-name'] ?? '';
    $phone     = $_POST['tel'] ?? '';
    $_SESSION['teacher'] = [
        'name' => trim($firstName . ' ' . $lastName),
        'phone' => $phone,
        'logged_in' => true
    ];
    header('Location: login/teacher_login.html?registered=1');
    exit;
}
if (!empty($_GET['phone'])) {
    header('Location: login/teacher_login.html?registered=1&phone=' . urlencode($_GET['phone']));
    exit;
}
?>
<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ចុះឈ្មោះគ្រូបង្រៀន - ប្រព័ន្ធគ្រប់គ្រងថ្នាក់រៀន</title>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Kantumruy Pro', sans-serif;
            background: radial-gradient(720px 420px at 100% -10%, rgba(124,45,190,0.16), transparent 60%), #F1ECF9;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
        }
        .success-card {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 45px -20px rgba(46,8,84,0.28);
            max-width: 440px;
            width: 100%;
            padding: 40px 30px;
            text-align: center;
        }
        .icon-circle {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: #e8f5e9;
            color: #2e7d32;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            margin: 0 auto 20px;
            box-shadow: 0 8px 20px rgba(46, 125, 50, 0.2);
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn {
            0% { transform: scale(0.6); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        h2 { color: #2E0854; font-size: 1.35rem; margin: 0 0 10px; font-weight: 700; }
        p { color: #666; font-size: 0.95rem; line-height: 1.6; margin: 0 0 24px; }
        .btn-continue {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
            box-sizing: border-box; background: linear-gradient(135deg, #7C2DBE, #2E0854);
            color: #fff; padding: 14px 20px; border-radius: 12px; text-decoration: none;
            font-weight: 700; font-size: 1rem; box-shadow: 0 10px 22px rgba(91, 21, 150, 0.35); transition: 0.2s;
        }
        .btn-continue:hover { transform: translateY(-2px); box-shadow: 0 14px 26px rgba(91, 21, 150, 0.45); }
        .timer-info { font-size: 0.82rem; color: #888; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="success-card">
        <div class="icon-circle"><i class="fas fa-check"></i></div>
        <h2>ចុះឈ្មោះបានជោគជ័យ!</h2>
        <p>ព័ត៌មានគណនីគ្រូបង្រៀនត្រូវបានរក្សាទុករួចរាល់។ លោកគ្រូ អ្នកគ្រូ អាចចូលប្រើប្រាស់ប្រព័ន្ធបានឥឡូវនេះ។</p>
        <a href="login/teacher_login.html?registered=1" class="btn-continue">
            <i class="fas fa-sign-in-alt"></i> ចូលប្រើប្រាស់ប្រព័ន្ធ
        </a>
        <div class="timer-info">
            <i class="fas fa-spinner fa-spin"></i> កំពុងបញ្ជូនបន្តក្នុងរយៈពេល ២ វិនាទី...
        </div>
    </div>
    <script>
        localStorage.setItem('cms_registered', 'true');
        setTimeout(function() {
            window.location.href = 'login/teacher_login.html?registered=1';
        }, 1800);
    </script>
</body>
</html>
