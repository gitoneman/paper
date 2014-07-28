define(["model/post"],function(post){
	var postCollection = Backbone.Collection.extend({
	  	model: post,
	  	url:"/posts"
	});

	return postCollection;
});