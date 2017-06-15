<?php
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$url = isset($_POST['url']) ? htmlspecialchars($_POST['url']) : '';
echo 'Name: ' . $name;
echo "\n";
echo 'Website: ' .$url;
?>