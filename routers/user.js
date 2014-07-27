var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var _User = new Schema({
	username:String,
	password:String
});
var UserModel = mongoose.model("user",_User);

module.exports = {

	insert:function(obj,callback){
		var w = this;

		var user = new UserModel(obj);
		user.save(function(err,doc){
			callback(err,doc);
		});
		
	},

	find:function(obj,callback){
		var w = this;

		UserModel.find(obj,function(err,doc){
			callback(err,doc);
		});
	},

	update:function(obj1,obj2,callback){
		var w = this;

		UserModel.update(obj1,obj2,function(err,doc){
			callback(err,doc);
		});
	},

	delete:function(obj,callback){
		var w = this;

		UserModel.remove(obj,function(err,doc){
			callback(err,doc);
		})
	},
	createUser:function(obj,callback){
		var w = this;

		w.find(obj,function(err,doc){
			if(err){
				console.log("findUser error!");
			}else{
				// callback(err,doc);
				if(doc.length == 0){
					w.insert(obj,function(e,d){
						callback("",e,d);
					});
				}else{
					callback("1");
					console.log("user already exist!")
				}				
			}
		})
	},
	getProfile:function(id,callback){
		var w = this;

		w.find({
			"_id":id
		},function(err,doc){
			if(err){
				console.log("get user profile error");
			}else{
				var profile = doc[0],
					obj = {};

				obj = {
					id:profile._id,
					name:profile.username
				}

				callback(obj);
			}
		})
	}
};

