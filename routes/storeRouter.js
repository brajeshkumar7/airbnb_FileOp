const express = require('express');
const storeRouter = express.Router();
const { getIndex, getHomes, getBookings, getFavouriteList, getHomeDetails, addPostFavouriteList, postDeleteFavourite } = require('../controllers/storeController');



storeRouter.get("/", getIndex);
storeRouter.get("/homes", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourites", getFavouriteList);
storeRouter.post("/favourites", addPostFavouriteList);
storeRouter.get("/homes/:homeId", getHomeDetails);
storeRouter.post('/favourites/delete/:homeId', postDeleteFavourite);


module.exports = storeRouter;