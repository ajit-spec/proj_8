const Checklist = require('../models/checklist')

//add_checklist
const add_checklist = async (req, res) => {
  const name = req.body.name
  const user_id = req.user._id

  const checklist = new Checklist(
    {
      name,
      iscompleted: false,
      user_id
    }
  )

  await checklist.save()
  return res.json(
    {
      status: 1,
      msg: 'new checklist added'
    }
  )
}

//edit_checklist
const edit_checklist = async (req, res) => {
  const name = req.body.name
  const checklist_id = req.params.checklist_id

  const result = await Checklist.findById(checklist_id)
  if (!result) {
    return res.json(
      {
        status: 0,
        msg: 'checklist not found'
      }
    )
  }

  if (!req.user._id.equals(result.user_id)) {
    return res.json(
      {
        status: 0,
        msg: 'you are not allowed to edit this checklist'
      }
    )
  }

  await Checklist.findByIdAndUpdate(
    checklist_id,
    {name}
  )

  return res.json(
    {
      status: 1,
      msg: 'checklist edited'
    }
  )
}

//delete_checklist
const delete_checklist = async (req, res) => {
  const checklist_id = req.params.checklist_id
  const result = await Checklist.findById(checklist_id)
  if (!result) {
    return res.json(
      {
        status: 0,
        msg: 'checklist not found'
      }
    )
  }

  if (!req.user._id.equals(result.user_id)) {
    return res.json(
      {
        status: 0,
        msg: 'you are not allowed to delete this checklist'
      }
    )
  }

  await Checklist.findByIdAndDelete(
    checklist_id
  )

  return res.json(
    {
      status: 1,
      msg: 'checklist deleted'
    }
  )
}

//get_checklist
const get_checklist = async (req, res) => {
  const result = await Checklist.find(
    {user_id: req.user._id}
  )
  return res.json(
    {
      status: 1,
      data: result
    }
  )
}

//get_single_checklist
const get_single_checklist = async (req, res) => {
  const checklist_id = req.params.checklist_id
  const result = await Checklist.findById(checklist_id)
  return res.json(
    {
      status: 1,
      data: result
    }
  )
}

//complete_checklist
const complete_checklist = async (req, res) => {
  const checklist_id = req.params.checklist_id
  const iscompleted = req.body.iscompleted
  const result = await Checklist.findById(checklist_id)
  if (!result) {
    return res.json(
      {
        status: 0,
        msg: 'checklist not found'
      }
    )
  }
  if (!req.user._id.equals(result.user_id)) {
    return res.json(
      {
        status: 0,
        msg: 'you are not allowed to this checklist as completed'
      }
    )
  }

  await Checklist.findByIdAndUpdate(
    checklist_id,
    {iscompleted}
  )

  return res.json(
    {
      status: 1,
      msg: iscompleted ? 'checklist completed' : 'checklist not completed'
    }
  )

}

module.exports = {
  add_checklist,
  edit_checklist,
  delete_checklist,
  get_checklist,
  complete_checklist,
  get_single_checklist
}
