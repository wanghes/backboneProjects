requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../modules',
        tpl: '../../template',
        backbone: 'backbone-1.2.3',
        mustache: 'mustache-2.2.0',
        json: 'requirejs-json-0.4.0',
        underscore: 'underscore',
        jquery: 'jquery',
        text: 'text'
    }
});
require([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'app/header',
    'app/footer',
    'app/register',
    'app/products',
    'app/detail',
    'json!../config.json',
    'text!tpl/login.html',
    'text!tpl/detail.html'
], function($, Backbone, _, Mustache, HeaderView, FooterView, RegisterView, ProductsView, DetailView, config, loginTPL) {

    $('.loading_box').show();


    var LoginView = Backbone.View.extend({
        el: $('#content'),
        initialize: function() {
            $('.loading_box').show();
        },
        render: function() {
            var config = {};
            var html = Mustache.to_html(loginTPL, config);
            this.$el.html(html);
            var headerView = new HeaderView();
            headerView.render('用户登录');
            var footerView = new FooterView();
            footerView.render();
        }
    });






    var AppRouter = Backbone.Router.extend({
        routes: {
            "login": "loginRoute",
            "detail/:id": "detailRoute",
            "register": "registerRoute",
            "*actions": "defaultRoute"
        },

        defaultRoute: function() {
            $('.loading_box').show();
            ProductsView.render();
        },
        loginRoute: function() {
            var loginView = new LoginView();
            loginView.render();
            $('.loading_box').hide();
        },
        detailRoute: function() {
            $('.loading_box').show();
            var detailView = new DetailView();
            detailView.render();
        },
        registerRoute: function() {
            $('.loading_box').show();
            var registerView = new RegisterView();
            registerView.render();
        }
    });

    var app_router = new AppRouter;
    Backbone.history.start();
});
