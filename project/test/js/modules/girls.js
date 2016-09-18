define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'app/header',
    'app/footer',
    'text!tpl/girlsList.html',
    'cookie',
    'json!config'
],function($,Backbone,_,Mustache,HeaderView,FooterView,girlsListTPL,cookie,config){
    var GrlModel = Backbone.Model.extend({
        idAttribute: 'slug',
        urlRoot: config.serverUrl+"girls.php"
    });
    var slug = '';
    var girlModel = new GrlModel();
    var GirlsView = Backbone.View.extend({
        el:$('#content'),
        initialize:function(router){
            this.router = router;
            $('.loading_box').show();
        },
        events: {
            'click .information li': 'jumpGirlUrl'
        },
        jumpGirlUrl: function(event) {
            var id;
            if ($(event.target).parents('li')) {
                id = $(event.target).parents('li').data('id');
            } else {
                id = $(event.target).data('id');
            }
            this.router.navigate('#/girl/' + id, { trigger: true });
        },
        render:function(){
            var self = this;
            if(!cookie.get('token')){
                self.router.navigate('#/login');
                return;
            }

            girlModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function(collection, response) {
                    var result = {},
                        html;
                    if(response.status){
                        result['list'] = response.data;
                        result['list'].forEach(function(value){
                            var urls = JSON.parse(value['urls']);
                            value['url'] =config.serverUrl+'/upAction/'+urls[0];
                        });
                        html = Mustache.to_html(girlsListTPL, result);
                        self.$el.html(html);
                        $('.loading_box').hide();
                    }else{
                        console.log(response.msg);
                        self.router.navigate('#/login');
                    }

                }
            });


            var headerView = new HeaderView();
            headerView.render('美女图片');
            var footerView = new FooterView();
            footerView.render();
            $('.loading_box').hide();
        }
    });

    return GirlsView;
});