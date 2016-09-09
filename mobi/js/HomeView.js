define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'text!../index.html',
        'json!../configure.json',
        '../js/HomePageDetailView',
        '../js/ProductsView',
        '../js/FooterView',
        '../js/AboutView'
    ],
    function ($, _, Backbone, Mustache, indexTemplate, config, HomePageDetailView, ProductsView, FooterView, AboutView) {
        var HomeView = Backbone.View.extend({
            el: $('aboutArea'),

            render: function () {


                var homePageDetailView = new HomePageDetailView();
                homePageDetailView.render();

                var footerView = new FooterView();
                footerView.render();

                //var aboutView = new AboutView();
                //aboutView.render();

                //var html = Mustache.to_html(indexTemplate, config);
                //this.$el.html(html)



            }
        });
        return HomeView;

    });