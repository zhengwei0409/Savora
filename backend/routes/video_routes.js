const express = require("express");
const router = express.Router();
const { getAllVideos } = require("../controller/video_controller");

router.get("/", getAllVideos);

module.exports = router;