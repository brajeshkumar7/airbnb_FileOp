const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const { error } = require('console');
const Favourite = require('./favourite');
const homeDataPath = path.join(rootDir, 'data', 'homes.json');

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }
    save() {
        Home.fetchAll(registeredHomes => {
            if (this.id) {
                registeredHomes = registeredHomes.map(home => home.id === this.id ? this : home)
            }
            else {
                this.id = Math.random().toString();
                registeredHomes.push(this);
            }
            const homeDataPath = path.join(rootDir, 'data', 'homes.json')
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), err => {
                console.log("error occured", err);
            })
        })

    }
    static fetchAll(callback) {

        fs.readFile(homeDataPath, (err, data) => {
            if (!err) {
                callback(JSON.parse(data));
            }
            else {
                callback([]);
            }

        });
    }

    static findById(homeId, callback) {
        this.fetchAll(homes => {
            const homeFound = homes.find(home => home.id === homeId);
            callback(homeFound);
        })
    }
    static deleteById(homeId, callback) {
        this.fetchAll(homes => {
            homes = homes.filter(home => home.id !== homeId);
            fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
                Favourite.deleteById(homeId, callback);
            })
        })
    }

}