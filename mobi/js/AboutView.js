define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'text!templates/about.html',
        'json!../configure.json',
        '../js/FooterView'
    ],
    function ($, _, Backbone, Mustache, aboutTemplate, config, FooterView) {
        var AboutView = Backbone.View.extend({
            el: $("#content"),

            render: function () {
                var html = Mustache.to_html(aboutTemplate, config);
                this.$el.html(html);

                var footerView = new FooterView();
                footerView.render();
            }
        });
        return AboutView;

    });