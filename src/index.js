const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');
var methodOverride = require('method-override')
const app = express ();
const port = 3000;
const route = require ('./routes');
//import db
const db = require ('./config/db');
//connnect to db
db.connect ();

app.use(methodOverride('_method'))
//public nhung file public
app.use (express.static (path.join ('src', 'public')));
app.use (express.static (path.join ('src', 'resources/assets')));
// console.log(__dirname,'public');
//http loger
// app.use (morgan ());
app.use (
  express.urlencoded ({
    extended: true,
  })
);
app.use (express.json ());

//template engine
app.engine (
  'hbs',
  exphbs ({
    extname: '.hbs',
    //sử dụng function trong express handlerbar 
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set ('view engine', 'hbs');
app.set ('views', path.join (__dirname, 'resources', 'views'));
// console.log(path.join(__dirname,'resources/views'));
//routes khoi tao tuyen duong
route (app);

//127.0.0.1 --- localhost

app.listen (port, () => {});
