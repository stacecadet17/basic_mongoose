var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({ //creating a new schema with whatever fields it needs
 name: String,
 age: Number,
})
mongoose.model('User', UserSchema); // setting our new schema as "User", passing it var from new created schema
var User = mongoose.model('User'); // now we have to turn around and retrieve this Schema from our Models, named 'User'


app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request


app.get('/', function(req, res) {
  User.find({}, function(err, users){//searching through db of users, passing it any errors and any users existing
    if (err){
      console.log(err, "Error!");
      res.redirect('/');
    }
    else {
      res.render('index.ejs', {users: users}); //on index is directions for how to display the users
    }
  })
});
// Add User Request
app.post('/users', function(req, res) { //post data takes info from form
    console.log("POST DATA", req.body); //posting to terminal info
    var user = new User({name: req.body.name, age: req.body.age});//defining user as new user with info that is input into the form

    user.save(function(err) { //saving the post data to the database
      if(err) {
        console.log("something went wrong"); //posting any errors if any
      } else {
        console.log("successfully added a user! yayyy");//terminal posts that user add worked
        res.redirect('/');
      }
    })
  })
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
