<?php
include 'config.php';

$headers = array(  
 "X-Parse-Application-Id: " . $appid,
 "X-Parse-REST-API-Key: " . $apikey,
 "Content-Type: image/jpeg"

);

  $post = file_get_contents('php://input');
  $data = base64_decode($post);
$im = imagecreatefromstring($data);
// Get new dimensions
list($width, $height) = getimagesize($im);
$new_width = 100;
$new_height = 100;

// Resample
$image_p = imagecreatetruecolor(100, 100);
// $image = imagecreatefromjpeg($im);
imagecopyresampled($image_p, $im, 0, 0, 0, 0, 100, 100, $width, $height);
// imagejpeg($image_p, null, 85);

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