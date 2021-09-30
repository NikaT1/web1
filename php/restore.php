<?php
session_start();
$res = "[";
if (isset($_SESSION['json'])) {
    foreach ($_SESSION['json'] as $result) {
        $res .= $result;
        $res .= ",";
    }
    if (strcmp(substr($res,strlen($res)),",")) {
        $res = substr($res, 0, -1);
    }
}
$res .= "]";
echo $res;

