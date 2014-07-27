define("postModel",function(){
	var postModel = Backbone.Model.extend({
		defaults:{
			"id":"",
			"name":"admin",
		},
		urlRoot:"/posts"
	});

	var postCollection = Backbone.Collection.extend({
	  	model: postModel
	});

	return postCollection;
})