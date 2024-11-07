require('dotenv').config()

const PORT = process.env.PORT

/*
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
*/

let MONGODB_URI
if (process.env.NODE_ENV !== 'production') {
  MONGODB_URI = process.env.TEST_MONGODB_URI_ENV
} else {
  MONGODB_URI = process.env.MONGODB_URI_ENV
}

module.exports = {
  MONGODB_URI,
  PORT
}