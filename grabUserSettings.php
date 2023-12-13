<?php
// my DB connection
include "dbconfig.php";
$con = mysqli_connect($host, $username, $password, $dbname)
    or die("<br>Cannot connect to DB: $dbname on $host\n, error" . mysqli_connect_error());

//used for USER SETTING EDITING!
$cookie_name = "username";
if(!isset($_COOKIE[$cookie_name])){
    echo json_encode(array('error' =>"Please sign in first before trying to load Database data!"));
} else{
    $caseAvg = 0;
    $deathAvg = 0;
    $query = "select Avgcases, avgDeaths from User_Setting where login='".$_COOKIE[$cookie_name]."';";

    $result = mysqli_query($con, $query);
    if($result ){
        if(mysqli_num_rows($result)>0){
             //then we have settings for them
            while($row = mysqli_fetch_assoc($result)){
                $caseAvg = $row['Avgcases'];
                $deathAvg = $row['avgDeaths'];
            }
        }
       
    }
    $response = array('value1' => $caseAvg, 'value2' => $deathAvg);
echo json_encode($response);
}
?>