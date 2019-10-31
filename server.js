
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port 3000 (?)`));
app.use(express.json({ limit: '1mb', }));

app.post('/api/rating', (req, res) => {
  console.log('post request');
  console.log(req.body);
  req.body ? res.sendStatus(200) : res.sendStatus(400);
});
