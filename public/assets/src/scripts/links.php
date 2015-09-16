<?php
    //echo $_GET['link'];
    $url = $_GET['link'];
    header('Location: '.'http://'.$url);
    exit();
?>