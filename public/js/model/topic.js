define(function(){
	var topicModel = Backbone.Model.extend({
		defaults:{
			"text":"this a test",
		},
		parse: function( response ) {
		    response.id = response._id;
		    return response;
		},
		urlRoot:"/topics"
	});

	return topicModel;
});