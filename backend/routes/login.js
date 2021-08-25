const express = require('express')
const router = express.Router()
const logincontrollers = require('../controllers/login')
const loginvalidators = require('../validators/login')
const validate = require('../validate')

//register
router.post(
  '/register',
  loginvalidators.register(),
  validate,
  logincontrollers.register
)

//login
router.post(
  '/login',
  loginvalidators.login(),
  validate,
  logincontrollers.login
)

module.exports = router
