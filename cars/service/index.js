const Car = require('../../database/car');

class CarService {
  static findAll() {
    return new Promise((resolve, reject) => {
      Car.find({}, (err, cars) => {
        if (err) {
          reject(err);
        }
        resolve(cars);
      });
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      Car.findById(id, (err, car) => {
        if (err) {
          reject(err);
        }
        resolve(car);
      });
    })
  }

  static create(carData) {
    const car = new Car(carData);
    return new Promise((resolve, reject) => {
      car.save((err, savedCar) => {
        if (err) {
          reject(err);
        }
        resolve(savedCar);
      });
    });
  }

  static update(id, carData) {
    return new Promise((resolve, reject) => {
      Car.findById(id, (err, car) => {
        if (err) {
          reject({ isNotFound: true, err});
        }
        car.updateOne(carData, (err, savedCar) => {
          if (err) {
            reject(err);
          }
          resolve(savedCar);
        });  
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      Car.remove({ _id: id }, (err, savedCar) => {
        if (err) {
          reject(err);
        }
        resolve(savedCar);
      });
    });
  }
}

module.exports = CarService;