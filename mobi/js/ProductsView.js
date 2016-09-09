define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'text!templates/product.html',
        'json!../configure.json'
    ],
    function ($, _, Backbone, Mustache, productsTemplate, config) {
        var ProductsView = Backbone.View.extend({
            el: $("#content"),

            render: function () {
                var html = Mustache.to_html(productsTemplate, config);
                this.$el.html(html);
            }
        });
        return ProductsView;

    });