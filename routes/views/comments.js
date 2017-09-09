var Campground = require("../../models/campground");
var Comment = require("../../models/comment");

module.exports = {

	new: function(req, res) {
	    Campground.findById(req.params.id, function(err, campground) {
	        if(err) {
	            console.log(err);
	        } else {
	             res.render("comments/new", { campground: campground });
	        }
	    })
	},

	create: function(req, res) {
   		//lookup campground using ID

	   Campground.findById(req.params.id, function(err, campground) {
	       if(err) {
	           console.log(err);
	           res.redirect("/campgrounds");
	       } else {
	        Comment.create(req.body.comment, function(err, comment) {
	           if(err) {
	               console.log(err);
	           } else {
	               //add username and id to comment
	               comment.author.id = req.user._id;
	               comment.author.username = req.user.username;
	               //save comment
	               comment.save();
	               campground.comments.push(comment);
	               campground.save();

	               res.redirect('/campgrounds/' + campground._id);
	           }
	        });
	       }
	   });
	},

	edit:  function(req, res) {
	   	Comment.findById(req.params.comment_id, function(err, foundComment) {
	      if(err) {
	          res.redirect("back");
	      } else {
	        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	      }
	   	});
	},

	update:  function(req, res) {
	   	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
	     	if(err) {
	          res.redirect("back");
	      	} else {
	          res.redirect("/campgrounds/" + req.params.id );
	      	}
	   	});
	},

	delete:  function(req, res) {
  		Comment.findByIdAndRemove(req.params.comment_id, function(err) {
	       if(err) {
	           res.redirect("back");
	       } else {
	           res.redirect("/campgrounds/" + req.params.id);
	       }
	    });
	}

}
