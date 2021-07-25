var CourseType = require("../../models/CourseType")

exports.store = async function (req, res) {
  const data = req.body
  // Update later
  // data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
  // data.userId = "60bb295b1830b1b8db478bb3"
  // data.typeClassId = "60bb295b1830b1b8db478bb3"
  const courseType = new CourseType(data)
  try {
    const payload = await courseType.save()

    res.status(200).json({ payload })
  } catch (error) {
    console.log("ERR", err)
  }
}

exports.getAll = async function (req, res) {
    const payload = await CourseType.find();
    res.status(200).json({
      payload,
    })
  }
