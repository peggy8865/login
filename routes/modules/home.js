const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/', (req, res) => {
  const invalid = req.query.invalid
  res.render('index', { invalid })
})

router.post('/login', (req, res) => {
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

module.exports = router