var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var _Post = new Schema({
	author:String,
	text:String,
	name:String
});
var PostModel = mongoose.model("post",_Post);

module.exports = {

	insert:function(obj,callback){
		var w = this;

		var post = new PostModel(obj);
		post.save(function(err,doc){
			callback(err,doc);
		});
		
	},

	find:function(obj,callback){
		var w = this;

		PostModel.find(obj,function(err,doc){
			callback(err,doc);
		});
	},

	update:function(obj1,obj2,callback){
		var w = this;

		PostModel.update(obj1,obj2,function(err,doc){
			callback(err,doc);
		});
	},

	delete:function(obj,callback){
		var w = this;

		PostModel.remove(obj,function(err,doc){
			callback(err,doc);
		})
	}	
};

