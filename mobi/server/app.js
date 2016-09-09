var express = require('express');
var cors = require('cors');
var _ = require('lodash');
var app = express();
app.use(cors());

var blogs = [{
    slug: '1',
    title: 'GPU加速',
    description: 'CSS中以下属性（CSS3 transitions、CSS3 3D transforms、Opacity、Canvas、WebGL、Video）来触发GPU渲染，请合理使用过渡使用会引发手机过耗电增加',
    keywords: '',
    created: '2016-10-09',
    content: 'CSS中以下属性（CSS3 transitions、CSS3 3D transforms、Opacity、Canvas、WebGL、Video）来触发GPU渲染，请合理使用过渡使用会引发手机过耗电增加'
}, {
    slug: '2',
    title: '动画优化',
    description: '尽量使用CSS3动画;合理使用requestAnimationFrame动画代替setTimeout;适当使用Canvas动画 5个元素以内使用css动画，5个以上使用Canvas动画（iOS8可使用webGL）',
    content: '尽量使用CSS3动画;合理使用requestAnimationFrame动画代替setTimeout;适当使用Canvas动画 5个元素以内使用css动画，5个以上使用Canvas动画（iOS8可使用webGL）',
    keywords: '',
    created: '2016-10-09'
}, {
    slug: '3',
    title: '减少重绘和回流',
    description: '避免不必要的Dom操作;尽量改变Class而不是Style，使用classList代替className;避免使用document.write;减少drawImage',
    content: '避免不必要的Dom操作;尽量改变Class而不是Style，使用classList代替className;避免使用document.write;减少drawImage',
    keywords: '',
    created: '2016-10-10'
}, {
    slug: '4',
    title: '不声明过多的Font-size',
    description: '过多的Font-size引发CSS树的效率',
    content: '过多的Font-size引发CSS树的效率',
    keywords: '',
    created: '2016-10-18'
}, {
    slug: '5',
    title: '不滥用Web字体',
    description: 'Web字体需要下载，解析，重绘当前页面，尽量减少使用',
    content: 'Web字体需要下载，解析，重绘当前页面，尽量减少使用',
    keywords: '',
    created: '2016-10-18'
}, {
    slug: '6',
    title: '不滥用Float',
    description: 'Float在渲染时计算量比较大，尽量减少使用',
    content: 'Float在渲染时计算量比较大，尽量减少使用',
    keywords: '',
    created: '2016-10-18'
}];

app.get('/blogs', function(req, res) {
    res.send(blogs);
});


app.get('/blogs/:slug', function(req, res) {
    var slug = req.params.slug;
    var blog = null;


    blog = _.find(blogs, function(blog) {
      return blog.slug == slug;
    })

    if(blog){
        res.send(blog);
    }
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
