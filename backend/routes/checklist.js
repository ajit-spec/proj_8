const express = require('express')
const router = express.Router()
const checklistcontrollers = require('../controllers/checklist')
const checklistvalidators = require('../validators/checklist')
const validate = require('../validate')
const auth = require('../auth')

//add_checklist
router.post(
  '/add_checklist',
  auth,
  checklistvalidators.add_checklist(),
  validate,
  checklistcontrollers.add_checklist
)

//edit_checklist
router.put(
  '/edit_checklist/:checklist_id',
  auth,
  checklistvalidators.add_checklist(),
  validate,
  checklistcontrollers.edit_checklist
)

//delete_checklist
router.delete(
  '/delete_checklist/:checklist_id',
  auth,
  checklistcontrollers.delete_checklist
)

//complete_checklist
router.put(
  '/complete_checklist/:checklist_id',
  auth,
  checklistcontrollers.complete_checklist
)

//get_checklist
router.get(
  '/get_checklist',
  auth,
  checklistcontrollers.get_checklist
)

//get_single_checklist
router.get(
  '/get_single_checklist/:checklist_id',
  auth,
  checklistcontrollers.get_single_checklist
)

module.exports = router
