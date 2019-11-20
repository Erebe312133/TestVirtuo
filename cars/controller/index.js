const router = require('express').Router();
const service = require('../service');

router.get('/', async (req, res) => {
  res.json(await service.findAll());
});

router.get('/:id', async (req, res) => {
  service.find(req.params.id).then((car) => {
    if (car) {
      res.json(car);
    }
    res.sendStatus(404);
  }).catch(() => {
    res.sendStatus(404);
  })
});

router.post('/', async (req, res) => {
  service.create(req.body).then((car) => {
    res.status(201).send(car);
  }).catch(() => {
    res.sendStatus(400);
  });
});

router.put('/:id', async (req, res) => {
  service.update(req.params.id, req.body).then((car) => {
    res.status(200).send(car);
  }).catch((err) => {
    if (err.isNotFound) {
      res.sendStatus(404);
    } else {
      res.sendStatus(400);
    }
  });;
});

router.delete('/:id', async (req, res) => {
  service.delete(req.params.id).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(404);
  });;
});

module.exports = router;