<?php
$dbname = "demo";
$host = 'localhost';
$user = 'root';
$password = 'yinrenlei00';
try {

    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $dbh->exec("SET CHARACTER SET utf8");
    $sql = "SELECT * FROM `food`";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    exit(json_encode($stmt->fetchAll(PDO::FETCH_ASSOC)));

}
catch(PDOException $e) {
    echo $e->getMessage();
}


?>