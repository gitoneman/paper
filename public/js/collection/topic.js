define(["model/topic"],function(post){
	var postCollection = Backbone.Collection.extend({
	  	model: post,
	  	url:"/topics"
	});

	return postCollection;
});