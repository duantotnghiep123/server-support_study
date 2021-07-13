const express = require("express")
const router = express.Router()
const controller = require("./controller")

router
  .get("/groupNote", controller.getGroupNote)
  .get("/selfNote", controller.getSelfNote)
  .post("/addNote", controller.addNote)

module.exports = router //exporst qua index.js để su dung
