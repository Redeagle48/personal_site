<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent=" From: $name \n Message: $message";
$recipient = "antoniopereira350@gmail.com";
$subject = "Recebida mensagem pelo site pessoal";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
header("Location: http://www.antoniopedropereira.com");
?>