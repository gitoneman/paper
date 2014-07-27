define(["postModel"],function(postModel){

	var meView = Backbone.View.extend({
		el:$(".J_container_me"),
		template: _.template( $( '#post' ).html() ),
		events:{
			"submit .J_post_add":"addPost"
		},
		initialize:function(){
			var w = this;

			w.postsWrap = w.$el.find(".J_me_posts");
			w.collection = new postModel();
			w.listenTo(w.collection,"change",w.renderPost);
			
			w.collection.fetch({"success":w.render});
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

			items.models.forEach(function( item ) {
				me.renderPost(item);
	        });
		},
		renderPost:function(item){
			var w = this;

			w.postsWrap.append( w.template( item.toJSON() ) );
		}
	});

	var me = new meView();

	return {
		o:me
	}
});