define([
		'jquery',
		'backbone',
		'underscore',
		'mustache',
		'cookie',
		'app/header',
		'app/footer',
		'text!tpl/login.html',
        'json!config'
	],function($, Backbone, _, Mustache,cookie, HeaderView, FooterView, loginTPL,config){

		var userModel = Backbone.Model.extend({
			urlRoot:config.serverUrl+'login.php',
			initialize:function(){
				this.bind('invalid',function(model,error){
					$('#' + error.node).addClass('errorStatus');
                	$('.error').text(error.msg).show();
				})
			},
			validate:function(attrs,options){
				if(attrs.name==''){
					return {
						node:'name',
						msg:'请填写用户名'
					};
				}
				if(!attrs.password){
					return {
						node:'password',
						msg:'请填写密码'
					};
				}
			}

		});
		var LoginView = Backbone.View.extend({
			el:$('#content'),
			initialize:function(router){
				 $('.loading_box').show();
                this.router = router;
			},

			events:{
				'click #loginBtn':'handleLogin'
			},
			handleLogin:function(){
				var self = this;
				var name = $('#name').val();
				var password = $('#password').val();
				var entity = new userModel({
					name:name,
					password:password
				});

				entity.save(null,{
                    xhrFields: {
                        withCredentials: true
                        //crossDomain:true
                    },
					beforeSend:function(xhr){
						xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
					},
					success:function(model,res,opt){
						if(res.status){
							var user = res.user;
                            //console.log(cookie.get('username'))
							cookie.set('token',user.token);
							cookie.set('username',user.name);
                            self.router.navigate('#/home');
						}
					},
					error:function(model,res,opt){
						alert('error');
					}
				});
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