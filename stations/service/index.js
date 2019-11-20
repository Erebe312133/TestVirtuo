const Station = require('../../database/station');

class StationService {
  static findAll() {
    return new Promise((resolve, reject) => {
      Station.find({}, (err, stations) => {
        if (err) {
          reject(err);
        } else {
          resolve(stations);
        }
      });
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      Station.findById(id, (err, station) => {
        if (err) {
          reject(err);
          return ;
        } else {
          resolve(station);
        }
      });
    })
  }

  static create(stationData) {
    const station = new Station(stationData);
    return new Promise((resolve, reject) => {
      station.save((err, savedStation) => {
        if (err) {
          reject(err);
          return ;
        } else {
          resolve(savedStation);
        }
      });
    });
  }

  static update(id, stationData) {
    return new Promise((resolve, reject) => {
      Station.findById(id, (err, station) => {
        if (err || !station) {
          reject({ isNotFound: true, err});
          return ;
        }
        station.name = stationData.name;
        station.save((err, savedStation) => {
          if (err) {
            reject(err);
          } else {
            resolve(savedStation);
          }
        });  
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      Station.deleteOne({ _id: id }, (err) => {
        if (err) {
          reject(err);
          return ;
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = StationService;