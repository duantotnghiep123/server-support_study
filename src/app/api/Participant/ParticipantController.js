const Participant=require('../../models/Participant')

exports.insertParticipant= async (req, respon) => {
    let participant = new Participant({
        jointime: req.body.jointime,
        uid: req.body.uid,
        groupId: req.body.groupId,
        courseId: req.body.courseId,
    });
    participant.save().then(data => {
        respon.send(data);
    }).catch(err => {
        respon.status(500).send({
            message: err.message || "Error"
        });
    });
};

exports.getAllParticipant = async function (req, res) {
    await Participant.find({})
        .lean()
        .exec((err, data) => {
            res.json(data)
        })
}

exports.leaveGroup = (req, res) => {
    let id = req.body._id;
    Participant.findByIdAndRemove({ _id: id },
      (err,result) => {
        if (err) {
          console.log(err);
        }
        res.json(result)
      });
  };