const User = require('../models/user')
const bcrypt = require('bcrypt')
const utils = require('../utils')

//register
const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);

  try {
    const user = new User(
      {name, email, password}
    )
    await user.save()
    return res.json(
      {
        status: 1,
        msg: 'user registered success'
      }
    )
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

//login
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await User.findOne({email})
  if (!result) {
    return res.json(
      {
        status: 0,
        msg: 'wrong credentials'
      }
    )
  }

  if (!await bcrypt.compare(password, result.password)) {
    return res.json(
      {
        status: 0,
        msg: 'wrong credentials'
      }
    )
  }


  return res.json(
    {
      status: 1,
      msg: 'login success',
      token: await utils.generate_token({_id: result._id, name: result.name, email: result.email})
    }
  )

}

module.exports = {
  register,
  login
}
