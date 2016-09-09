define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'json!../configure.json',
        '../js/ProductsView',
        '../js/FooterView',
    ],
    function ($, _, Backbone, Mustache, config, ProductsView, FooterView) {
        var ProductPage = Backbone.View.extend({

            initialize: function(){
            },

            render: function () {

                var productsView = new ProductsView();
                productsView.render();

                var footerView = new FooterView();
                footerView.render();

            }
        });
        return ProductPage;

    });