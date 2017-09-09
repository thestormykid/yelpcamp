var Campground = require("../..//models/campground");


module.exports = {

	landing: function(req, res) {
    // Get all campgrounds from DB
	    Campground.find({})
	     .sort({'updated': 'desc'})
	     .exec(function(err, allCampgrounds) {
		    if (err) {
		        console.log(err);
		    }

		    res.render("campgrounds/index",{campgrounds:allCampgrounds})
     	});
	},

	addPhotos: function(req, res) {
    // Get all campgrounds from DB
	   	var name = req.body.name;
	    var image = req.body.image;
	    var desc = req.body.description;
	    var author = {
	        id: req.user._id,
	        username: req.user.username
	    }
	    var newCampground = { name: name, image: image, description: desc, author:author }

	    // Create a new campground and save to DB
	    Campground.create(newCampground, function(err, newlyCreated) {
	        if(err) {
	            console.log(err);
	        } else {
	            //redirect back to campgrounds page
	            console.log(newlyCreated);
	            res.redirect("/campgrounds");
	        }
	    });

	},

	new:  function(req, res) {
		res.render("campgrounds/new");
	},

	showInfo : function(req, res) {
    //find the campground with provided ID
	    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
	        if(err) {
	            console.log(err);
	        } else {
	            //render show template with that campground
	            res.render("campgrounds/show", { campground: foundCampground });
	        }
	    });
	},

	edit:  function(req, res) {
	    Campground.findById(req.params.id, function(err, foundCampground) {
	        res.render("campgrounds/edit", { campground: foundCampground });
	    });
	},

	update: function(req, res) {
    	// find and update the correct campground
	    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
	       if(err) {
	           res.redirect("/campgrounds");
	       } else {
	           //redirect somewhere(show page)
	           res.redirect("/campgrounds/" + req.params.id);
	       }
	    });
	},

	delete: function(req, res) {
		Campground.findByIdAndRemove(req.params.id, function(err) {
	      if(err) {
	          res.redirect("/campgrounds");
	      } else {
	          res.redirect("/campgrounds");
	      }
	   	});
	}


}
