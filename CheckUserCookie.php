<?php
// my DB connection
include "dbconfig.php";
$con = mysqli_connect($host, $username, $password, $dbname)
    or die("<br>Cannot connect to DB: $dbname on $host\n, error" . mysqli_connect_error());

    $cookie_name = "username";
    if(!isset($_COOKIE[$cookie_name])) {
    echo "Cookie named '" . $cookie_name . "' does not exist!";
    } else {

    $query = "select uid, login, name, gender from datamining.DV_User where login='" . $_COOKIE[$cookie_name] . "';";;
    $result = mysqli_query($con, $query);

    $output = "";

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $output = "<p> User ID: ". $row["uid"] ."</br> Login: " . $row['login'] . "</br> Name: " .$row['name'] . "</br> Gender: " . $row['gender'] . "</p>";
                echo $output;
            }
        }
    }else {
        // user doesnt exist, but we dont want to share that!
        $output = "<p> User doesnt exist</p>";
        echo $output;
    }

    }

?>