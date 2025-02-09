const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');

module.exports = class Favourite {

    static addToFavourite(homeId, callback) {
        Favourite.getFavourites(favourites => {
            if (favourites.includes(homeId)) {
                callback('this home is already in the favourites');
            }
            else {
                favourites.push(homeId);
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
            }
        }
        )
    }
    static getFavourites(callback) {

        fs.readFile(favouriteDataPath, (err, data) => {
            if (!err) {
                callback(JSON.parse(data));
            }
            else {
                callback([]);
            }

        });
    }
    static deleteById(delHomeId, callback) {
        Favourite.getFavourites(homesIds => {
            homesIds = homesIds.filter(homeId => delHomeId !== homeId);
            fs.writeFile(favouriteDataPath, JSON.stringify(homesIds), callback)
        })
    }

}