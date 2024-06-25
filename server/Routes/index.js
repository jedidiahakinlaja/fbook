const express = require('express');

const userController = require("../Controllers/user");
const imageController = require("../Controllers/image");
const profilesController = require("../Controllers/img");
const friendController = require("../Controllers/friend");
const route = express.Router();
const storage= require("../Helpers/storage");

route.post('/register', userController.postRegister);
route.post('/login',userController.postlogin);
route.post('/upload',imageController.image);
route.get('/user',userController.getUsers);
route.get('/users/:usernameId',userController.getUserByUsername);
route.get('/email/:emailId',userController.getUserByEmail);
route.get('/users/:id',userController.getUserById);
route.get('/profile', profilesController.getProfiles);
route.post('/uploads', storage, profilesController.postProfile);
route.get('/profile/:usernameId',profilesController.getImageByUsername);
route.post('/friendrequest',friendController.friendRegister);
route.get('/friend',friendController.getFriends);

module.exports = route;