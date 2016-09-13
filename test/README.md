# backboneProjects
backbonejs

## 用cmd: php -S localhost:3000 启动服务器 (提示：已经安装了 php&mysql服务);
### 浏览器中type : localhost:3000 将会自动加载'首页'
```javascript
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../modules',
        tpl: '../template',
        backbone: 'backbone-1.2.3',
        mustache: 'mustache-2.2.0',
        json: 'requirejs-json-0.4.0'
    }
});
require(['jquery', 'app/colors', 'backbone', 'underscore', 'mustache',
        'text!tpl/color.html', 'json!../config.json', 'text!tpl/footer.html',
        'text!tpl/header.html', 'text!tpl/login.html', 'text!tpl/detail.html'
    ],
    function($, colors, Backbone, _, Mustache, colorTPL, config, footTPL, headerTPL, loginTPL, detailTPL) {

        $('.loading_box').show();


        var ColorView = Backbone.View.extend({
            el: $("#content"),
            render: function(response) {
                config.list = response;
                var html = Mustache.to_html(colorTPL, config);
                this.$el.html(html);
                var headerView = new HeaderView();
                headerView.render();
                var footerView = new FooterView();
                footerView.render();
            }
        });

        var LoginView = Backbone.View.extend({
            el: $('#content'),
            render: function() {
                var config = {};
                var html = Mustache.to_html(loginTPL, config);
                this.$el.html(html);
                var headerView = new HeaderView();
                headerView.render();
                var footerView = new FooterView();
                footerView.render();
            }
        });



        var DetailView = Backbone.View.extend({
            el: $('#content'),
            render: function(result) {
                var config = result;
                var html = Mustache.to_html(detailTPL, config);
                this.$el.html(html);
                var headerView = new HeaderView();
                headerView.render();
                var footerView = new FooterView();
                footerView.render();
            }
        });

        var HeaderView = Backbone.View.extend({
            el: $("#header"),
            render: function() {
                var html = Mustache.to_html(headerTPL, { name: 'requirejs' });
                this.$el.html(html);
            }
        });
        var FooterView = Backbone.View.extend({
            el: $("#footer"),
            render: function() {
                var html = Mustache.to_html(footTPL, { pepple: '王海松' });
                this.$el.html(html);
            }
        });

        var AppRouter = Backbone.Router.extend({
            routes: {
                "login": "loginRoute",
                "detail/:id": "detailRoute",
                "*actions": "defaultRoute"
            },

            defaultRoute: function() {
                var BlogPostModel = Backbone.Model.extend({
                    idAttribute: 'slug',
                    urlRoot: "http://localhost:3000/post.php"
                });
                var slug = '';
                var blogModel = new BlogPostModel();
                var colorView = new ColorView({ model: blogModel });
                blogModel.fetch({
                    success: function(collection, response) {
                        colorView.render(response);
                        $('.loading_box').hide();
                    }
                });
            },
            loginRoute: function() {

                var loginView = new LoginView();
                loginView.render();
                $('.loading_box').hide();
            },
            detailRoute: function(id) {
                var product = Backbone.Model.extend({
                    urlRoot: "http://localhost:3000/detail.php"
                });
                var detailView = new DetailView();
                var exp = new product();
                exp.fetch({
                    data: $.param({ id: id }),
                    success: function(model, res, opt) {
                        var result = res[0];
                        detailView.render(result);
                        $('.loading_box').hide();
                    }
                });
            }
        });

        var app_router = new AppRouter;
        /*app_router.on('route:loginRoute', function() {
            var loginView = new LoginView();
            loginView.render();
            $('.loading_box').hide();
        })*/
        Backbone.history.start();
    });

```
