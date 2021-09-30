<?php
session_start();
if (isset($_SESSION['json'])) {
    unset($_SESSION['json']);
}