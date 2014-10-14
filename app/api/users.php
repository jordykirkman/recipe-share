<?php
include 'config.php';

$session = getallheaders()['X-Parse-Session-Token'];

  $headers = array(  
    "X-Parse-Application-Id: " . $appid,
    "X-Parse-REST-API-Key: " . $apikey,
    // "X-Parse-Session-Token: " . $session,
    "Content-Type: application/json"
  );

if(json_decode(file_get_contents('php://input'))->user){
$userVar = json_decode(file_get_contents('php://input'));

  $payload = array(
    'username' => $userVar->user->username,
    'password' => $userVar->user->password,
    'email' => $userVar->user->email
  );

  $ch = curl_init("https://api.parse.com/1/users");
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

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

} else {

  $id = $_GET['id'];

  $ch = curl_init("https://api.parse.com/1/users/" . $id);
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
    echo json_encode($params);
    echo json_encode($response);
  } else {
    echo $data;
  }

}
?>