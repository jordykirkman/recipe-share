<?php

include 'config.php';

  $recipe = $_POST['recipe'];
  $book = $_POST['book'];

  $session = getallheaders()['X-Parse-Session-Token'];
  // $apikey = ini_get('api_key');

  $headers = array(  
    "X-Parse-Application-Id: " . $appid,
    "X-Parse-REST-API-Key: " . $apikey,
    "X-Parse-Session-Token: " . $session,
    "Content-Type: application/json"
  );

  $payload = '{"recipes":{"__op":"AddUnique","objects":["' . $recipe . '"]}}';

  $ch = curl_init("https://api.parse.com/1/classes/Book/" . $book);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

  $data = curl_exec($ch);
  // curl_close($ch);

  // set response header for the app
  $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  header(':', true, $http_status);

  if (property_exists(json_decode($data), 'error')) {

    $response = array(
      "errors" => array("book" => array(json_decode($data)->error))
    );

    echo json_encode($response);

  } else {

    echo $data;

  }


?>