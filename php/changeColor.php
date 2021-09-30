<?php
session_start();
$_SESSION['color'] = $_GET['color'];
echo $_GET['color'];