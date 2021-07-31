const express = require("express")
const router = express.Router()
const controller = require("./controller")
const multer = require('multer');
fs = require('fs-extra')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/post') // đường dẫn thu mục chứa hình
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})
var upload = multer({ storage: storage })
router
  .get("/", controller.getAllPost)
  .get("/:id", controller.getById)
  .post("/:id", controller.addComment)
  .post("/like/:id", controller.like)
  .get("/byId", controller.getById)
  .post("/addComment", controller.addComment)
  .post("/",upload.single('post'), controller.createPost)
  .post("/createNoImage",controller.createPostNoImage)
  .put("/:id",controller.updatePost)
  .delete("/:id",controller.deletePost)
module.exports = router //exporst qua index.js để su dung
