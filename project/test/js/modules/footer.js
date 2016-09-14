define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!tpl/footer.html'
], function($, _, Backbone, Mustache, footerTPL) {
    var FooterView = Backbone.View.extend({
        el: $("#footer"),
        render: function() {
            var html = Mustache.to_html(footerTPL, null);
            this.$el.html(html);
        }
    });
    return FooterView;
});
