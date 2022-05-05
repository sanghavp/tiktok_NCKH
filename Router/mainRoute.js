const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
// const schedule = require('node-schedule');
const passportConfig = require('../middleware/passport')


// includes controller
const video_controller = require("../Controller/videoController")
const music_controller = require("../Controller/musicController");
const user_controller = require('../Controller/userController')
const search_controller = require('../Controller/searchController')
// Test 
router.get('/test', video_controller.test);

// Video Route
router.get('/video', video_controller.getAllVideo)
router.post('/video', video_controller.addVideo)

// Music route
router.get('/music', music_controller.getAllMusic);
router.post('/music', music_controller.addMusic);

// User Route
router.post('/user', user_controller.createUser)
router.get('/user', passport.authenticate('jwt', {session: false}), user_controller.getAllUser)
router.get('/user/:id',  user_controller.getAnUser)
router.put('/user/:id', passport.authenticate('jwt', {session: false}), user_controller.updateUser)
router.delete('/user/:id', passport.authenticate('jwt', {session: false}), user_controller.deleteUser)
router.post('/user/login',  user_controller.user_login);
router.post('/user/refresh/:id',passport.authenticate('jwt', {session: false}), user_controller.refreshToken);

// Search key route
router.post('/searchKey', passport.authenticate('jwt', {session: false}), search_controller.addSearchKey);
router.get('/searchKey', passport.authenticate('jwt', {session: false}), search_controller.getSearchKey);
module.exports = router;