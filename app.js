const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')
const User = require('./models/user')
const app = express()

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  const invalid = req.query.invalid
  res.render('index', { invalid })
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email })
    .lean()
    .then(user => {
      const firstName = user.firstName
      if (user.password === password) {
        res.render('welcome', { firstName })
      } else {
        res.redirect('/?invalid=1')
      }
    })
    .catch(error => {
      res.redirect('/?invalid=1')
    })
})

app.listen(3000, () => {
  console.log('Express is listening on http://localhost:3000!')
})