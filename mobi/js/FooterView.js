define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'text!templates/footer.html',
        'json!../configure.json'
    ],
    function ($, _, Backbone, Mustache, footerTemplate, config) {
        var FooterView = Backbone.View.extend({
            el: $("#footer"),

            render: function () {
                var html = Mustache.to_html(footerTemplate, config['seoinfo']);
                this.$el.html(html);
            }
        });
        return FooterView;

    });