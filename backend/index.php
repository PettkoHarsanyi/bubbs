<?php
header("Access-Control-Allow-Origin: *");
$json = file_get_contents('players.json');

echo $json;

?>