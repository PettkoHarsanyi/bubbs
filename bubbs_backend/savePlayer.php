<?php
$newPlayerName = $_POST['playername'];
$points = $_POST['points'];
$location = $_POST['location'];

$json = file_get_contents('players.json');
$json_data = json_decode($json, true);
$isAlready = false;

foreach ($json_data as &$player) {
    if ($player['name'] == $newPlayerName) {
        $isAlready = true;
        if ($points > $player['points']) {
            $player['points'] = $points;
        }
    }
}

if(!$isAlready){
    array_push($json_data,array("name"=>$newPlayerName, "points"=>$points));
}

$points = array_column($json_data,"points");

array_multisort($points, SORT_DESC, $json_data);

$json_to_file = json_encode($json_data);

file_put_contents("players.json",$json_to_file);
header('Location: ' . $location);
exit;
?>