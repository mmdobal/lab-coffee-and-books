const express = require('express');

const router = express.Router();

const Place = require('../models/place.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/places', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('places', { places });
    })
    .catch((error) => {
      console.log(error);
    });
});


router.get('/addplace', (req, res, next) => {
  res.render('add-place');
});

router.post('/addplace', (req, res, next) => {
  const { name, type } = req.body;
  const newPlace = new Place({ name, type });
  newPlace.save()
    .then((place) => {
      res.redirect('/places');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/places/:id', (req, res, next) => {
  const placeId = req.params.id;
  Place.findOne({ _id: placeId })
    .then((place) => {
      res.render('place-details', { place });
    })
    .catch((error) => {
      console.log(error);
    });
});


router.get('/edit/:id', (req, res, next) => {
  Place.findOne({ _id: req.params.id })
    .then((place) => {
      res.render('edit-place', { place });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/edit', (req, res, next) => {
  const { name, type } = req.body;
  Place.update({ _id: req.query.placeId }, { $set: { name, type } })
    .then((place) => {
      res.redirect('/places');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/places/del/:id', (req, res, next) => {
  Place.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('/places');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
