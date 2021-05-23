const withImages = require('next-images')
module.exports = withImages({
  env: { SERVER: "http://ciwin-zwallet.herokuapp.com/v1" }
})