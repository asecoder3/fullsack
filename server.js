
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port 3000 (?)`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));

app.get('/api/paikat/old', (req, res) => {
  res.send(places);
});

app.post('/api/rating/old', (req, res) => {
  console.log('post request');
  console.log(req.body);
  req.body ? res.sendStatus(200) : res.sendStatus(400);
  places.push({
    place: req.body.place,
    rating: req.body.rating,
    lat: req.body.lat,
    long: req.body.long,
  });
});

app.get('/api/paikat', db.haePaikat)
app.post('/api/rating', db.addPaikka)
