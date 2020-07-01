<?php
     use PHPMailer\PHPMailer\PHPMailer;
     use PHPMailer\PHPMailer\Exception;
     
   
     require 'php_mailer/Exception.php';
     require 'php_mailer/PHPMailer.php';
     require 'php_mailer/SMTP.php';
   
     // Include autoload.php file
     require 'vendor/autoload.php';
     // Create object of PHPMailer class
     $mail = new PHPMailer(true);
   
     $output = '';
   
     if (isset($_POST['submit'])) {
       $name = $_POST['name'];
       $email = $_POST['email'];
       $subject = $_POST['subject'];
       $message = $_POST['message'];
   
       try {
         $mail->Host = 'smtp.gmail.com';
         $mail->SMTPAuth = true;
         // Gmail ID which you want to use as SMTP server
         $mail->Username = 'mariktestmail@gmail.com';
         // Gmail Password
         $mail->Password = 'Q1W2E3qwe';
         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
         $mail->Port = 587;
   
         // Email ID from which you want to send the email
         $mail->setFrom('mariktestmail@gmail.com');
         // Recipient Email ID where you want to receive emails
         $mail->addAddress('kosaniakm@gmail.com');
   
         $mail->isHTML(true);
         $mail->Subject = 'Form Submission';
         $mail->Body = "<h3>Name : $name <br>Email : $email <br>Message : $message</h3>";
   
         $mail->send();
         $output = '<div class="alert alert-success">
                     <h5>Thankyou! for contacting us, We\'ll get back to you soon!</h5>
                   </div>';
       } catch (Exception $e) {
         $output = '<div class="alert alert-danger">
                    <h5>Error</h5>
                    <h5>' . $e->getMessage() . '</h5>
                   </div>';
       }
     }
?>