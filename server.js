var root = __dirname,
	express = require("express"),
	path = require("path"),
	mongoose = require("mongoose"),
	MongoStore = require('connect-mongo')(express);

var express_mongoose = require("express-mongoose");
var user = require("./routers/user");
var posts = require("./routers/post");
mongoose.connect('mongodb://localhost/paper');


var app = express();

app.configure(function(){
	app.use( express.bodyParser() );
	app.use(express.cookieParser());
	app.use(express.session({
	  	store: new MongoStore({
	    	url: 'mongodb://localhost/paper'
	  	}),
	  	secret: '1234567890QWERTY'
	}));
	app.use( express.methodOverride() );
	app.use( app.router );
	app.use( express.static( path.join( root,"public") ) );
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
	
});

var port = 3000;
app.listen( port,function(){
	console.log("The servr is running");
});

app.get("/",function(req,res){
	if(!req.session.user){
		res.redirect("/login");
	}else{
		res.redirect("/index.html")
	}
});
app.get("/login",function(req,res){
	if(!req.session.user){
		res.redirect("/partial/login.html")
	}else{
		res.redirect("/index.html")
	}		
});

app.get("/register",function(req,res){
	
	res.redirect("/partial/register.html")
});

//user register
app.post("/register",function(req,res){
	
	user.createUser({
		"username":req.body.username,
		"password":req.body.password
	},function(type,err,doce){	
		if(type == "1"){
			// user exist
			res.send("user already exist");
		}else{
			res.redirect("/partial/login.html");
		}		
	});
})
	
//user login
app.post("/login",function(req,res){
	var info = {
		"username":req.body.username,
		"password":req.body.password
	}
	user.find(info,function(err,doc){
		if(!err){
			if(doc.length == 0){
				res.send("no user")
			}else{				
				req.session.user = doc[0];
				res.redirect("/")
			}			
		}else{
			res.send(error)
		}		
	})
});
app.get("/logout",function(req,res){
	req.session.user = null;
	res.redirect("/login");
});

//json api

app.get("/user/profile",function(req,res){
	var id = req.session.user._id;
	
	if(id){
		user.getProfile(id,function(doc){
			res.send(doc)
		});
	}	
});

app.get("/posts",function(req,res){
	posts.find(function(err,doc){
		if(!err){
			res.send(doc)
		}		
	});
});

app.get("/post/:id",function(req,res){
	
});

app.post("/posts",function(req,res){
	var id = req.session.user._id,
		text = req.body.text,
		name = req.session.user.username;
	
	posts.insert({
		"author":id,
		"text":text,
		"name":name
	},function(err,doc){
		res.send(doc)
	});
});