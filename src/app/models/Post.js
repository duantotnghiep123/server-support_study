const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Post = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User"  },
    // typeClassId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", Post);
