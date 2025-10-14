const express = require("express");
const auth = require("../middleware/auth");
const favoriteController = require("../controllers/favorite_tracks");

const router = new express.Router();

// routes
router.get("/", auth, favoriteController.index);
router.post("/", auth, favoriteController.create);
router.delete("/:id", auth, favoriteController.remove);

module.exports = router;
