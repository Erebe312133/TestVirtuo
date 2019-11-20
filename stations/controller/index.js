const router = require('express').Router();
const service = require('../service');

router.get('/', async (req, res) => {
  res.json(await service.findAll());
});

router.get('/:id', async (req, res) => {
  service.find(req.params.id).then((station) => {
    if (station) {
      res.json(station);
    }
    res.sendStatus(404);
  }).catch(() => {
    res.sendStatus(404);
  })
});

router.post('/', async (req, res) => {
  service.create(req.body).then((station) => {
    res.status(201).send(station);
  }).catch(() => {
    res.sendStatus(400);
  });
});

router.put('/:id', async (req, res) => {
  service.update(req.params.id, req.body).then((station) => {
    res.status(200).send(station);
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