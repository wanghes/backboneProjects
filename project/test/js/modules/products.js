define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/products.html',
    'app/header',
    'app/footer',
    'cookie',
    'json!config'
], function($, Backbone, _, Mustache, productsTPL, HeaderView, FooterView,cookie,config) {
    var BlogPostModel = Backbone.Model.extend({
        idAttribute: 'slug',
        urlRoot: config.serverUrl+"post.php"
    });
    var slug = '';
    var blogModel = new BlogPostModel();
    var ProductsView = Backbone.View.extend({
        el: $('#content'),
        events: {
            'click #productsList li': 'jumpUrl'
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
            if(!cookie.get('token')){
                self.router.navigate('#/login');
                return;
            }
            blogModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function(collection, response) {
                    var config = {},
                        html;
                    if(response.status){
                        config['list'] = response.data;
                        html = Mustache.to_html(productsTPL, config);
                        self.$el.html(html);
                        $('.loading_box').hide();
                    }else{
                        console.log(response.msg);
                        self.router.navigate('#/login');
                    }

                }
            });

            var headerView = new HeaderView(self.router);
            headerView.render('产品列表');
            var footerView = new FooterView();
            footerView.render();
        }
    });

    
    return ProductsView;
})
