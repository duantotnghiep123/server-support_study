const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema (
  {
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'Participant',
    },
    createBy: {type: String, required: true},
    groupName: {type: String, required: true},
    groupDescription: {type: String},
    groupImage: {type: String},
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'Course',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model ('Groupcourses', Group);
