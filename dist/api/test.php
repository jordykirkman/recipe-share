<?php

// $appid = ini_get('application_id');
// $apikey = ini_get('api_key');

//  $headers = array(  
//    "X-Parse-Application-Id: $appid",
//    "X-Parse-REST-API-Key: $apikey",
//    "Content-Type: application/json"
//  );


//     $ch = curl_init("https://api.parse.com/1/classes/Recipe");
//     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//     curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_POST, 1);
//     curl_setopt($ch, CURLOPT_POSTFIELDS, '{"Ingredients":"yum"}');

//    	$data = curl_exec($ch);
//     // curl_close($ch);
//     echo $data;

echo "hi";

$x = json_decode('{"book":{"name":"book name","description":null,"users":["KLv4JMEdr1"],"recipes":[]}}');

  $userlist = array();
  if($x->book->users){
      foreach($x->book->users as $key => $val){
          array_push($userlist, $val);
      }
  }
  $payload = array(
    'name' => $x->book->name,
    'description' => $x->book->description->name,
    'users' => $userlist
  );
  var_dump($payload);

?>