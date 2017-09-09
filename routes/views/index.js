var passport = require("passport");
var User = require("../../models/user");

module.exports = {

	landing: function(req, res) {
    	res.render("landing");
	},

	registerPage: function(req, res) {
	   res.render("register");
	},

	registerUser: function(req, res) {
	    var newUser = new User({
	      username: req.body.username,
	      email: req.body.email
	    });

	    User.register(newUser, req.body.password, function(err, user) {
	        if(err) {
	            console.log(err);
	            return res.render("register");
	        }

	        passport.authenticate("local")(req, res, function() {
	           res.redirect("/campgrounds");
	        });
	    });
	},

	loginPage: function(req, res) {
   		res.render("login");
	},

	logout:   function(req, res) {
	   req.logout();
	   req.flash("success" , "logged you out!!!")
	   res.redirect("/campgrounds");
	}
}
