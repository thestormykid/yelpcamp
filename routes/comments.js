var express = require("express");
var router  = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


var routes = {
  views: {
    comments : require("./views/comments")
  }
}

router.get("/new",middleware.isLoggedIn, routes.views.comments.new);
router.post("/",middleware.isLoggedIn,routes.views.comments.create);
router.get("/:comment_id/edit", middleware.checkCommentOwnership, routes.views.comments.edit);
router.put("/:comment_id", middleware.checkCommentOwnership, routes.views.comments.update);
router.delete("/:comment_id", middleware.checkCommentOwnership, routes.views.comments.delete);

module.exports = router;
