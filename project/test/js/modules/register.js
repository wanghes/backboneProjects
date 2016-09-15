define([
    'jquery',
    'backbone',
    'underscore',
    'mustache',
    'text!tpl/register.html',
    'app/footer',
    'app/header'
], function($, Backbone, _, Mustache, registerTPL,FooterView, HeaderView) {
    var userModel = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/register.php',
        initialize: function() {
            this.bind("change:name", function() {
                var name = this.get("name");
                alert("你改变了name属性为：" + name);
            });
            this.bind("invalid", function(model, error) {
                $('#' + error.node).addClass('errorStatus');
                $('.error').text(error.msg).show();
            });
        },
        validate: function(attributes) {
            for (key in attributes) {
                $('#' + key).removeClass('errorStatus');
            }
            if (attributes.name == '') {
                return {
                    node: 'name',
                    msg: 'name不能为空'
                };
            }
            if (attributes.sex == '') {
                return {
                    node: 'sex',
                    msg: 'sex不能为空'
                };
            }
            if (attributes.age == '') {
                return {
                    node: 'age',
                    msg: 'age不能为空'
                };
            }
        },
    });


    var RegisterView = Backbone.View.extend({
        el: $('#content'),

        initialize: function(router) {
            this.router = router;
            $('.loading_box').show();
        },
        events: {
            'click #addBtn': 'addUser'
        },
        addUser: function() {
            var self = this;
            var name = $('#name').val();
            var age = $('#age').val();
            var sex = $('#sex').val();
            var user = new userModel({
                name: name,
                age: age,
                sex: sex
            });
            user.save(null, {
                beforeSend: function(xhr) {
                    //xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                },
                success: function(model, response, options) {
                    if (response.status == 1) {
                        self.router.navigate('login', { trigger: true });
                    }
                },
                error: function(model, response, options) {
                    alert('error');
                }
            });
        },
        render: function() {
            var html = Mustache.to_html(registerTPL, null);
            this.$el.html(html);
            var headerView = new HeaderView();
            headerView.render('用户注册');
            var footerView = new FooterView();
            footerView.render();
            $('.loading_box').hide();
        }
    });

    return RegisterView;
})
