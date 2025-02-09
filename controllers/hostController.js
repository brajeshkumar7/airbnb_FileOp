const Home = require('../models/home');


exports.getAddHome = (req, res, next) => {
    res.render('host/edit-home', { pageTitle: 'Add Home to airbnb', currentPage: 'addHome', editing: false });
}
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    Home.findById(homeId, home => {
        if (!home) {
            console.log('home not found for the given id');
            return res.redirect('/host/host-home-list');
        }
        console.log(homeId, editing, home);
        res.render('host/edit-home', {
            pageTitle: 'Edit Home',
            currentPage: 'host-homes',
            editing: editing,
            home: home
        });
    })

}
exports.getHostHomes = (req, res, next) => {
    Home.fetchAll((registeredHomes) => res.render('host/host-home-list', { registeredHomes: registeredHomes, pageTitle: ' Host Homes List', currentPage: 'host-homes' }));

}
exports.postAddHome = (req, res, next) => {
    const home = new Home(req.body.houseName, req.body.price, req.body.location, req.body.rating, req.body.photoUrl);
    home.save();
    res.redirect('/host/host-home-list')

}
exports.postEditHome = (req, res, next) => {
    const id = req.body.id;
    const home = new Home(req.body.houseName, req.body.price, req.body.location, req.body.rating, req.body.photoUrl);
    home.id = id;
    home.save();
    res.redirect('/host/host-home-list');
}
exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.deleteById(homeId, err => {
        if (err) {
            console.log('error occured while deleting', err)
        }
    })
    res.redirect('/host/host-home-list');
}