<?php
header("Access-Control-Allow-Origin: *");
$dbname = "demo";
$host = 'localhost';
$user = 'root';
$password = 'yinrenlei00';
$id = $_GET['id'];
try {

    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $dbh->exec("SET CHARACTER SET utf8");
    $sql = "SELECT * FROM `food` where id=$id";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    sleep(1);
    exit(json_encode($stmt->fetchAll(PDO::FETCH_ASSOC)));

}
catch(PDOException $e) {
    echo $e->getMessage();
}


echo $id;

?>