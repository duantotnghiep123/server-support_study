const Comment = require("../../models/Comment")
const Post = require("../../models/Post")
const postController = require("../../controllers/PostController")
exports.addComment = async function (req, res) {
  const data = req.body
  const comment = new Comment(data)
  try {
    const payload = await comment
      .save()
      .then(() => Post.findById(req.params.id))
      .then((post) => {
        post.comment.unshift(comment)
        return post.save()
      })
    res.status(200).json({ payload })
  } catch (error) {
    console.log("ERR", error)
  }
}

exports.getAllPost = async function (req, res) {
  const payload = await Post.find()
    .populate([
      {
        path: "comment",
        model: "Comment",
        select: "content",
        populate: {
          path: "userId",
          model: "User",
          select: "name image",
        },
      },
    ])
    .populate("userId", "name image")
  res.status(200).json({
    payload,
  })
}

exports.createPost = postController.create

exports.getById = async function (req, res) {
  try {
    const payload = await Post.findById(req.params.id)
      .populate([
        {
          path: "comment",
          model: "Comment",
          select: "content",
          populate: {
            path: "userId",
            model: "User",
            select: "name image",
          },
        },
      ])
      .populate("userId", "name image")

    if (!payload) {
      res.status(404).json({
        error: "Resource not found!!",
      })
    }
    res.status(200).json({
      payload,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}
