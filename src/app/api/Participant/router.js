const express = require("express")
const router = express.Router()
const controller = require("./ParticipantController")


router
  .get("/api/getAllParticipant", controller.getAllParticipant)
  .post("/api/insertParticipant", controller.insertParticipant)
  .post("/api/leaveGroup", controller.leaveGroup)

//   .put("/:id", controller.update)
//   .delete("/:id", controller.delete)
module.exports = router //exporst qua index.js để su dung
