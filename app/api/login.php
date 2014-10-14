<?php

include 'config.php';

$headers = array(  
 "X-Parse-Application-Id: " . $appid,
 "X-Parse-REST-API-Key: " . $apikey,
 "Content-Type: application/json"
);

  $username = $_GET['username'];
  $password = $_GET['password'];

  $p = urlencode("password=" . $password);
  $u = urlencode("username=" . $username);

  $ch = curl_init("https://api.parse.com/1/login?username=" . $username . "&password=" . $password . "&include=Books");
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 0);
  curl_setopt($ch, CURLOPT_HTTPGET, true);

  $data = curl_exec($ch);
  // curl_close($ch);

  // set response header for the app
  $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  header(':', true, $http_status);

  if (property_exists(json_decode($data), 'error')) {

    $response = array(
      "errors" => array("user" => array(json_decode($data)->error))
    );
    echo json_encode($response);
  } else {

    echo $data;
  }

?>