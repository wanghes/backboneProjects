<?php



if($_SERVER['REQUEST_METHOD']=='POST')
{
    $dbname = "demo";
    $host = 'localhost';
    $user = 'root';
    $password = 'yinrenlei00';

    $title = $_POST['title'];
    $urls = $_POST['urls'];
    $time = time();
    try {
        $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $dbh->exec("SET CHARACTER SET utf8");
        $sql = "insert into girls(title,urls,pubtime) values('$title','$urls','$time')";
        $count = $dbh->exec($sql);
        $dbh = null;
        if($count){
            $result = array(
                'status'=>true,
                'data'=>$count
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
}


