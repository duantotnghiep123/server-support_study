const GroupCourse = require ('../../models/GroupCourse');
const Participant = require ('../../models/Participant');
exports.createGroupNoImage = async function (req, res) {
    let group = new GroupCourse({
        createBy: req.body.createBy,
        groupName: req.body.groupName,
        groupDescription: req.body.groupDescription,
        groupImage: req.body.groupImage,
        courseId: req.body.courseId,
    });
    try {
      const payload = await group.save()
      res.status(200).json(payload)
    } catch (error) {
      console.log("ERR", error)
    }
  }

  exports.createGroupWithImage =async function (req, res)  {
  
    var group_image=req.file.filename
    let group = new GroupCourse({
        createBy: req.body.createBy,
        groupName: req.body.groupName,
        groupDescription: req.body.groupDescription,
        groupImage: `https://learning-support-application.herokuapp.com/group/${group_image}`,
        courseId: req.body.courseId,
    });

    try {
      const payload = await group.save()
      res.status(200).json(payload)
    } catch (error) {
      console.log("ERR", error)
    }
  }

  exports.joinGroup = async function (req, res) {
    const data = req.body
    const participant = new Participant(data)
    try {
      const payload = await participant
        .save()
        .then(() => GroupCourse.findById(req.body.groupId))
        .then((groupCourse) => {
          groupCourse.participant.unshift(participant)
          return groupCourse.save()
        })
      res.status(200).json({ payload })
    } catch (error) {
      console.log("ERR", error)
    }
  }
  exports.getAllGroup = async function (req, res) {
    await GroupCourse.find({})
    .populate([
      {
        path: "participant",
        model: "Participant",
        select: "_id uid jointime",
      },
    ])
    .lean()
    .exec((err, data) => {
        res.json(data)
    })
  }

  exports.admindeleteGroup = async (req, res) => {
  try {
    const deleteOne = await GroupCourse.findOneAndDelete ({_id: req.params.id});
    if (!deleteOne) return res.json ({success: false, message: 'delete Fail'});
    res.redirect ('back');
  } catch (error) {
    res.json ({message: error});
  }
};


  exports.getAllGroupByCourseID = async function (req, res) {
    await GroupCourse.find({ courseId: req.body.courseId})
    .populate([
      {
        path: "participant",
        model: "Participant",
        select: "_id uid jointime",
        
      },
    ])
    .lean()
    .exec((err, data) => {
        res.json(data)
    })
  }
  exports.getAllGroupByID = async function (req, res) {
    await GroupCourse.find({ _id: req.body._id})
    .populate([
      {
        path: "participant",
        model: "Participant",
        select: "_id uid",
      },
    ])
    .lean()
    .exec((err, data) => {
        res.json(data)
    })
  }
 

  exports.updateGroupName = (req, res) => {
    let groupName = req.body.groupName;
    GroupCourse.findByIdAndUpdate(
      {_id:req.body._id}, { groupName: groupName }
      ,
    ) .populate([
      {
        path: "participant",
        model: "Participant",
        select: "_id uid",
        
      },
    ])
    .lean()
    .exec((err, data) => {
        res.json(data)
    });
  };
  

  exports.deleteUserGroup = (req, res) => {
    let id = req.body._id;
    Participant.findByIdAndRemove({ _id: id },
      (err,result) => {
        if (err) {
          console.log(err);
        }
        res.json(result)
      });
  };

  exports.deleteGroup = (req, res) => {
    let id = req.body._id;
    GroupCourse.findByIdAndRemove({ _id: id },
      ).populate([
        {
          path: "participant",
          model: "Participant",
          select: "_id uid",
        },
      ])
      .lean()
      .exec((err, data) => {
          res.json(data)
      });
  };

 exports. delete =(req, res, next) =>{
  GroupCourse.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next)
  }


  exports.updateGroupImage = function (req, res)  {
    let id = req.body._id;
    var new_image=req.file.filename
    var old_image=req.body.old_image
    GroupCourse.findByIdAndUpdate(
      { _id: id }, { groupImage: `https://learning-support-application.herokuapp.com/group/${new_image}` }
      ,
    ).populate([
        {
          path: "participant",
          model: "Participant",
          select: "_id uid",
        },
      ])
      .lean()
      .exec((err, data) => {
        if (err) {
          console.log(err);
        }
        if(old_image!="noImage"){
         var path=old_image.slice((old_image.lastIndexOf("/")+1),old_image.length)
          fs.unlinkSync("src/uploads/group/"+ path)
        }
          res.json(data)
      });
  }