<?php
session_start();
session_unset();
session_destroy();
header('Location: index.html');
exit;
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Logging out...</title>
</head>
<body>
    <script>
        localStorage.removeItem('cms_logged_in');
        localStorage.removeItem('cms_current_user');
        window.location.href = 'index.html';
    </script>
</body>
</html>
