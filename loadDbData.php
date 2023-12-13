<?php
// my DB connection
include "dbconfig.php";
$con = mysqli_connect($host, $username, $password, $dbname)
    or die("<br>Cannot connect to DB: $dbname on $host\n, error" . mysqli_connect_error());

    $cookie_name = "username";
    if(!isset($_COOKIE[$cookie_name])) {
    echo json_encode(array('error' =>"Please sign in first before trying to load Database data!"));
    } else {
        $DBQuery1 = "select Date, County, State, fips, caseNum from CountyTotals;";//case num
        //crimes 2019
        $DBQuery2 = "select Date, County, State, fips, deathNum from CountyTotalsDeaths;";
    //crimes 2020
        if(isset($_POST['action'])){
            $action = $_POST['action'];
                if($action == 'loadDBData1'){
                    $query = $DBQuery1;
                } else if($action =='loadDBData2'){
                    $query = $DBQuery2;
                }
        }
    $result = mysqli_query($con, $query);
        $dataArr = array();

    if ($result) {
        if ($result) {
           while($row  = mysqli_fetch_array($result)) {
            $dataArr[] = $row;
           }
           echo json_encode($dataArr);
        }
    }else {
        echo json_encode(array('error' => "there was an error"));        
    }

    }
?>