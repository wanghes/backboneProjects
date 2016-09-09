define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'text!templates/homepage_detail.html',
        'json!http://localhost:3000/blogs',
        'json!../configure.json'
    ],
    function($, _, Backbone, Mustache, homePageTemplate, blogPosts, config) {
        var HomePageDetailView = Backbone.View.extend({
            el: $("#content"),
            events: {
                "click .title": "showTooltip"
            },
            showTooltip:function(event){
                //console.log($(event.target).text())
               /* console.log(this)
                return false;*/
            },

            render: function() {
                var blogs = [];

                var parseDate = function(dateTime) {
                    var date = new Date(dateTime);
                    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
                };

                $.each(blogPosts, function(key, val) {
                    var blog = {};
                    blog.title = val['title'];
                    blog.description = val['description'];
                    blog.slug = val['slug'];
                    blog.keywords = val['keywords'];
                    blog.created = parseDate(val['created']);
                    blogs.push(blog);
                });

                var about = {
                    about: config["about"],
                    aboutcompany: config["aboutcompany"]
                };
                blogs.push(about);

                var html = Mustache.to_html(homePageTemplate, blogs);
                //console.log(html);
                this.$el.html(html);

            }
        });
        return HomePageDetailView;

    });
