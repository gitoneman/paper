define("userModel",function(){
	var userModel = Backbone.Model.extend({
		defaults:{
			"id":"",
			"name":"admin",
		},
		urlRoot:"/user/profile"
	});

	return userModel;
})