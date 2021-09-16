<?php
/*
function checkY($y) {
            $MAX = 3;
            $MIN = -5;
            if (!isset($y)) return false;
            $line = str_replace(",", ".", $y);
            return (!is_numeric($line) && $line > $MIN && $line < $MAX);
        }

function checkX($x) {
    return isset($x);
}

function checkR($r) {
    return isset($r);
}*/

$start = microtime(true);
function rectangle($x, $y, $r) {
    if ($x >= 0 && $x <= $r && $y >=0 && $y <= $r) {
        return true;
    }
    else return false;
}

function triangle($x, $y, $r) {
    if ($x <= 0 && $x >= -$r/2 && $y <=0 && $y >= -$x-$r/2) {
        return true;
    }
    else return false;
}

function circle($x, $y, $r) {
    if ($x <= 0 && $x >= -$r/2 && $y >=0 && $y*$y <= -$x*$x+$r*$r) {
        return true;
    }
    else return false;
}

$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];
$timeZone = $_GET['time'];
$answer = 'нет';
if (rectangle($x, $y, $r) || triangle($x, $y, $r) || circle($x, $y, $r)) {
    $answer = "да";
}

$datetime = getdate();
$sec = time() - $timeZone * 60;
$time = date('H:i:s', $sec);
$finish = microtime(true);
$scriptTime = round(($finish - $start)*1000,2);
$json = "{" .
"\"time\":\"$time\"," .
"\"scriptTime\":\"$scriptTime\"," .
"\"x\":\"$x\"," .
"\"y\":\"$y\"," .
"\"r\":\"$r\"," .
"\"answer\":\"$answer\"" .
"}";

echo $json;