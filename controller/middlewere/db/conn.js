// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'learner',
//   host: 'localhost',
//   database: 'rocket',
//   password: '123456',
//   port: 5432,
// });

const {Pool} = require('pg')

// const pool = new Pool({
//     connectionString:"postgres://postgres:postgres@172.245.187.22:5432/V0",
// });
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'sanjay',
    port: 5432,
  })

module.exports = pool;


//   pass word for postgres
// admin = Home
// user = sanjay