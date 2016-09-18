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
        cookie:'cookie',
        text: 'text',
        config:'../config.json'
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
    'app/login',
    'app/girls',
    'app/girlDetail',
    'app/articles',
    'app/user',
    'cookie',
    'json!config'
], function($, Backbone, _, Mustache, HeaderView, FooterView, RegisterView, ProductsView, DetailView, LoginView, GirlsView, GirlDetailView, ArticlesView,UCenterView, cookie, config) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "login": "loginRoute",
            "detail/:id": "detailRoute",
            "register": "registerRoute",
            "girls":'girlsRoute',
            "girl/:gid":"girlDetailRoute",
            "articles":"articlesRoute",
            "user":"userRoute",
            "*actions": "defaultRoute"
        },
        initialize:function(){
            if(!cookie.get('token')){
                location.href='#/login';
            }
        },
        loginRoute: function() {
            if(cookie.get('token')){
                app_router.navigate('#/home');
            }
            var loginView = new LoginView(app_router);
            loginView.render();
        },
        defaultRoute: function() {
            var productsView = new ProductsView(app_router);
            productsView.render();
        },
        girlsRoute:function(){
            var girlsView = new GirlsView(app_router);
            girlsView.render();
        },
        detailRoute: function(id) {
            var detailView = new DetailView();
            detailView.render(id);
        },
        girlDetailRoute: function(gid) {
            var girlDetailView = new GirlDetailView();
            girlDetailView.render(gid);
        },
        registerRoute: function() {
            $('.loading_box').show();
            if(cookie.get('token')){
                location.href='#/home';
            }
            var registerView = new RegisterView(app_router);
            registerView.render();
        },
        articlesRoute:function(){
            var articlesView = new ArticlesView(app_router);
            articlesView.render();
        },
        userRoute:function(){
            var uCenterView = new UCenterView(app_router);
            uCenterView.render();
        }
    });

    var app_router = new AppRouter;
    Backbone.history.start();
});
