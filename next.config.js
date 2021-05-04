const withImages = require('next-images')
module.exports = withImages({
  env: {
    SERVER: "http://localhost:2345/v1",
    DB_HOST: "localhost",
    DB_PORT: 5432,
    DB_NAME: "zwallet",
    DB_USER: "ciwin_arkademy",
    DB_PASS: "password"
  },
})