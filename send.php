<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "lemoakorede@gmail.com"; // Change this to your Gmail
    $subject = "New Booking Request";

    // Collect data
    $booking_id     = uniqid("BK-");
    $booking_time   = $_POST["booking_time"];
    $location_type  = $_POST["location_type"];
    $massage_type   = $_POST["massage_type"];
    $client_location = $_POST["client_location"];
    $preferred_name = $_POST["preferred_name"];
    $meeting_point  = $_POST["meeting_point"];
    $law_enforcement = $_POST["law_enforcement"];
    $disease         = $_POST["disease"];
    $payment_method  = $_POST["payment_method"];

    // Format the message
    $message = "Booking ID: $booking_id\n";
    $message .= "Time: $booking_time\n";
    $message .= "Location Type: $location_type\n";
    $message .= "Massage Type: $massage_type\n";
    $message .= "Client Location: $client_location\n";
    $message .= "Preferred Name: $preferred_name\n";
    $message .= "Meeting Point: $meeting_point\n";
    $message .= "Affiliated with Law Enforcement: $law_enforcement\n";
    $message .= "Any Disease: $disease\n";
    $message .= "Payment Method: $payment_method\n";

    // Send email
    $headers = "From: noreply@graceytherapy.vercel.app"; // You can customize
    if (mail($to, $subject, $message, $headers)) {
        // Redirect with booking ID
        header("Location: thank-you.html?booking_id=" . $booking_id);
        exit();
    } else {
        echo "Error sending email.";
    }
} else {
    echo "Invalid request.";
}
?>
