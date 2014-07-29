define(["collection/posts","view/post"],function(postLib,postView){

	var meView = Backbone.View.extend({
		tagName:"div",
		className:"",
		template: _.template( $( '#meView' ).html() ),
		events:{
			"submit .J_post_add":"addPost"
		},
		initialize:function(data){
			var w = this;

			w.wrap = data.wrap;
			w.wrap.html( this.$el.html(this.template()) );
			
			w.postsWrap = w.$el.find(".J_me_posts");
			w.collection = new postLib();

			w.initEvent();
		},
		initEvent:function(){
			var w = this;

			w.listenTo(w.collection,"change",w.renderPost);			
			w.collection.fetch({"success":function(items){
				w.render(items);
			}});
		},
		addPost:function(e){
			var w = this;

			var form = e.target,
				arr = $(form).serializeArray();

			arr.forEach(function(n){
				w.collection.create({
					text:n.value,
				});
			})

			return false;
		},
		render:function(items){
			var w = this;
			
	        for (var i = items.models.length - 1; i >= 0; i--) {
	        	var item = items.models[i];
	        	this.renderPost(item);
	        };
		},
		renderPost:function(item){
			var w = this;

			var post = new postView({
				model:item
			});
			w.postsWrap.append( post.render().el );
		}
	});

	return meView;
});