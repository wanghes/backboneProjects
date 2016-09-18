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

        render: function(gid) {
            var self = this;
            girlEntity.fetch({
                xhrFields: {
                    withCredentials: true
                },
                data: $.param({ gid: gid }),
                success: function(model, res, opt) {
                    var result;
                    if(res.status){
                        result = res.data;
                        result.urls = JSON.parse(result.urls);
                        result.urls.forEach(function(value,index){
                            result.urls[index] = config.serverUrl+'/upAction/'+value;
                        });
                        var html = Mustache.to_html(girlDetailTPL, result);
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
