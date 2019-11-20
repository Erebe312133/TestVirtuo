const Car = require('../../database/car');

class CarService {
  static findAll() {
    return new Promise((resolve, reject) => {
      Car.find({}, (err, cars) => {
        if (err) {
          reject(err);
        } else {
          resolve(cars);
        }
      });
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      Car.findById(id, (err, car) => {
        if (err) {
          reject(err);
        } else {
          resolve(car);
        }
      });
    })
  }

  static create(carData) {
    const car = new Car(carData);
    return new Promise((resolve, reject) => {
      car.save((err, savedCar) => {
        if (err) {
          reject(err);
        } else {
          resolve(savedCar);
        }
      });
    });
  }

  static update(id, carData) {
    return new Promise((resolve, reject) => {
      Car.findById(id, (err, car) => {
        if (err) {
          reject({ isNotFound: true, err});
          return ;
        }
        car.name = carData.name;
        car.stationId = carData.stationId;
        car.available = carData.available;
        car.save((err, savedCar) => {
          if (err) {
            reject(err);
          } else {
            resolve(savedCar);
          }
        });  
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      Car.deleteOne({ _id: id }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = CarService;