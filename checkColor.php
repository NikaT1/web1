<?php
session_start();
$color = 'light';
if (isset($_SESSION['color'])) {
    $color = $_SESSION['color'];
}
echo $color;