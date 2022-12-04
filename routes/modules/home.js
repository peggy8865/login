const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/', (req, res) => {
  const invalid = req.query.invalid
  // when a user trying to get any pages without logged-in state, then loginRequired = true
  const loginRequired = invalid ? false : (req.session.isLoggedIn === false)
  res.render('index', { invalid, loginRequired })
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email })
    .lean()
    .then(user => {
      if (user.password === password) {
        req.session.isLoggedIn = true
        const firstName = user.firstName
        res.render('welcome', { firstName })
      } else {
        res.redirect('/?invalid=1')
      }
    })
    .catch(error => {
      res.redirect('/?invalid=1')
    })
})

router.get('/lobby', (req, res) => {
  if (!req.session.isLoggedIn) {
    req.session.isLoggedIn = false
    res.redirect('/')
  } else {
    res.render('lobby')
  }
})

router.get('/logout', (req, res) => {
  req.session.isLoggedIn = null
  res.redirect('/')
})

module.exports = router