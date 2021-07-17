<?php

header('Content-Type: application/json');
$id=$_GET['id'];

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://jsonplaceholder.typicode.com/albums/".$id."/photos",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json"
  ),
));

$response = curl_exec($curl);

$response=json_decode($response,true);

$res=array();

foreach($response as $item) { 
     array_push($res,array("title"=>$item['title'],"thumbnailUrl"=>$item['thumbnailUrl']));
}

echo json_encode($res);
?>