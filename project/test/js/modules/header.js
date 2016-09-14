define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!tpl/header.html'
], function($, _, Backbone, Mustache, headerTPL) {
    var HeaderView = Backbone.View.extend({
        el: $("#header"),
        render: function(title) {
            if (!title) {
                throw new TypeError('title没有定义');
            }
            var html = Mustache.to_html(headerTPL, { name: title });
            this.$el.html(html);
        }
    });
    return HeaderView;
});
