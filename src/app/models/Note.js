const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Note = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isGroupNote: { type: Number, required: true },
    // typeClassId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("Note", Note)
