const withImages = require('next-images')
module.exports = withImages({
  env: { SERVER: "https://ciwin-zwallet.herokuapp.com/v1" }
})