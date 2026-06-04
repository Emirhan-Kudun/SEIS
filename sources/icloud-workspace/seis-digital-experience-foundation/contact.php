<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_text(string $value): string
{
    $value = trim($value);
    $value = strip_tags($value);
    return preg_replace('/[\r\n]+/', ' ', $value) ?? '';
}

function clean_message(string $value): string
{
    $value = trim($value);
    $value = strip_tags($value);
    return preg_replace("/\r\n|\r|\n/", "\n", $value) ?? '';
}

if (!empty($_POST['_gotcha'] ?? '')) {
    echo json_encode(['ok' => true, 'message' => 'Spam ignored'], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = clean_text($_POST['name'] ?? '');
$email = clean_text($_POST['email'] ?? '');
$service = clean_text($_POST['service'] ?? 'Belirtilmedi');
$message = clean_message($_POST['message'] ?? '');

$minMessageLength = 12;
$maxNameLength = 100;
$maxEmailLength = 190;
$maxServiceLength = 80;
$maxMessageLength = 3500;

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Required fields are missing'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Invalid email'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (
    mb_strlen($name) > $maxNameLength ||
    mb_strlen($email) > $maxEmailLength ||
    mb_strlen($service) > $maxServiceLength ||
    mb_strlen($message) < $minMessageLength ||
    mb_strlen($message) > $maxMessageLength
) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Required fields are missing'], JSON_UNESCAPED_UNICODE);
    exit;
}

$to = trim((string) getenv('CONTACT_TO'));
if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    $to = 'emirhankudun@gmail.com';
}
$subject = 'Emirhan Kudun Portfolio - Yeni Mesaj';

$body = "Yeni portfolio mesaji\n\n";
$body .= "Ad Soyad: {$name}\n";
$body .= "E-posta: {$email}\n";
$body .= "Hizmet: {$service}\n\n";
$body .= "Mesaj:\n{$message}\n";

$host = strtolower(trim((string) ($_SERVER['HTTP_HOST'] ?? 'emirhankudun.com')));
$host = preg_replace('/:\d+$/', '', $host) ?? 'emirhankudun.com';
$domain = preg_replace('/^www\./', '', $host) ?? 'emirhankudun.com';
if (!preg_match('/^[a-z0-9.-]+$/', $domain)) {
    $domain = 'emirhankudun.com';
}
$from = 'no-reply@' . $domain;

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Emirhan Kudun Portfolio <' . $from . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Mail could not be sent'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Message sent'], JSON_UNESCAPED_UNICODE);
