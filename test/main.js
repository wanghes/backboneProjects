requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../modules',
        tpl: '../template',
        backbone: 'backbone-1.2.3',
        mustache: 'mustache-2.2.0',
        json: 'requirejs-json-0.4.0'
    }
});
require(['jquery', 'app/colors', 'backbone', 'underscore', 'mustache', 'text!tpl/color.html', 'json!../config.json', 'text!tpl/footer.html'],
    function($, colors, Backbone, _, Mustache, colorTPL, config, footTPL) {

        var BlogPostModel = Backbone.Model.extend({
            idAttribute: 'slug',
            urlRoot: "http://localhost:1005/post.php"
        });
        var slug = '';

        var ColorView = Backbone.View.extend({
            el: $("#content"),
            render: function(response) {
                config.list = response;
                var html = Mustache.to_html(colorTPL, config);
                this.$el.html(html);
                var footerView = new FooterView();
                footerView.render();
            }
        });
        var blogModel = new BlogPostModel();
        var colorView = new ColorView({ model: blogModel });
        blogModel.fetch({
            success: function(collection, response) {
                colorView.render(response);
            }
        });


        var FooterView = Backbone.View.extend({
            el: $("#footer"),
            render: function() {
                var html = Mustache.to_html(footTPL, {pepple:'王海松'});
                this.$el.html(html);
            }
        });



    });
