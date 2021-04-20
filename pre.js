const { pre } = require('./dist/index.js')

pre()
  .then((status) => process.exit(status))
  .catch((error) => { console.error(error.message) ; process.exit(1) })