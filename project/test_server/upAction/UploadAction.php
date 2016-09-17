<?php
$dataCur = date('y-m-d');
function extend($file_name){
    $extend = pathinfo($file_name);
    $extend = strtolower($extend["extension"]);
    return $extend;
}
if(count($_FILES) > 0)
{
    try {
    $f = $_FILES['file'];
    $image_info = getimagesize($_FILES['file']['tmp_name']);
    $name = $f['name'];
    $ext = extend($name);
    $image_name = time().rand(100,999).".".$ext;
    $tmp = $f['tmp_name'];
    $dateInfo = '/upload/girls/'.$dataCur;
    if(!is_dir($dateInfo)){
        mkdir($dateInfo,0777);
    
    } 

    if(file_exists($dateInfo))  
      echo "目录创建成功！";  
else  
      echo "创建目录失败！";  
    
    $filename = $dateInfo .'/'.$image_name;

    move_uploaded_file($tmp,'../'.$filename);
    } catch (Exception $e) {   
    print $e->getMessage();   
    exit();   
}


    exit(json_encode(array("status"=>true,"path"=>$filename,"msg"=>"上传成功！")));

}
else
{
    exit(json_encode(array("status"=>false,"path"=>$filename,"msg"=>"上传失败！")));
}
