define(['jquery',
        'underscore',
        'backbone',
        'mustache',
        'text!templates/blog_details.html',
        'json!../configure.json',
    ],
    function ($, _, Backbone, Mustache, blogDetailsTemplate, config) {
        var BlogDetailsView = Backbone.View.extend({
            el: $('#content'),
            events:{
                'click #sT':'setTitle',
                'keyup #sD':'setDate'
            },
            setTitle:function(){
               // console.log(this.model)
               this.model.set('title','111111');
               this.model.clear({'silent':false})
            },
            setDate:function(event){
                if(event.keyCode==13){
                    var val = $(event.target).val();
                    this.model.set('created',val);
                }
            },
            initialize: function(){
               this.listenTo(this.model, 'change', this.render, this);
               this.model.on('change:created',function(){
                console.log(this.model.get('created'));
               }, this);
            },

            render: function () {
              //  console.log(this.model.toJSON());
                var html = Mustache.to_html(blogDetailsTemplate, this.model.toJSON());
                this.$el.html(html);
            }
        });
        return BlogDetailsView;

    });