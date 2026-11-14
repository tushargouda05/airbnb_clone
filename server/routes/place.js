const express = require("express");
const { isLoggedIn } = require("../middlewares/user");
const {
  addPlace, getPlaces, getUserPlaces,
  getPlaceById, updatePlace, deletePlace,
} = require("../controllers/placeController");

const router = express.Router();

router.route("/").get(getPlaces).post(isLoggedIn, addPlace);

// Must come before "/:id", or "user-places" is treated as an id
router.route("/user-places").get(isLoggedIn, getUserPlaces);

router
  .route("/:id")
  .get(getPlaceById)
  .put(isLoggedIn, updatePlace)
  .delete(isLoggedIn, deletePlace);

module.exports = router;