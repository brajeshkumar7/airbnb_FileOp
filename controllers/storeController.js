const Favourite = require('../models/favourite');
const Home = require('../models/home');


exports.getIndex = (req, res, next) => {
    Home.fetchAll((registeredHomes) => res.render('store/index', { registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'index' }));
}
exports.getHomes = (req, res, next) => {
    Home.fetchAll((registeredHomes) => res.render('store/home-list', { registeredHomes: registeredHomes, pageTitle: 'Homes List', currentPage: 'Home' }));

}
exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: 'My Bookings', currentPage: 'bookings' });

}
exports.getFavouriteList = (req, res, next) => {
    Favourite.getFavourites(favourites => {
        Home.fetchAll((registeredHomes) => {
            const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id))
            res.render('store/favourite-list', { favouriteHomes: favouriteHomes, pageTitle: 'My favourites', currentPage: 'favourites' })
        });
    })

}
exports.postDeleteFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId, err => {
        if (err) {
            console.log('error occured while deleting from favourite', err)
        }
        res.redirect('/favourites')
    })
}
exports.addPostFavouriteList = (req, res, next) => {
    Favourite.addToFavourite(req.body.id, (err) => {
        if (err) {
            console.log('error occured while adding to favourite', err);
        }
        res.redirect('/favourites');
    })

}

exports.getHomeDetails = (req, res, next) => {
    //we will get all the variables of the data
    const homeId = req.params.homeId;
    Home.findById(homeId, home => {
        if (!home) {
            res.redirect('/homes');
        }
        else {

            res.render('store/home-details', { home: home, pageTitle: 'Home Details', currentPage: 'Home' });
        }
    })

}