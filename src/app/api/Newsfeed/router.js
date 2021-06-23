const express = require("express")
const router = express.Router()
const controller = require("./controller")

router
  .get("/", controller.getAllPost)
  .get("/:id", controller.getById)
  .post("/:id", controller.addComment)
  .post("/", controller.createPost)
module.exports = router //exporst qua index.js để su dung
