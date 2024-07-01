<?php
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = sanitize_input($_POST['firstName']);
    $lastName = sanitize_input($_POST['lastName']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phoneCode = sanitize_input($_POST['phoneCode']);
    $phoneNumber = sanitize_input($_POST['phoneNumber']);
    $subject = sanitize_input($_POST['subject']);
    $message = sanitize_input($_POST['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format";
        exit;
    }

    $to = "admin@iltizamarelief.com";
    $fullPhoneNumber = $phoneCode . ' ' . $phoneNumber;
    $emailSubject = "Contact Form Submission: $subject";
    $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nPhone Number: $fullPhoneNumber\n\nMessage:\n$message";

    $headers = "From: $email";
    
    $headers = str_replace(["\r", "\n"], '', $headers);
    $emailSubject = str_replace(["\r", "\n"], '', $emailSubject);

    if (mail($to, $emailSubject, $body, $headers)) {
        echo "success";
    } else {
        http_response_code(500);
        echo "error";
    }
}
?>
