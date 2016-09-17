define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/detail.html',
    'app/header',
    'app/footer',
    'json!config'
], function($, Backbone, _, Mustache, detailTPL, HeaderView, FooterView,config) {
    var product = Backbone.Model.extend({
        urlRoot: config.serverUrl+"detail.php"
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
                xhrFields: {
                    withCredentials: true
                },
                data: $.param({ id: id }),
                success: function(model, res, opt) {
                    var config;
                    if(res.status){
                        config = res.data;
                        var html = Mustache.to_html(detailTPL, config);
                        self.$el.html(html);
                        $('.loading_box').hide();
                    }else{
                        alert(res.msg);
                        console.log(res.msg);
                    }
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
