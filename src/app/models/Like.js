const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Like = new Schema(
  {
    like: { type: Boolean, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId:{ type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("Like", Like);
