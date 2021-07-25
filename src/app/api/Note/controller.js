const Note = require("../../models/Note")

exports.getAll = async function (req, res) {
  const payload = await Note.find().populate("userId", "id name image")
  res.status(200).json({
    payload,
  })
}

exports.getNoteByType = async function (req, res) {
  try {
    const payload = await Note.find({
      isGroupNote: req.query.isGroupNote,
      userId: req.query.userId,
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
    console.log("ERR", error)
  }
}

exports.addNote = async function (req, res) {
  const data = req.body
  const note = new Note(data)
  try {
    const payload = await note.save()

    res.status(200).json({ payload })
  } catch (error) {
    console.log("ERR", error)
  }
}

exports.delete = async function (req, res) {
  const payload = await Note.findById(req.query.id)

  if (!payload) {
    res.status(404).json({
      error: "Resource not found!!",
    })
  }

  try {
    await payload.delete()
    res.status(200).json({
      payload,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

exports.update = async function (req, res) {
  try {
    const payload = await Note.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    })

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