const express = require("express")
const router = express.Router()
const controller = require("./GroupController")

const multer = require('multer');
fs = require('fs-extra')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/group') // đường dẫn thu mục chứa hình
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})
var upload = multer({ storage: storage })

router
  .get("/api/getAllGroup", controller.getAll)
  .post("/api/insertGroup", controller.insertGroup)
  .post("/api/findGroupId", controller.findGroupId)
  .post("/api/deleteGroup", controller.deleteGroup)
  .post("/api/updateGroupName", controller.updateGroupName)
//   .put("/:id", controller.update)
//   .delete("/:id", controller.delete)

.post("/api/createGroupWithImage",upload.single('group'), controller.createGroupWithImage)

module.exports = router //exporst qua index.js để su dung
