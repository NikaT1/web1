<?php
session_start();
$arrayOfSession = "[";
if (isset($_SESSION['json'])) {
    foreach ($_SESSION['json'] as $result) {
        $arrayOfSession .= $result;
        $arrayOfSession .= ',';
    }
    $arrayOfSession = substr($arrayOfSession, 0, -1);
    $arrayOfSession .= "]";
    echo $arrayOfSession;
} else echo false;

