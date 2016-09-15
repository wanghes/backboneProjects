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
    'app/login',
    'json!../config.json'
], function($, Backbone, _, Mustache, HeaderView, FooterView, RegisterView, ProductsView, DetailView, LoginView, config) {
    //$('.loading_box').show();


    var AppRouter = Backbone.Router.extend({
        routes: {
            "login": "loginRoute",
            "detail/:id": "detailRoute",
            "register": "registerRoute",
            "*actions": "defaultRoute"
        },
        initialize:function(){

        },

        defaultRoute: function() {
            var productsView = new ProductsView(app_router);
            productsView.render();
        },
        loginRoute: function() {
            var loginView = new LoginView();
            loginView.render();
        },
        detailRoute: function(id) {
            
            var detailView = new DetailView();
            detailView.render(id);
        },
        registerRoute: function() {
            $('.loading_box').show();
            var registerView = new RegisterView(app_router);
            registerView.render();
        }
    });

    var app_router = new AppRouter;
    console.log(app_router);
    Backbone.history.start();
});
