define([
		'jquery',
		'backbone',
		'underscore',
		'mustache',
		'app/header',
		'app/footer',
		'text!tpl/login.html'
	],function($, Backbone, _, Mustache, HeaderView, FooterView, loginTPL){
		var LoginView = Backbone.View.extend({
			el:$('#content'),
			initialize:function(){
				 $('.loading_box').show();
			},
			render:function(){
				var config = {};
	            var html = Mustache.to_html(loginTPL, config);
	            this.$el.html(html);
				var headerView = new HeaderView();
				headerView.render('登录');
				var footerView = new FooterView();
				footerView.render();
				$('.loading_box').hide();
			}
		});

		return LoginView;
});