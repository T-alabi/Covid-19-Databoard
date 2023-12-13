<?php
// Retrieve data from the AJAX request
//CHANGE SEND EMAIL SUBJECT TO USER NAME
include "dbconfig.php";
$con = mysqli_connect($host, $username, $password, $dbname)
    or die("<br>Cannot connect to DB: $dbname on $host\n, error" . mysqli_connect_error());
    $cookie_name = "username";
    if(!isset($_COOKIE[$cookie_name])){
        echo json_encode(array('error' =>"Please sign in first before trying to load Database data!"));
    } else{

    
$data = json_decode(file_get_contents('php://input'), true);

// Get values
$toEmail = $data['toEmail'];
$emailSubject = $data['emailSubject'];

// Set the "From" email address
$fromEmail = 'oalabi@kean.edu';
$usersName = $_COOKIE[$cookie_name];
$emailContent = "User Login: ". $usersName;
$caseAvg = 0;
$deathAvg = 0;//default values
//now lets get user settings and put into vars
$query = "select Avgcases, avgDeaths from User_Setting where login='".$_COOKIE[$cookie_name]."';";

$result = mysqli_query($con, $query);
if($result ){
    if(mysqli_num_rows($result)>0){
         //then we have settings for them
        while($row = mysqli_fetch_assoc($result)){
            $message = "Inside while loop";
            $caseAvg = $row['Avgcases'];
            $deathAvg = $row['avgDeaths'];
            $emailContent  = $emailContent . " Average Cases: ". $caseAvg . " Death Average: " . $deathAvg;
        }
    } else{
        $emailContent = $emailContent . 'There was no result, user has no settings';
    }
   
}

// Additional headers
$headers = "From: $fromEmail\r\n";
$headers .= "Reply-To: $fromEmail\r\n";
$headers .= "Content-Type: text/html\r\n";

// Your email sending logic
// Note: You might want to include some content here

if (mail($toEmail, $emailSubject, $emailContent, $headers)) {
    echo json_encode(['message' => 'Email sent successfully']);
} else {
    echo json_encode(['error' => 'Failed to send email']);
    }
}
?>
