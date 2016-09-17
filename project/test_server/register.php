<?php
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin:'.$origin);
header("Access-Control-Allow-Headers:Set-Cookie, Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Method:POST,GET,PUT,DELETE");
header('Access-Control-Allow-Credentials:true');
header('Content-type: application/json');


$dbname = "demo";
$host = 'localhost';
$user = 'root';
$password = 'yinrenlei00';

//$newVal = $GLOBALS['HTTP_RAW_POST_DATA'];
$newVal = file_get_contents('php://input');
//$newVal = $_REQUEST;
/*echo is_string($newVal);
print_r($newVal);
exit;*/

$newVal = json_decode($newVal);
$name = $newVal->name;
$age = $newVal->age;
$sex = $newVal->sex;
$user_password = md5($newVal->password);

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->exec("SET CHARACTER SET utf8");
    $sql = "INSERT INTO userinfo (name, password,age, sex) VALUES ('$name','$user_password', $age, $sex)";
    $result= $dbh->exec($sql);

    exit(json_encode(array('status'=>true,'msg'=>'插入数据成功')));


}
catch(PDOException $e) {
    echo $e->getMessage();
}
?>