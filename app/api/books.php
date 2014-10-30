<?php
include 'config.php';

$headers = array(  
 "X-Parse-Application-Id: " . $appid,
 "X-Parse-REST-API-Key: " . $apikey,
 "Content-Type: application/json"
);

if( !isset($_GET['id']) && isset(json_decode(file_get_contents('php://input'))->book) ){

  // --------------------
  // create a new book
  // --------------------

  $book = json_decode(file_get_contents('php://input'));

  // add users to the list
  $userlist = array();
  if($book->book->users){
      foreach($book->book->users as $key => $val){
          array_push($userlist, $val);
      }
  }
  $payload = array(
    'name' => $book->book->name,
    'description' => $book->book->description->name,
    'users' => $userlist
  );

  $ch = curl_init("https://api.parse.com/1/classes/Book");
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

  $data = json_decode(curl_exec($ch));
  curl_close($ch);

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

} else if( $_SERVER['REQUEST_METHOD'] == 'PUT' ){

  $book = json_decode(file_get_contents('php://input'));
  $userlist = array();
  if($book->book->users){
      foreach($book->book->users as $key => $val){
          array_push($userlist, $val);
      }
  }
  $recipelist = array();
  if($book->book->recipes){
      foreach($book->book->recipes as $key => $val){
          array_push($recipelist, $val);
      }
  }
  $payload = array(
    'name' => $book->book->name,
    'description' => $book->book->description->name,
    'users' => $userlist,
    'recipes' => $recipelist
  );
  
  // $payload = '{"recipes":{"__op":"AddUnique","objects":["' . $recipe . '"]}}';

  $ch = curl_init("https://api.parse.com/1/classes/Book/" . $_GET['id']);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

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

} else if($_GET['id']){

  $ch = curl_init("https://api.parse.com/1/classes/Book/" . $_GET['id']);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 0);
  curl_setopt($ch, CURLOPT_HTTPGET, true);

  $data = json_decode(curl_exec($ch));
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
    $data->id = $data->objectId;
    echo json_encode($data);
  }

} else {

  // --------------------
  // fetch a list of books by id
  // --------------------

  $ids = $_GET;
  $stringarray = '';
  if(isset($ids)){
      foreach($ids as $key => $val){
          $comma = $key == 0 ? '' : ', ';
          $stringarray .= $comma . '{"objectId":"' . $val . '"}';
      }
  }

  $params = urlencode('where={"$or":[' . $stringarray . ']}');

  $ch = curl_init("https://api.parse.com/1/classes/Book?" . $params);
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