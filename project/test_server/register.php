<?php
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Method:POST,GET");
header('Access-Control-Allow-Credentials:true');
/*header('Content-type: application/json');*/

$dbname = "demo";
$host = 'localhost';
$user = 'root';
$password = 'yinrenlei00';

//$newVal = $GLOBALS['HTTP_RAW_POST_DATA'];
$newVal = file_get_contents('php://input');
//$newVal = $_REQUEST;
/*print_r($newVal);
exit;*/

$newVal = json_decode($newVal);
$name = $newVal->name;
$age = $newVal->age;
$sex = $newVal->sex;


try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->exec("SET CHARACTER SET utf8");
    $sql = "INSERT INTO userinfo (name, age, sex) VALUES ('$name', $age, $sex)";
    $result= $dbh->exec($sql);

    exit(json_encode(array('status'=>1,'msg'=>'插入数据成功')));


}
catch(PDOException $e) {
    echo $e->getMessage();
}
?>