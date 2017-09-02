var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
<<<<<<< HEAD
    methodOverride = require("method-override"),
=======
>>>>>>> 258a1dcff736f2bb4dc90eba2b696f7121b2e435
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
<<<<<<< HEAD
    flash       = require ('connect-flash');
var multer      = require("multer"),
    upload      = multer({ dest: 'views/campgrounds' });
         
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
// mongoose.connect("mongodb://localhost/yelp_camp_v10");
mongoose.connect("mongodb://hanu:delhi123@ds143191.mlab.com:43191/first_project");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));
app.use(flash())
// seedDB(); //seed the database
=======
    methodOverride = require("method-override");
//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")


mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view envgine", "ejs" );

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();
>>>>>>> 258a1dcff736f2bb4dc90eba2b696f7121b2e435

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
<<<<<<< HEAD


=======
>>>>>>> 258a1dcff736f2bb4dc90eba2b696f7121b2e435
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

<<<<<<< HEAD
app.post("/upload",upload.any(),function(req,res,next){
    var name = req.body.name;
    var image = req.files[0].path.replace("views/campgrounds/","");
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    
    var newCampground = {name: name, image: image, description: desc, author: author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
=======
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
>>>>>>> 258a1dcff736f2bb4dc90eba2b696f7121b2e435
   next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

<<<<<<< HEAD

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
=======
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
>>>>>>> 258a1dcff736f2bb4dc90eba2b696f7121b2e435
