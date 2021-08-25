const {body} = require('express-validator');
const User = require('../models/user')

//register
const register = () => {
  return [
    body('name').notEmpty().withMessage('name is req').bail()
      .custom(
        async (value, {req}) => {
          if (await User.findOne({name: value})) {
            throw new Error(`name already exists`)
          }
          return true
        }
      ),
    body('email').notEmpty().withMessage('email is req').bail()
      .isEmail().withMessage('email is not valid!!').bail()
      .custom(
        async (value, {req}) => {
          if (await User.findOne({email: value})) {
            throw new Error(`email already exists`)
          }
          return true
        }
      ),
    body('password').notEmpty().withMessage('password is req').bail()
      .custom(
        (value, {req}) => {
          const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
          if (!regex.test(value)) {
            throw new Error(`password must be min 8 characters long and must contain uppercase, lowercase, digit and special character`)
          }
          return true
        }
      )

  ]
}

//login
const login = () => {
  return [
    body('email').notEmpty().withMessage('email is req').bail()
      .isEmail().withMessage('email is not valid!!'),
    body('password').notEmpty().withMessage('password is req')
  ]
}

module.exports = {
  register,
  login
}
