const express = require('express');
const hostRouter = express.Router();
const { getHostHomes, getAddHome, getEditHome, postEditHome, postDeleteHome } = require('../controllers/hostController');
const { postAddHome } = require('../controllers/hostController');


hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.post('/edit-home', postEditHome);
hostRouter.get("/host-home-list", getHostHomes);
hostRouter.get('/edit-home/:homeId', getEditHome);
hostRouter.post('/delete-home/:homeId', postDeleteHome);


exports.hostRouter = hostRouter;