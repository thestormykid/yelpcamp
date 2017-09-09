var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// controllers of the routes
var routes = {
  views: {
    campground : require("./views/Campground")
  }
}

// Campgrounds Routes
router.get("/", routes.views.campground.landing);
router.post("/", middleware.isLoggedIn, routes.views.campground.addPhotos);
router.get("/new", middleware.isLoggedIn, routes.views.campground.new);
router.get("/:id", routes.views.campground.showInfo);
router.get("/:id/edit", middleware.checkCampgroundOwnership, routes.views.campground.edit);
router.put("/:id",middleware.checkCampgroundOwnership, routes.views.campground.update);
router.delete("/:id",middleware.checkCampgroundOwnership, routes.views.campground.delete)

module.exports = router;
