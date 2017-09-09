var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

var routes = {
  views: {
    index: require("./views/index")
  }
}

//root route
router.get("/",  routes.views.index.landing);
// show register form
router.get("/register", routes.views.index.registerPage);
//handle sign up logic
router.post("/register", routes.views.index.registerUser);

//show login form
router.get("/login", routes.views.index.loginPage);

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

// logout route
router.get("/logout", routes.views.index.logout);

router.get('/login/facebook/return',
   passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/campgrounds' }));

router.get('/login/facebook',passport.authenticate('facebook',{ scope: ['email'] }));


router.get('/login/google',passport.authenticate('google',{ scope: ['profile'] }));


router.get('/google/auth/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/campgrounds');
});

module.exports = router;
