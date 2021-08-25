const {body} = require('express-validator');
const Checklist = require('../models/checklist')

//add_checklist
const add_checklist = () => {
  return [
    body('name').notEmpty().withMessage('name is req').bail()
      .custom(
        async (value, {req}) => {
          if (await Checklist.findOne({name: value})) {
            throw new Error(`checklist already exist`)
          }
          return true
        }
      )
  ]
}

module.exports = {
  add_checklist
}
