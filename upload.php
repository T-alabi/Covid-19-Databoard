<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if the file is a CSV file
    if ($fileType !== "csv") {
        echo "The data is in the wrong format. Only CSV files can be loaded!";
        $uploadOk = 0;
    }


    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            $csvData = file_get_contents($target_file); // Read CSV data
            $csvRows = explode("\n", $csvData);
            //$headers = str_getcsv(array_shift($csvRows));

            $data = array();
            foreach ($csvRows as $csvRow) {
                $data[] = str_getcsv($csvRow);
            }


            // Convert the $data array to JSON and send it as a response
            header("Content-Type: application/json");
            echo json_encode($data);
           
        }

        

    }

}
?>
