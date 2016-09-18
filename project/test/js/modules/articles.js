define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'app/header',
    'app/footer',
    'text!tpl/articles.html',
    'cookie',
    'json!config'
],function($,Backbone,_,Mustache,HeaderView,FooterView,articlesTPL,cookie,config){

    var ArticlesView = Backbone.View.extend({
        el:$('#content'),
        initialize:function(router){
            this.router = router;
            $('.loading_box').show();
        },
        events: {

        },
        render:function(){
            var self = this;
            if(!cookie.get('token')){
                self.router.navigate('#/login');
                return;
            }

            var result = config,
            html = Mustache.to_html(articlesTPL, result);
            self.$el.html(html);
            var headerView = new HeaderView();
            headerView.render('美女图片');
            var footerView = new FooterView();
            footerView.render();
            $('.loading_box').hide();
        }
    });

    return ArticlesView;
});