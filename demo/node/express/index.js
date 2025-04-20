const express = require('express')

const app = express()

const port = 5008

app.get(
  '/',
  (req, res, next) => {
    // throw new Error('Error')
    res.send('Hello World!')
  }
  //   require('./routes/errormiddleware.js')
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
