require('dotenv').config()
const jwt = require('jsonwebtoken')

const generate_token = async (data) => {
  return await jwt.sign(
    data,
    process.env.JWT_ACCESS_TOKEN_SECRET
  )
}

const check_token = async (token) => {
  return await jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET
  )
}


module.exports = {
  generate_token,
  check_token
}
