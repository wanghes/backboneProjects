<?php
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin:'.$origin);
header("Access-Control-Allow-Headers:Set-Cookie, Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Method:POST,GET,PUT,DELETE");
header('Access-Control-Allow-Credentials:true');
header('Content-type: application/json');

session_start();
/*if(empty($_COOKIE['token'])){
    exit(json_encode(array('status'=>false,'msg'=>'没有获取到用户信息')));
}*/

$dbname = "demo";
$host = 'localhost';
$user = 'root';
$password = 'yinrenlei00';
try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $dbh->exec("SET CHARACTER SET utf8");
    $sql = "select * from food";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    exit(json_encode(array('status'=>true,'data'=>$stmt->fetchAll(PDO::FETCH_ASSOC))));
}
catch(PDOException $e) {
    echo $e->getMessage();
}

