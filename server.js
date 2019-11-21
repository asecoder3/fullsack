
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port 3000 (?)`));
app.use(express.json({ limit: '1mb', }));

const places = [
  {
    place: 'death valley, usa',
    rating: 2,
    lat: 40,
    long: -110,
  },
  {
    place: 'tampere',
    rating: 4,
    lat: 60,
    long: 20,
  },
];
app.get('/api/paikat', (req, res) => {
  res.send(places);
});

app.post('/api/rating', (req, res) => {
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
