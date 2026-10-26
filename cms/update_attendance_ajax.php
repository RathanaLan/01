<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$studentId = $_POST['student_id'] ?? '';
$status = $_POST['status'] ?? '';

echo json_encode([
    'success' => true,
    'student_id' => $studentId,
    'status' => $status,
    'message' => 'បានរក្សាទុកវត្តមានដោយជោគជ័យ'
]);

