var root = __dirname,
	express = require("express"),
	path = require("path"),
	mongoose = require("mongoose"),
	MongoStore = require('connect-mongo')(express);

var express_mongoose = require("express-mongoose");
var router= require("./routers/router");
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

app.get("/",router.index);
app.get("/login",router.login);
app.get("/register",router.register);
app.get("/logout",router.logout);
//user register
app.post("/register",router.signup);
//user login
app.post("/login",router.signin);

//json api
app.get("/user/profile",router.user_profile);
app.get("/posts",router.posts);
app.get("/post/:id",router.getPost);
app.post("/posts",router.addPost);
app.delete("/posts/:id",router.deletePost);

app.get("/topics",router.topics);
app.post("/topics",router.addTopic);
app.get("/topic/:id",router.getTopic)