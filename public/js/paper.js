require.config({
	paths: {
			"jquery": "lib/jquery.min",
　　　　　　"underscore": "lib/underscore-min",
　　　　　　"backbone": "lib/backbone-min"
　　　　　　}
});

require(['underscore','backbone'],function(_,Backbone){

	var appRoute = Backbone.Router.extend({
		routes:{
			"me":"meControl",
			"playground":"playControl"
		},
		meControl:function(){
			require(["me"],function(){
				
			})
		},
		playControl:function(){
			
		}
	});

	var route = new appRoute();
	Backbone.history.start();

	var appView = Backbone.View.extend({
		el:$("body"),
		initialize: function() {
			var w = this;

			// this.$el.find("#me").click();
			// this.meView = ;
			// this.playView = ;

			require(["userModel"],function(userModel){
				w.userModel = new userModel();
				w.userModel.fetch();
				w.listenTo(w.userModel,"change",w.render);
			})
			route.navigate("me",{trigger: true})
	  	},
	  	render:function(d){
	  		var w = this;
	  		w.$el.find(".J_user_profile").text(d.get("name"));
	  	}
	});

	var view = new appView({
		
	});
})