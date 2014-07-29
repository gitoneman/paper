var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var _Topic = new Schema({
	author:String,
	text:String,
});
var TopicModel = mongoose.model("topic",_Topic);

module.exports = {

	insert:function(obj,callback){
		var w = this;

		var topic = new TopicModel(obj);
		topic.save(function(err,doc){
			callback(err,doc);
		});
		
	},

	find:function(obj,callback){
		var w = this;

		TopicModel.find(obj,function(err,doc){
			callback(err,doc);
		});
	},

	update:function(obj1,obj2,callback){
		var w = this;

		TopicModel.update(obj1,obj2,function(err,doc){
			callback(err,doc);
		});
	},

	delete:function(obj,callback){
		var w = this;

		TopicModel.remove(obj,function(err,doc){
			callback(err,doc);
		})
	}	
};

