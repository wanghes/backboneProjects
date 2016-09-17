<?php
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin:'.$origin);
header("Access-Control-Allow-Headers:Set-Cookie, Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Method:POST,GET,PUT,DELETE");
header('Access-Control-Allow-Credentials:true');
header('Content-type: application/json');

$userVal = file_get_contents('php://input');
/*print_r($userVal);
exit;*/
$userVal = json_decode($userVal);
/*print_r($userVal);
exit;*/
$name = $userVal->name;
$user_password = md5($userVal->password);
session_start();


function setToken($userid,$username,$pwd){
	return MD5($userid.$username.$pwd);
}

try{
	$host = 'localhost';
	$dbname = "demo";
	$user = 'root';
	$password = 'yinrenlei00';
	$dbh = new PDO("mysql:host=$host;dbname=$dbname",$user,$password);
	$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	$dbh->exec("SET CHARACTER SET utf8");
    $sql = "SELECT * FROM `userinfo` where name='$name' and password='$user_password'";
    $stmt = $dbh->query($sql);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if(!$data){
    	exit(json_encode(array('status'=>false,'msg'=>'用户名或者密码不正确')));
    }
    $token = setToken($data['id'],$data['name'],$data['password']);
    $data['token'] = $token;
    $_SESSION['user'] = $data;

    //setcookie("username",$data['name'], time()+3600*24,'/',$origin,1);
    exit(json_encode(array('status'=>true,'user'=>$data)));
}catch(PDOException $e){
	echo $e->getMessage();
}


?>