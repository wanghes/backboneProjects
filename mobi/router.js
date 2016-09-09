define([
    'jquery',
    'underscore',
    'backbone',
    '../js/HomeView',
    '../js/ProductPage',
    '../js/BlogDetailsView',
    '../js/AboutView',
    '../js/MoqiView',
    'jquerySidr'

], function ($, _, Backbone, HomeView, ProductPage, BlogDetailsView, AboutView, MoqiView) {


    var BlogPostModel = Backbone.Model.extend({
        idAttribute: 'slug',
        urlRoot:   "http://localhost:3000/blogs"
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
            'index': 'homePage',
            'about': 'about',
            'product': 'productPage',
            'blog/:slug': 'blog',
            'project': 'project',
            '*actions': 'catchAll'
        },

        blog: function(slug) {
            //console.log('slug=', slug);
        }
    });

    var initialize = function () {
        var appRouter = new AppRouter();
        appRouter.on('route:homePage', function () {
            //console.log('route:homePage');

            var homeView = new HomeView();
            homeView.render();
        });

        appRouter.on('route:about', function () {
            //console.log('route:about');

            var aboutView = new AboutView();
            aboutView.render();
        });

        appRouter.on('route:productPage', function () {
            //console.log('route:productPage');

            var productPage = new ProductPage();
            productPage.render();
        });

        appRouter.on('route:project', function () {
            //console.log('route:project');
            var moqiView = new MoqiView;
            moqiView.render();
        });

        appRouter.on('route:blog', function (slug) {
            //console.log('route:blog');

            var blogModel = new BlogPostModel({slug: slug});

            var blogDetailsView = new BlogDetailsView({model: blogModel});
            blogModel.fetch({
                success:function(collection,response,options){
                    //console.log(collection);
                }
            });

            blogDetailsView.render();

        });

        appRouter.on('route:catchAll', function () {
            console.log('route:catchAll ');
            $(document).ready(function() {
                $('#sidr').show();
                $('#menu').sidr();
            });

            var homeView = new HomeView();
            homeView.render();
        });

        Backbone.history.start();

    };

    return {
        initialize: initialize
    };

});




