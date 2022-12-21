<?php
session_start();
function checkY($y)
{
    $MAX = 3;
    $MIN = -5;
    if (!isset($y)) return false;
    $line = str_replace(",", ".", $y);
    return (is_numeric($line) && $line > $MIN && $line < $MAX);
}

function checkX($x)
{
    $xArray = array(-3, -2, -1, 0, 1, 2, 3, 4, 5);
    return isset($x) && is_numeric($x) && in_array($x, $xArray);
}

function checkR($r)
{
    $rArray = array(1, 2, 3, 4, 5);
    return isset($r) && is_numeric($r) && in_array($r, $rArray);
}

$start = microtime(true);
function rectangle($x, $y, $r)
{
    if ($x >= 0 && $x <= $r && $y >= 0 && $y <= $r) {
        return true;
    } else return false;
}

function triangle($x, $y, $r)
{
    if ($x <= 0 && $x >= -$r / 2 && $y <= 0 && $y >= -$x - $r / 2) {
        return true;
    } else return false;
}

function circle($x, $y, $r)
{
    if ($x <= 0 && $x >= -$r && $y >= 0 && $y * $y <= -$x * $x + $r * $r) {
        return true;
    } else return false;
}

$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];
$timeZone = $_GET['time'];
$answer = 'нет';
$isValid = 'нет';
if (checkR($r) && checkY($y) && checkX($x)) {
    $isValid = 'да';
    if (rectangle($x, $y, $r) || triangle($x, $y, $r) || circle($x, $y, $r)) {
        $answer = "да";
    }
}

$datetime = getdate();
$sec = time() - $timeZone * 60;
$time = date('H:i:s', $sec);
$finish = microtime(true);
$scriptTime = round(($finish - $start) * 1000, 2);
$json = "{" .
    "\"isValid\":\"$isValid\"," .
    "\"time\":\"$time\"," .
    "\"scriptTime\":\"$scriptTime\"," .
    "\"x\":\"$x\"," .
    "\"y\":\"$y\"," .
    "\"r\":\"$r\"," .
    "\"answer\":\"$answer\"" .
    "}";
if (!isset($_SESSION['json'])) {
    $_SESSION['json'] = array();
}
if ($isValid) array_push($_SESSION['json'], $json);
echo $json;