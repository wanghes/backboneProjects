<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>美女添加</title>
    <link type="text/css" rel="stylesheet" href="css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="css/zyupload-1.0.0.min.css">
    <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="js/zyupload-1.0.0.min.js"></script>
</head>
<body>

<div class="container">

    <form class="form-horizontal" method="post" action="/addGirlAction.php">
        <fieldset>
            <legend>图片上传</legend>

            <div class="control-group">
                <label class="control-label" for="title">标题名字</label>
                <div class="controls">
                    <input type="text" id="title" placeholder="标题名字">
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                    <button type="submit" class="btn" id="submitBtn">提交信息</button>
                </div>
            </div>
        </fieldset>
    </form>
    <div id="zyupload" class="zyupload"></div>
</div>

<script type="text/javascript">
    var urls = [];
    $(function(){
        // 初始化插件
        $("#zyupload").zyUpload({
            width            :   "650px",                 // 宽度
            height           :   "400px",                 // 宽度
            itemWidth        :   "140px",                 // 文件项的宽度
            itemHeight       :   "115px",                 // 文件项的高度
            url              :   "/upAction/UploadAction.php",  // 上传文件的路径
            fileType         :   ["jpg","png","gif"],// 上传文件的类型
            fileSize         :   51200000,                // 上传文件的大小
            multiple         :   true,                    // 是否可以多个文件上传
            dragDrop         :   true,                    // 是否可以拖动上传文件
            tailor           :   true,                    // 是否可以裁剪图片
            del              :   true,                    // 是否可以删除文件
            finishDel        :   false,  				  // 是否在上传文件完成后删除预览
            /* 外部获得的回调接口 */
            onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                /*console.info("当前选择了以下文件：");
                console.info(selectFiles);*/
            },
            onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                /*console.info("当前删除了此文件：");
                console.info(file.name);*/
            },
            onSuccess: function(file, response){          // 文件上传成功的回调方法
                /*  console.info("此文件上传成功：");
                 console.info(file.name);
                 console.info("此文件上传到服务器地址：");
                 console.info(response);*/
                //$("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
                var result = JSON.parse(response);
                urls.push(result.path);
            },
            onFailure: function(file, response){          // 文件上传失败的回调方法
                /*console.info("此文件上传失败：");
                console.info(file.name);*/
            },
            onComplete: function(response){           	  // 上传完成的回调方法
                console.info("文件上传完成");
                console.info(response);
            }
        });
    });

    $('#submitBtn').click(function(){
        var title = $('#title').val();
        var urlAll = JSON.stringify(urls);
        $.post('/addGirlAction.php',{
            title:title,
            urls:urlAll
        },function(result){
            if(result.status){
                setTimeout(function(){
                    location.reload();
                },2000);
            }
        },'json');

        return false;
    });
</script>
</body>
</html>


