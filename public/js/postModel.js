define("postModel",function(){
	var postModel = Backbone.Model.extend({
		defaults:{
			"text":"this a test",
		},
		urlRoot:"/posts"
	});

	var postCollection = Backbone.Collection.extend({
	  	model: postModel,
	  	url:"/posts"
	});

	return postCollection;
})