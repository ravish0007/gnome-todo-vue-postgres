require('dotenv').config()

const config = {

  db: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
  },
  port: process.env.SERVER_PORT
}

module.exports = config
