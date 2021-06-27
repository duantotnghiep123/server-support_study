const mongoose = require("mongoose")
const Schema = mongoose.Schema
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
const Participant=require('./Participant')

const Group = new Schema(
  {
    createBy: { type: String, required: true },
    groupName: { type: String, required: true },
    groupDescription: { type: String },
    groupImage: { type: String },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
      },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("Group", Group)
