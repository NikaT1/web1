<?php
session_start();
if (isset($_SESSION['color'])) {
    unset($_SESSION['color']);
}