define(["collection/topic","view/topic"],function(topicLib,topicView){

	var playView = Backbone.View.extend({
		tagName:"div",
		className:"",
		template: _.template( $( '#playground' ).html() ),
		events:{
			"submit .J_topic_add":"addTopic",
			"click .J_topic_show":"showForm"
		},
		initialize:function(data){
			var w = this;

			w.wrap = data.wrap;
			w.wrap.html( this.$el.html(this.template()) );
			
			w.topicWrap = w.$el.find(".J_play_topics");
			w.collection = new topicLib();

			w.initEvent();
		},
		initEvent:function(){
			var w = this;

			w.listenTo(w.collection,"change",w.renderTopic);			
			w.collection.fetch({"success":function(items){
				w.render(items);
			}});
		},
		addTopic:function(e){
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
	        	this.renderTopic(item);
	        };
		},
		renderTopic:function(item){
			var w = this;

			var topic = new topicView({
				model:item
			});
			w.topicWrap.append( topic.render().el );
		},
		showForm:function(){
			this.$el.find(".J_topic_add").show();
			this.$el.find(".J_topic_show").hide();
		}
	});

	return playView;
});