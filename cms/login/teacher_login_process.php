<?php
session_start();

$raw = file_get_contents('php://input');
$json = json_decode($raw, true);

if ($json && isset($json['face_login'])) {
    header('Content-Type: application/json; charset=utf-8');
    $_SESSION['teacher'] = [
        'name' => 'លោកគ្រូ / អ្នកគ្រូ',
        'logged_in' => true
    ];
    echo json_encode([
        'success' => true,
        'message' => 'សម្គាល់មុខបានជោគជ័យ!',
        'redirect' => '../index.html'
    ]);
    exit;
}

if ($json && isset($json['face_login_select'])) {
    header('Content-Type: application/json; charset=utf-8');
    $_SESSION['teacher'] = [
        'name' => 'លោកគ្រូ / អ្នកគ្រូ',
        'teacher_id' => $json['teacher_id'] ?? 1,
        'logged_in' => true
    ];
    echo json_encode([
        'success' => true,
        'message' => 'ជោគជ័យ!',
        'redirect' => '../index.html'
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = $_POST['phone-number'] ?? '';
    $_SESSION['teacher'] = [
        'name' => 'លោកគ្រូ / អ្នកគ្រូ',
        'phone' => $phone,
        'logged_in' => true
    ];
    header('Location: ../index.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ចូលប្រើប្រាស់ប្រព័ន្ធ - កំពុងដំណើរការ...</title>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Kantumruy+Pro:wght@400;500;600;700;800&family=Moul&family=Noto+Sans+Khmer:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Kantumruy Pro', sans-serif;
            background: #f0f2f5;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .box {
            background: #fff;
            padding: 35px 25px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        .icon { font-size: 42px; color: #651199; margin-bottom: 14px; }
        h3 { color: #651199; margin: 0 0 10px; }
        p { color: #555; font-size: 0.95rem; }
    </style>
</head>
<body>
    <div class="box">
        <div class="icon"><i class="fas fa-spinner fa-spin"></i></div>
        <h3>កំពុងចូលប្រើប្រាស់...</h3>
        <p>សូមរង់ចាំមួយភ្លែត ប្រព័ន្ធកំពុងផ្ទៀងផ្ទាត់ទិន្នន័យ...</p>
    </div>
    <script>
        localStorage.setItem('cms_logged_in', 'true');
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 800);
    </script>
</body>
</html>
