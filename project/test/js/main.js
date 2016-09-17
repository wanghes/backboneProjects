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
    'cookie',
    'json!config'
], function($, Backbone, _, Mustache, HeaderView, FooterView, RegisterView, ProductsView, DetailView, LoginView, GirlsView, GirlDetailView, cookie, config) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "login": "loginRoute",
            "detail/:id": "detailRoute",
            "register": "registerRoute",
            "girls":'girlsRoute',
            "girl/:id":"girlDetailRoute",
            "*actions": "defaultRoute"
        },
        initialize:function(){
            if(!cookie.get('token')){
                location.href='#/login';
            }
        },
        defaultRoute: function() {
            var productsView = new ProductsView(app_router);
            productsView.render();
        },
        loginRoute: function() {
            if(cookie.get('token')){
                app_router.navigate('#/home');
            }
            var loginView = new LoginView(app_router);
            loginView.render();
        },
        girlsRoute:function(){
            var girlsView = new GirlsView(app_router);
            girlsView.render();
        },
        detailRoute: function(id) {
            var detailView = new DetailView();
            detailView.render(id);
        },
        girlDetailRoute: function(id) {
            var girlDetailView = new GirlDetailView();
            girlDetailView.render(id);
        },
        registerRoute: function() {
            $('.loading_box').show();
            if(cookie.get('token')){
                location.href='#/home';
            }
            var registerView = new RegisterView(app_router);
            registerView.render();
        }
    });

    var app_router = new AppRouter;
    app_router.on('route:registerRoute',function(page){

    });
    Backbone.history.start();
});
