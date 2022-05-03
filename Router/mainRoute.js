const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const schedule = require('node-schedule');

// includes controller
const video_controller = require("../Controller/videoController")
const music_controller = require("../Controller/musicController");
const user_controller = require('../Controller/userController')
// Test 
router.get('/test', video_controller.test);

// Video Route
router.get('/video', video_controller.getAllVideo)
router.post('/video', video_controller.addVideo)

// Music controller
router.get('/music', music_controller.getAllMusic);
router.post('/music', music_controller.addMusic);

// User Route
router.post('/user', user_controller.createUser)
module.exports = router;