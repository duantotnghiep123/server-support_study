const Courses = require ('../models/Courses');
const Users = require ('../models/User');
const {mutipleMongooseToObject} = require ('../../util/mongoose');

class MeController {
  //[GET],/courses/:slug
  storedCourses (req, res,next) {
    Courses.find({}).then((courses)=>  res.render('me/stored-courses',{
      courses: mutipleMongooseToObject(courses)
    }))
    .catch(next);
 
  }
 
  userApp (req, res,next) {
    Users.find({}).then((users)=>  res.render('me/stored-user',{
      users: mutipleMongooseToObject(users)
    }))
    .catch(next);
 
  }
}

module.exports = new MeController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
