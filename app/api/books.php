<?php
include 'config.php';

$headers = array(  
 "X-Parse-Application-Id: " . $appid,
 "X-Parse-REST-API-Key: " . $apikey,
 "Content-Type: application/json"
);

if( isset(json_decode(file_get_contents('php://input'))->book) ){

  $book = json_decode(file_get_contents('php://input'));

  $payload = array(
    'name' => $book->book->name,
    'description' => $book->description->name,
  );

  $ch = curl_init("https://api.parse.com/1/classes/Book");
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

  $data = json_decode(curl_exec($ch));
  curl_close($ch);

  // set response header for the app
  // $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  // header(':', true, $http_status);

  if (property_exists(json_decode($data), 'error')) {

    $response = array(
      "errors" => array("user" => array(json_decode($data)->error))
    );

    echo json_encode($response);
  } else {
    $data->id = $data->objectId;
    $data->name = $payload['name'];
    $data->description = $payload['description'];
    echo json_encode( $data );
  }

} else {

  $ids = $_GET;
  $stringarray = '';
  if(isset($ids)){
      foreach($ids as $key => $val){
          $comma = $key == 0 ? '' : ', ';
          $stringarray .= $comma . '{"objectId":"' . $val . '"}';
      }
  }

  $params = urlencode('where={"$or":[' . $stringarray . '}');

  $ch = curl_init("https://api.parse.com/1/classes/Book?" . json_encode($params));
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