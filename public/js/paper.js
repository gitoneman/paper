require.config({
	paths: {
			"jquery": "lib/jquery.min",
　　　　　　"underscore": "lib/underscore-min",
　　　　　　"backbone": "lib/backbone-min"
　　　　　　}
});

require(['underscore','backbone','model/user','me','playground'],function(_,Backbone,userModel,meView,playView){

	var appRoute = Backbone.Router.extend({
		routes:{
			"me":"meControl",
			"playground":"playControl",
			"topic/:id":"getTopic",
			"user/edit":"editUser"

		},
		meControl:function(){
			this.playView && this.playView.remove();
			this.meView = new meView({
				wrap:$("#view")
			})
			$(".J_user_edit").hide();
		},
		playControl:function(){
			this.meView && this.meView.remove();
			this.playView = new playView({
				wrap:$("#view")
			})
			$(".J_user_edit").hide();
		},
		getTopic:function(){
			alert("get topic")
		},
		editUser:function(){
			$(".J_user_edit").show();
		}
	});

	var route = new appRoute();
	Backbone.history.start();

	var appView = Backbone.View.extend({
		el:$("body"),
		initialize: function() {
			var w = this;

			w.userModel = new userModel();
			w.userModel.fetch();
			w.listenTo(w.userModel,"change",w.render);
			
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