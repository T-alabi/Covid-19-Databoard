<?php
// my DB connection
include "dbconfig.php";
$con = mysqli_connect($host, $username, $password, $dbname)
    or die("<br>Cannot connect to DB: $dbname on $host\n, error" . mysqli_connect_error());

if (isset($_POST['uname']) && isset($_POST['pword'])) {
    $username = $_POST['uname'];
    $password = $_POST['pword'];
}

$query = "select uid, login, password, name, gender from datamining.DV_User where login='" . $username . "';";

$result = mysqli_query($con, $query);

$output = ""; // Initialize $output with an empty string


if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['password'] != $password ) {
                $output = "The Username or Password is Incorrect, try again";
            } else {
                $output = "Successful Login! Welcome " . $row['name'];

                // Save user info in a cookie
                setcookie("username", $username, time() + 3600); // You can customize the expiration time
                
            }
        }
    } else {
        // user doesnt exist, but we dont want to share that!
        $output = "<p> The Username or Password is Incorrect, try again</p>";
    }

    //echo $output;
    echo "<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Reference the main page using window.opener
        var mainPage = window.opener;

        // Update the content on the main page
        mainPage.document.getElementById('DBLoginDisplay').textContent = '$output';

        // Close the popup
        window.close();
    });
</script>";

    
} else {
    echo "Query failed: " . mysqli_error($con);
}


?>