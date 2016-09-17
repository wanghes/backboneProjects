<?php
if($_POST['submit']){
    $image_info = getimagesize($_FILES['file']['tmp_name']);//$_FILES['file']['tmp_name']即文件路径
    $base64_image_content = "data:{$image_info['mime']};base64," . chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));
    echo $base64_image_content;die;
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
        $type = $result[2];
        $new_file = "./test.{$type}";
        if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
            echo '新文件保存成功：', $new_file;
        }
    }
}
?>
<html>
<body>
<form action="" method="post" enctype="multipart/form-data">
    <label for="file">Filename:</label>
    <input type="file" name="file" id="file" />
    <br />
    <input type="submit" name="submit" value="Submit" />
</form>
</body>
</html>