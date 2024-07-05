const express = require('express');

const userController = require("../Controllers/user");
const imageController = require("../Controllers/image");
const profilesController = require("../Controllers/img");
const friendController = require("../Controllers/friend");
const postPicsController = require("../Controllers/picspost");
const route = express.Router();
const storage= require("../Helpers/storage");
const helps = require("../Helpers/imagehelp")


// USER
route.post('/register', userController.postRegister);
route.post('/login',userController.postlogin);
route.post('/upload',imageController.image);
route.get('/user',userController.getUsers);
route.patch('/user/:id',userController.putUsers);
route.get('/users/:usernameId',userController.getUserByUsername);
route.get('/email/:emailId',userController.getUserByEmail);
route.get('/user/:id',userController.getUserById);
route.get('/profile', profilesController.getProfiles);
route.post('/uploads', storage, profilesController.postProfile);
route.get('/profile/:usernameId',profilesController.getImageByUsername);
route.put('/user/:id', helps, userController.putImageById);
route.patch('/imagepost/:id',helps, userController.putImagePostById);

// Friend
route.post('/friendrequest',friendController.friendRegister);
route.get('/friend',friendController.getFriends);
route.post('/friendrequests',friendController.newFriend);
route.get('/friend/:senderId',friendController.getBySenderId);
route.get('/checkfriendrequest/:receiverId', friendController.getByReceiverId);
route.patch('/friend/:id', friendController.putById);


// POST
route.get('/post',postPicsController.getPics);
route.post('/post', helps, postPicsController.PostPics);
route.get('/post/:senderId', postPicsController.getsenderId);


// Forget Password
route.patch('/userchange/:id', userController.changePassword);
route.post('/forgetpassword', userController.forgetPassword);

module.exports = route; 