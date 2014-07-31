define(function(){
	var topicView = Backbone.View.extend({
		tagName:"div",
		className:"m-panel",
		template:_.template( $( '#topic' ).html() ),
		events: {
	        
	    },
		initialize:function(){

		},
		render:function(){
 			this.$el.html( this.template( this.model.toJSON() ) );
        	return this;
		},
		deletePost:function(){
			var w = this;

			w.model.destroy();
			w.remove();
		}
	});

	return topicView;
});