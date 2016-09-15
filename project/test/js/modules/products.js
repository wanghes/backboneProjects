define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/products.html',
    'app/header',
    'app/footer'
], function($, Backbone, _, Mustache, productsTPL, HeaderView, FooterView) {
    var BlogPostModel = Backbone.Model.extend({
        idAttribute: 'slug',
        urlRoot: "http://localhost:3000/post.php"
    });
    var slug = '';
    var blogModel = new BlogPostModel();


    var ProductsView = Backbone.View.extend({
        el: $('#content'),
        events: {
            'click .information li': 'jumpUrl'
        },
        initialize: function(router) {
            this.router = router;
            $('.loading_box').show();
        },
        jumpUrl: function(event) {
            var id;
            if ($(event.target).parents('li')) {
                id = $(event.target).parents('li').data('id');
            } else {
                id = $(event.target).data('id');
            }

            this.router.navigate('detail/' + id, { trigger: true });
        },
        render: function() {
            var self = this;
            blogModel.fetch({
                success: function(collection, response) {
                    var config = {},
                        html;
                    config['list'] = response;
                    html = Mustache.to_html(productsTPL, config);
                    self.$el.html(html);
                    $('.loading_box').hide();
                }
            });

            var headerView = new HeaderView();
            headerView.render('产品列表');
            var footerView = new FooterView();
            footerView.render();
        }
    });

    
    return ProductsView;
})
