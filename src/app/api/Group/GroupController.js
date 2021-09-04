var Group = require ('../../models/Group');
fs = require ('fs-extra');

exports.createGroupWithImage = function (req, res) {
  var group_image = req.file.filename;
  let group = new Group ({
    createBy: req.body.createBy,
    groupName: req.body.groupName,
    groupDescription: req.body.groupDescription,
    groupImage: `http://localhost:3000/group/${group_image}`,
    courseId: req.body.courseId,
  });
  group
    .save ()
    .then (data => {
      res.send (data);
    })
    .catch (err => {
      res.status (500).send ({
        message: err.message || 'Error',
      });
    });
};

exports.insertGroup = async (req, respon) => {
  let group = new Group ({
    participant: null,
    createBy: req.body.createBy,
    groupName: req.body.groupName,
    groupDescription: req.body.groupDescription,
    groupImage: req.body.groupImage,
    courseId: req.body.courseId,
  });
  group
    .save ()
    .then (data => {
      respon.send (data);
    })
    .catch (err => {
      respon.status (500).send ({
        message: err.message || 'Error',
      });
    });
};
exports.getAll = async function (req, res) {
  const payload = await Group.find ();
  res.status (200).json ({
    payload,
  });
};

exports.findGroupId = (req, res) => {
  Group.find ({_id: req.body._id}).exec (function (err, data) {
    if (err) {
      if (err.kind === 'ObjectId') {
        return res.status (404).send ({
          message: 'Student not found with given Subject Id ' +
            req.params.subjectId,
        });
      }
      return res.status (500).send ({
        message: 'Error retrieving Student with given subject Id ' +
          req.params.subjectId,
      });
    }

    res.send (data);
  });
};

exports.deleteGroup = (req, res) => {
  let id = req.body._id;
  Group.findByIdAndRemove ({_id: id}, (err, result) => {
    if (err) {
      console.log (err);
    }
    res.json (result);
  });
};

exports.admindeleteGroup = async (req, res) => {
  try {
    const deleteOne = await Group.findOneAndDelete ({_id: req.params.id});
    if (!deleteOne) return res.json ({success: false, message: 'delete Fail'});
    res.redirect ('back');
  } catch (error) {
    res.json ({message: error});
  }
};

exports.updateGroupName = (req, res) => {
  let id = req.body._id;
  let groupName = req.body.groupName;
  Group.findByIdAndUpdate (
    {_id: req.body._id},
    {groupName: groupName},
    function (err, result) {
      if (err) {
        console.log (err);
      }
      res.json (result);
    }
  );
};
