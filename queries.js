const { Pool } = require('pg');
const pool = new Pool({
  user: 'atte',
  host: 'localhost',
  database: 'fullstack_kartta',
  password: 'password',
  port: 5432,
})

module.exports = {
  haePaikat: (request, response) => {
    pool.query('SELECT * FROM paikat ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    })
  },
  addPaikka: (request, response) => {
    const { paikka, arvostelu, longitude, latitude } = request.body;

    pool.query('INSERT INTO paikat (paikka, arvostelu, longitude, latitude) VALUES ($1, $2, $3, $4)', [paikka, arvostelu, longitude, latitude], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('ok')
    })
  },
};
