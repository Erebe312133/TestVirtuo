const Station = require('../../database/station');

class StationService {
  static findAll() {
    return new Promise((resolve, reject) => {
      Station.find({}, (err, stations) => {
        if (err) {
          reject(err);
        }
        resolve(stations);
      });
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      Station.findById(id, (err, station) => {
        if (err) {
          reject(err);
        }
        resolve(station);
      });
    })
  }

  static create(stationData) {
    const station = new Station(stationData);
    return new Promise((resolve, reject) => {
      station.save((err, savedStation) => {
        if (err) {
          reject(err);
        }
        resolve(savedStation);
      });
    });
  }

  static update(id, stationData) {
    return new Promise((resolve, reject) => {
      Station.findById(id, (err, station) => {
        if (err) {
          reject({ isNotFound: true, err});
        }
        station.name = stationData.name;
        station.save((err, savedStation) => {
          if (err) {
            reject(err);
          }
          resolve(savedStation);
        });  
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      Station.remove({ _id: id }, (err, savedStation) => {
        if (err) {
          reject(err);
        }
        resolve(savedStation);
      });
    });
  }
}

module.exports = StationService;