<?php

include 'config.php';

  $book = $_POST['book'];
  $shared = $_POST['shared'];
  $user = $_POST['user'];

  $session = getallheaders()['X-Parse-Session-Token'];
  // $apikey = ini_get('api_key');

  $headers = array(  
    "X-Parse-Application-Id: " . $appid,
    "X-Parse-REST-API-Key: " . $apikey,
    "X-Parse-Session-Token: " . $session,
    "Content-Type: application/json"
  );

if($book){

  $payload = '{"books":{"__op":"AddUnique","objects":["' . $book . '"]}}';

  $ch = curl_init("https://api.parse.com/1/users/" . $user);
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
      "errors" => array("user" => array(json_decode($data)->error))
    );

    echo json_encode($response);

  } else {

    echo $data;

  }

} else if($shared) {

  $payload = '{"sharedBooks":{"__op":"AddUnique","objects":["' . $shared . '"]}}';

  $ch = curl_init("https://api.parse.com/1/users/" . $user);
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
      "errors" => array("user" => array(json_decode($data)->error))
    );

    echo json_encode($response);

  } else {

    echo $data;

  }

}

?>