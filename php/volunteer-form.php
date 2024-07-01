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
    $dateOfBirth = sanitize_input($_POST['dateOfBirth']);
    $country = sanitize_input($_POST['country']);
    $city = sanitize_input($_POST['city']);
    $message = sanitize_input($_POST['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format";
        exit;
    }

    $to = "admin@iltizamarelief.com";
    $fullPhoneNumber = $phoneCode . ' ' . $phoneNumber;
    $emailSubject = "Volunteer form";
    $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nPhone Number: $fullPhoneNumber\nDate of Birth: $dateOfBirth\nCountry: $country\nCity: $city\n\nMessage:\n$message";

    $headers = "From: $email";
    
    // Clean the headers and subject to prevent header injection
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
