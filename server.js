
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port 3000 (?)`));
app.use(express.json({ limit: '1mb', }));

const places = [
  {
    place: 'death valley, usa',
    rating: {
      stars: 0,
      text: 'too hot',
    },
    lat: 23.75280600,
    log: 61.50081830,
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
