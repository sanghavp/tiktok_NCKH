const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
// const schedule = require('node-schedule');
const passportConfig = require('../middleware/passport')
const cors = require('cors');


// includes controller
const video_controller = require("../Controller/videoController")
const music_controller = require("../Controller/musicController");
const user_controller = require('../Controller/userController')
const search_controller = require('../Controller/searchController')
// Test
router.get('/test', video_controller.test);

// Video Route
router.get('/video', cors(), video_controller.getAllVideo)
router.post('/video', cors(), video_controller.addVideo)

// Music route
router.get('/music', cors(), music_controller.getAllMusic);
router.post('/music', cors(), music_controller.addMusic);

// User Route
router.post('/user',cors(), user_controller.createUser)
router.get('/user', passport.authenticate('jwt', {session: false}),cors(), user_controller.getAllUser)
router.get('/user/:id', cors(), user_controller.getAnUser)
router.put('/user/:id', passport.authenticate('jwt', {session: false}),cors(), user_controller.updateUser)
router.delete('/user/:id', passport.authenticate('jwt', {session: false}),cors(), user_controller.deleteUser)
router.post('/user/login', cors(), user_controller.user_login);
router.post('/user/refresh/:id',passport.authenticate('jwt', {session: false}),cors(), user_controller.refreshToken);

// Search key route
router.post('/searchKey', passport.authenticate('jwt', {session: false}), cors(), search_controller.addSearchKey);
router.get('/searchKey', passport.authenticate('jwt', {session: false}), cors(), search_controller.getSearchKey);
router.delete('/searchKey/:id', passport.authenticate('jwt', {session: false}), cors(), search_controller.deleteSearchKey);

module.exports = router;