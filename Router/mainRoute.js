const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const schedule = require('node-schedule');

// includes controller
const video_controller = require("../Controller/videoController")

router.get('/test', video_controller.test);
router.get('/video', video_controller.getAllVideo)
router.post('/video', video_controller.addVideo)

module.exports = router;