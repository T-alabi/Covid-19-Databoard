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


if(isset($_POST['action2'])){
    $action2 = $_POST['action2'];//i dont think this var is used again
    $caseAvg = $_POST['caseAvg'];
    $deathAvg = $_POST['deathAvg'];

    $query = " select uid, login, AvgCases, avgDeaths, dateAndTime from User_Setting s where s.uid = (select d.uid from datamining.DV_User d where d.login ='" . $_COOKIE['username']. "');    ";
    //if user is in here then they have settings, UPDATE THEM
    $result = mysqli_query($con, $query);
    $dataArr = array();
    $uid = 0;
    $message = "";
    if ($result) {
        if(mysqli_num_rows($result) > 0){
            //this user already has settings lets UPDATE THEM
            $updateQuery = "update User_Setting set AvgCases =".$caseAvg. ",". "avgDeaths=".$deathAvg .", dateAndTime = CURRENT_TIMESTAMP;";
            $updateResult = mysqli_query($con, $updateQuery);
            if($updateResult ){
                if(mysqli_affected_rows($con) >0){
                $message = "Your preferences for avgCases and avgDeaths has been updated.";
                echo json_encode($message);

                }
                
            }
        }else{
            //create the query that will insert into table;
            //if the user ISNT in here, then they dont have settings INSERT THEM
            $getmoreinfo = " select uid from datamining.DV_User where login = '". $_COOKIE['username'] ."' ;";
            $result2 = mysqli_query($con, $getmoreinfo);
            if($result2){
                if(mysqli_num_rows($result2) > 0){
                    while($row = mysqli_fetch_assoc($result2)){
                        $uid = $row['uid'];
                    }
                } else{
                    $message =  'new data on user not gotten';
                }
                //back to inserting some data
                $insert = " insert into User_Setting values (" . $uid. ",'". $_COOKIE['username']."',". $caseAvg. ",". $deathAvg. ",  CURRENT_TIMESTAMP ); ";
                $inserting = mysqli_query($con, $insert);
                if($inserting){
                    $message = "Your Values for Case number and death number have been saved";
                }else{
                    $message =  "nothing inserted, query failed";
                }
            }else{
                $message =  ' query failed';
            }

           while($row  = mysqli_fetch_array($result)) {
            $dataArr[] = $row;
            if($row>0){
            }
           }
           echo json_encode($message);
        }
    }else {
        echo json_encode(array('error' => "there was an error"));        
    }

}
}
?>