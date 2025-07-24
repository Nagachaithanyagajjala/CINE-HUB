const {
  addToLikedMovies,
  removeFromLikedMovies,
  isLiked,
  addToRent
} = require("./usercontroller");

const router = require("express").Router();

router.get("/liked", isLiked);
router.post("/add", addToLikedMovies);
router.post("/remove", removeFromLikedMovies);
router.post("/rent", addToRent);
module.exports = router;