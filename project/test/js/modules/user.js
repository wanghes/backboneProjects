define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/user.html',
    'app/header',
    'app/footer',
    'cookie',
    'json!config'
], function($, Backbone, _, Mustache, userTPL, HeaderView, FooterView,cookie,config) {

    var UCenterView = Backbone.View.extend({
        el: $('#content'),
        events: {

        },
        initialize: function(router) {
            this.router = router;
            $('.loading_box').show();
        },

        render: function() {
            var self = this;
            if(!cookie.get('token')){
                self.router.navigate('#/login');
                return;
            }

            var result = config,
            html = Mustache.to_html(userTPL, result);
            self.$el.html(html);
            var headerView = new HeaderView(self.router);
            headerView.render('用户中心');
            var footerView = new FooterView();
            footerView.render();
            $('.loading_box').hide();
        }
    });


    return UCenterView;
});
