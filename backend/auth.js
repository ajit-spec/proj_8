const utils = require('./utils')
const User = require('./models/user')

const isauthenticated = async (req, res, next) => {

  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.json(
      {
        status: 0,
        msg: 'not authenticated'
      }
    )
  }

  try {

    const verify = await utils.check_token(token)

    const user = await User.findById(verify._id)
    if (!user) {
      return res.json(
        {
          status: 0,
          msg: 'not authenticated'
        }
      )
    }

    req.user = user
    return next()

  } catch (e) {
    console.log(e.message)
    return res.json(
      {
        status: 0,
        msg: e.message
      }
    )
  }

}

module.exports = isauthenticated
