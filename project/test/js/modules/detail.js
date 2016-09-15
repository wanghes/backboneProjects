define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/detail.html',
    'app/header',
    'app/footer'
], function($, Backbone, _, Mustache, detailTPL, HeaderView, FooterView) {
    var product = Backbone.Model.extend({
        urlRoot: "http://localhost:3000/detail.php"
    });
    var productEntity = new product();

    var DetailView = Backbone.View.extend({
        el: $('#content'),
        initialize:function(){
            $('.loading_box').show();
        },
        render: function(id) {
            var self = this;
            productEntity.fetch({
                data: $.param({ id: id }),
                success: function(model, res, opt) {
                    var result = res[0];
                     var config = result;
                    var html = Mustache.to_html(detailTPL, config);
                    self.$el.html(html);
                    $('.loading_box').hide();
                }
            });

            var headerView = new HeaderView();
            headerView.render('产品详细');
            var footerView = new FooterView();
            footerView.render();
        }
    });

    return DetailView;
});
