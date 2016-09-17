<?php
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin:'.$origin);
header("Access-Control-Allow-Headers:Set-Cookie, Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Method:POST,GET,PUT,DELETE");
header('Access-Control-Allow-Credentials:true');
header('Content-type: application/json');

if(empty($_COOKIE['token'])){
    exit(json_encode(array('status'=>false,'msg'=>'没有获取到用户信息')));
}

$dbname = "demo";
$host = 'localhost';
$user = 'root';
$password = 'yinrenlei00';
$id = $_GET['id'];
try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $dbh->exec("SET CHARACTER SET utf8");
    $sql = "SELECT * FROM girls where id=$id";
    $stmt = $dbh->query($sql);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if($data){
        $result = array(
            'status'=>true,
            'data'=>$data
        );
    }else{
        $result = array(
            'status'=>false,
            'msg'=>'获取数据失败'
        );
    }

    exit(json_encode($result));

}
catch(PDOException $e) {
    echo $e->getMessage();
}


?>