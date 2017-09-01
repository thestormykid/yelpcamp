var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", isLoggedIn, function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
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

//NEW - show form to create new campground
router.get("/new", function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", isLoggedIn, function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// Edit campgrounds
router.get("/:id/edit",checkCampgroundOwnership, function(req, res) {

      
});

// Update campgrounds

router.put("/:id",function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err,foundCampground){
      if (err){
          res.redirect("/campgrounds");
      }else{
            res.redirect("/campgrounds/" + foundCampground._id);     
      } 
   }); 
    
});

// destroy campgrounds

router.delete("/:id", function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if (err){
            console.log()
        }
        res.redirect("/campgrounds");
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next){
      if (req.isAuthenticated()){
            Campground.findById(req.params.id,function(err, foundCampground){
     if (err){
            console.log("back");
    }  else{
           if (foundCampground.author.id.equals(req.user._id)){
                    next();
            }
            else{
            res.direct("back");
            }      
        }
    });
    }
}

module.exports = router;