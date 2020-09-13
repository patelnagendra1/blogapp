var express 		 = require('express'),
	bodyParser  	 = require('body-parser'),
	mongoose    	 = require('mongoose'),
	app         	 = express(),
	expressSanitizer = require("express-sanitizer"), 
	methodoverride   = require('method-override');


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
//mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static('public'));
mongoose.connect( "mongodb+srv://patelnagendra:nagupatil2915@cluster0.kjhid.mongodb.net/blog_app?retryWrites=true&w=majority" , { useNewUrlParser: true, useUnifiedTopology: true});

methodoverride
app.use(methodoverride("_method"))
app.use(expressSanitizer());
mongoose.set('useFindAndModify', false);



var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
})

var blog = mongoose.model("blog",blogSchema);

// blog.create({
// 	title:"test",
// 	image:"https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body:"This is a campground photo "
// })

app.get("/",function(req,res){
	res.redirect("/blogs");
})

app.get("/blogs",function(req,res){
	blog.find({},function(err,allblogs){
		if(err)
			console.log(err);
		else
			res.render("index",{blogs:allblogs});
	})
	
})

app.get("/blogs/new",function(req,res){
	res.render("new");
})

app.post("/blogs",function(req,res){

	req.body.body = req.sanitize(req.body.body);

	var newblog={
		title:req.body.title,
		image:req.body.image,
		body:req.body.body
	}
	blog.create(newblog,function(err,blogs){
		if(err)
			res.render("new");
		else
			res.redirect("/blogs");
	})
	
})

app.get("/blogs/:id",function(req,res){
	blog.findById(req.params.id,function(err,findblog){
		if(err)
			console.log(err);
		else
			res.render("show",{blog:findblog});
	})
})


app.get("/blogs/:id/edit",function(req,res){
	blog.findById(req.params.id,function(err,findblog){
		if(err)
			res.redirect("/blogs")
		else
			res.render("edit",{blog:findblog})
	})
})

app.put("/blogs/:id",function(req,res){
	// var afterupdate={
	// 	title:req.body.title,
	// 	image:req.body.image,
	// 	body:req.body.body
	// }

	req.body.body = req.sanitize(req.body.body);

	blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
		if(err)
			res.redirect("/blogs")
		else
			res.redirect("/blogs/"+req.params.id);
	})
})

app.delete("/blogs/:id",function(req,res){
	  blog.findByIdAndRemove(req.params.id,function(err){
		if(err)
			console.log(err);
		else
			res.redirect("/blogs");
	})


})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port,function(){
	console.log("SERVER IS RUNNING!!!");
})
