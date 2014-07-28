define(function(){
	var postView = Backbone.View.extend({
		tagName:"div",
		template:_.template( $( '#post' ).html() ),
		events: {
	        'click .J_post_delete': 'deletePost'
	    },
		initialize:function(){

		},
		render:function(){
 			this.$el.html( this.template( this.model.toJSON() ) );
        	return this;
		},
		deletePost:function(){
			var w = this;
console.log(w.model)
			w.model.destroy();
			w.remove();
		}
	});

	return postView;
});