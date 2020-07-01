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
         $mail->isSMTP();
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
                     <h5>' . $e->getMessage() . '</h5>
                   </div>';
       }
     }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marian Kosaniak</title>
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/menu.css">
    <link rel="stylesheet" href="./css/about.css">
    <link rel="stylesheet" href="./css/portfolio.css">
    <link rel="stylesheet" href="./css/react.css">
    <link rel="stylesheet" href="./css/contact.css">
    <link rel="stylesheet" href="./css/js.css">
</head>
<body>
    <div class="menu" id="menu">
        <ul>
            <li data-text="About me"><a href="#about">About me</a></li>
            <li data-text="Portfolio"><a href="#portfolio">Portfolio</a></li>
            <li data-text="JavaScript examples"><a href="#js">JavaScript examples</a></li>
            <li data-text="React JS"><a href="#react">React JS</a></li>
            <li data-text="Work experience"><a href="#contact">Contact me</a></li>
        </ul>
    </div>

    <div class="about" id="about">
        <a href="#menu" class="goToMenu">&uArr;</a>
        <div class="about__container">
            <img src="../images/handsome.jpg" align="right" width="240px">
            <h2>About me</h2>
            <h3>Full name: Marian Kosaniak</h3>
            <h3>Age: 24</h3>
            <h3>City: Lviv</h3>
            <h3>Phone: +380963983205</h3>
            <h3>Email: kosaniakm@gmail.com</h3>
            <h3>Skype: kosaniakm</h3><br>


            <h2>Educatin</h2><br>
            <h3>Master of Mathematics (2018). Ivan Franko National University. Master of Mathematics (2018).Faculty of Mechanics and Mathematics.</h3><br>

            <h2>Experience</h2>
            <h3>
                <a href="http://www.druzi.biz/#slide-2">IT-ELIT</a><br> Teacher of courses: HTML/CSS, PHP, jQueary, Games(JavaScript, canvas ) by program IT-ELIT.(21.10.2018-30.03.2019)
            </h3>
            <br>
            <h3>
                <a href="http://MarikKV.github.io/StudyLink">Study Link</a><br> Teacher of courses: HTML/CSS (2019- now)
            </h3>
        </div>
    </div>

    <div class="portfolio" id="portfolio">
        
        <h1 align="center">My latest work</h1>
        
        <div class="boxes">

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site7.png" alt="">
                </div>
                
                <div class="content">
                    <a class="content-live" href="/portfolio-site7/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site7">Go on GitHub</a>
                </div>
            </div>

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site8.png" alt="">
                </div>
                
                <div class="content">
                    <a class="content-live" href="/portfolio-site8/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site8">Go on GitHub</a>
                </div>
            </div>

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site1.png" alt="">
                </div>

                <div class="content">
                    <a class="content-live" href="/portfolio-site/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site">Go on GitHub</a>
                </div>
            </div>

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site2.png" alt="">
                </div>
                
                <div class="content">
                    <a class="content-live" href="/portfolio-site2/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site2">Go on GitHub</a>
                </div>
            </div>

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site3.png" alt="">
                </div>
                
                <div class="content">
                    <a class="content-live" href="/portfolio-site3/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site3">Go on GitHub</a>
                </div>
            </div>


            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site5.png" alt="">
                </div>
                
                <div class="content">
                    <a class="content-live" href="/portfolio-site5/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site5">Go on GitHub</a>
                    
                </div>
                <h2>Still working...</h2>
            </div>
        </div>
    </div>

    <div class="js" id="js">
        <h1 align="center">Projects using JavaScript</h1>
        
        <div class="boxes">

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site9.png" alt="">
                </div>
                
                <div class="content">
                    <a class="content-live" href="/portfolio-site9/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/portfolio-site9">Go on GitHub</a>
                </div>
            </div>

            <div class="box">
                <div class="imgBox">
                    <img src="images/sites-examples/site10.png" alt="">
                </div>
                <div class="content">
                    
                    <a class="content-live" href="/js/index.html">Go live</a>
                    <a class="content-git" href="https://github.com/MarikKV/MarikKV.github.io/tree/master/js">Go on GitHub</a>
                </div>
            </div>
        </div>
    </div>

    <div class="react" id="react">
        
        <h1 align="center">Study Link (React JS project)</h1>
        <div class="react-gif">
            <img src="images/SL.gif" alt="">
        </div>
		
		<p class="content" align="center">
            <a class="content-live" href="https://marikkv.github.io/StudyLink">Go live</a>
		</p>
        <p>
            That is my last work on react js. Site for studing courser of web development. Site contain 
        </p>
        <ol>
            <li>Sign In (For teacher, student, admin).</li>
            <li>Admin can create new groups.</li>
            <li>Teacher can add students to each group.</li>
            <li>Teacher can open new teme for students in each group.</li>
            <li>Student able to see temes(tasks, video, materials) that teacher open for students in group.</li>
        </ol>
        <p>
            All data saved on firebase.
        </p>
    </div>

    <div class="contact" id="contact">
        <h1 align="center">Need a Progect?</h1>
        <p  align="center">
            Let me know what you're looking for.
        </p>
        <div class="contact__forForm">
            <form action="#" method="POST">
                <div class="form-group">
                <?= $output; ?>
                </div>
 
                <input type="text" name="name" id="name" class="w-45 mr-10 h-48" placeholder="Your Name">
                <input type="email" name="email" id="email" class="w-45 h-48" placeholder="Your Email">
                <input type="text" name="subject" id="subject" class="w-100 h-48" placeholder="Your Title">
                <textarea name="message" id="message" rows="5" class="form-control w-100 pt-15" placeholder="Your Comment"
                  required></textarea>
                <p align="center"><input type="submit" name="submit" value="SEND MESSAGE"></p>
            </form>
        </div>
    </div>
</body>
</html>