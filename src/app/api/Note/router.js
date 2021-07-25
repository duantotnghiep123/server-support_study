const express = require("express")
const router = express.Router()
const controller = require("./controller")

router
  .get("/getByType/", controller.getNoteByType)
  .post("/addNote", controller.addNote)
  .put("/",controller.update)
  .delete("/",controller.delete)
module.exports = router //exporst qua index.js để su dung
