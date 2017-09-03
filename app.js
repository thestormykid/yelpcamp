var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    FacebookStrategy = require('passport-facebook');
    methodOverride = require("method-override"),

    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),

    flash       = require ('connect-flash');
var multer      = require("multer"),
    upload      = multer({ dest: 'views/campgrounds' });

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

// mongoose.connect("mongodb://localhost/yelp_camp_v10");
//mongoose.connect("mongodb://hanu:delhi123@ds143191.mlab.com:43191/first_project");
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));
app.use(flash())

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is coding",
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


passport.use(new FacebookStrategy ({
    clientID: '640275096164486',
    clientSecret: '5be315a5d6c1f9dd4d7463df4b78536e',
    callbackURL: 'http://localhost:8000/login/facebook/return'
  }, function(accessToken, refreshToken, profile, cb) {
        process.nextTick(function() {
                    console.log(profile)
            User.findOne({ username: profile.displayName }).exec(function(err, UserFromFacebook) {
                if (err) {
                    return cb(err);
                }

                if (UserFromFacebook) {
                    return cb(null, UserFromFacebook);
                } else  {
                    var NewUser =  new User();
                    NewUser.name = profile.displayName;
                    NewUser.username = profile.displayName;
                    NewUser.token = accessToken;
                    NewUser.save(function(err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                    return cb(null, NewUser);
                }
            })
        })
  }));


// passport.serializeUser(User.serializeUser());
passport.serializeUser(function(user, cb) {
    // console.log(User);
  cb(null, user._id);
});

passport.deserializeUser(function(id,cb) {
    // console.log(User);
    User.findById(id, function(err, user) {
        console.log(user);
        cb(err, user);
    })
});


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
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   console.log(req.user);
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(8000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
