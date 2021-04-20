const { main } = require('./dist/index.js')

main()
  .then((status) => process.exit(status))
  .catch((error) => { console.error(error.message) ; process.exit(1) })