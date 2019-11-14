
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port 3000 (?)`));
app.use(express.json({ limit: '1mb', }));

const places = [
  {
    place: 'death valley, usa',
    rating: 2,
  },
  {
    place: 'tampere',
    rating: 4,
  },
];
app.get('/api/paikat', (req, res) => {
  res.send(places);
});

app.post('/api/rating', (req, res) => {
  console.log('post request');
  console.log(req.body);
  req.body ? res.sendStatus(200) : res.sendStatus(400);
});
