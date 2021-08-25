const mongoose = require('mongoose')
const {Schema} = mongoose;

const checklistschema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is req'],
      unique: true
    },
    iscompleted: {
      type: Boolean,
      required: true,
      default: false
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);


const Checklist = mongoose.model('Checklist', checklistschema);

module.exports = Checklist
