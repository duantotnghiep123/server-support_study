const Note = require("../../models/Note")

exports.getAll = async function (req, res) {
  const payload = await Note.find().populate("userId", "id name image")
  res.status(200).json({
    payload,
  })
}

exports.getGroupNote = async function (req, res) {
  try {
    const payload = await Note.find({ isGroupNote: 1,userId: req.body.userId }).populate(
      "userId",
      "id name image"
    )
    if (!payload) {
      res.status(404).json({
        error: "Resource not found!!",
      })
    }
    res.status(200).json({
      payload,
    })
  } catch (error) {
    console.log("ERR", err)
  }
}

exports.getSelfNote = async function (req, res) {
  try {
    const payload = await Note.find({
      isGroupNote: 0,
      userId: req.body.userId,
    }).populate("userId", "id name image")
    if (!payload) {
      res.status(404).json({
        error: "Resource not found!!",
      })
    }
    res.status(200).json({
      payload,
    })
  } catch (error) {
    console.log("ERR", err)
  }
}

exports.addNote = async function (req, res) {
  const data = req.body
  const note = new Note(data)
  try {
    const payload = await note.save()

    res.status(200).json({ payload })
  } catch (error) {
    console.log("ERR", err)
  }
}
