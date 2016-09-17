define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!tpl/header.html',
    'cookie'
], function($, _, Backbone, Mustache, headerTPL,cookie) {
    var HeaderView = Backbone.View.extend({
        el: $("#header"),
        initialize:function(router){
            this.router = router;
        },
        events:{
            'click #loginOut':'logout'
        },
        logout:function(){
            cookie.delete('token');
            cookie.delete('username');
            location.href= '#/login';
        },
        render: function(title) {
            if (!title) {
                throw new TypeError('title没有定义');
            }
            var html = Mustache.to_html(headerTPL, { name: title });
            this.$el.html(html);
            if(cookie.get('token').length>0){
                $('#logining').show();
                $('#notLogin').hide();
            }else{
                $('#notLogin').show();
                $('#logining').hide();
            }
            if(location.hash=='#/register'){
                $('#notLogin').hide();
                $('#goLogin').show();
            }
        }
    });
    return HeaderView;
});
