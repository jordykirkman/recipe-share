<?php
include 'config.php';

$headers = array(  
 "X-Parse-Application-Id: " . $appid,
 "X-Parse-REST-API-Key: " . $apikey,
 "Content-Type: image/jpeg"

);

  $post = file_get_contents('php://input');

  $ch = curl_init("https://api.parse.com/1/files/pic.jpg");
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

  $data = curl_exec($ch);
  
  curl_close($ch);

  echo json_decode($data)->url;

?>