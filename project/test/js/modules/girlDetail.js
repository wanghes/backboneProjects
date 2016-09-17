define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/girlDetail.html',
    'app/header',
    'app/footer',
    'json!config'
], function($, Backbone, _, Mustache, girlDetailTPL, HeaderView, FooterView,config) {
    var GirlModel = Backbone.Model.extend({
        urlRoot: config.serverUrl+"girlDetail.php"
    });
    var girlEntity = new GirlModel();

    var GirlDetailView = Backbone.View.extend({
        el: $('#content'),
        initialize:function(){
            $('.loading_box').show();
        },

        render: function(id) {
            var self = this;
            girlEntity.fetch({
                xhrFields: {
                    withCredentials: true
                },
                data: $.param({ id: id }),
                success: function(model, res, opt) {
                    var config;
                    if(res.status){
                        config = res.data;
                        config.urls = JSON.parse(config.urls);
                        config.urls.forEach(function(value,index){
                            config.urls[index] = 'http://localhost:3000'+value;
                        });
                        var html = Mustache.to_html(girlDetailTPL, config);
                        self.$el.html(html);
                        $('.loading_box').hide();
                    }else{
                        alert(res.msg);
                        console.log(res.msg);
                    }
                }
            });

            var headerView = new HeaderView();
            headerView.render('女孩');
            var footerView = new FooterView();
            footerView.render();
        }
    });

    return GirlDetailView;
});
