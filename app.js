const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')
const routes = require('./routes') // 預設為 ./routes/index.js
const app = express()

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(routes)

app.listen(3000, () => {
  console.log('Express is listening on http://localhost:3000!')
})