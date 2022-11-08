<?php

    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "data";

    $conn = new mysqli($server, $username, $password, $dbname);

    if($conn->connect_error){
        die("Connection Failed".$conn->connect_error);
    }

    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $dob = $_POST['dob'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $pswd = $_POST['password'];

    $sql = "SELECT email FROM user_login";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->get_result();
    while($data = $result->fetch_assoc()){
        if($data['email']==$email){
            echo false;
            exit;
        }
    }
    
    $sql = "INSERT INTO user_login(email, pswd) VALUES(?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss",$email, $pswd);
    $stmt->execute();
    echo true;

    //connecting mongodb to store the profile data
    //$mongo = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    

?>