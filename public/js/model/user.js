define(["backbone"],function(Backbone){
	var userModel = Backbone.Model.extend({
		defaults:{
			"id":"",
			"name":"admin",
		},
		urlRoot:"/user/profile"
	});

	return userModel;
})