var cookieParser = require('cookie-parser');
var session      = require('express-session');
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'),


router.use(bodyParser.urlencoded({ extended: true }))


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.use(session({ secret: 'this is secret'}));
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password:String,
    email: String,
    firstNmae: String,
    lastName: String,
    roles:[String]

 });

var UserModel = mongoose.model('UserModel', UserSchema);

// var admin = new UserModel({username: 'alice', password: 'alice', firstNmae:"Alice", lastName:"Wonderland", roles:["admin"] });
// var student = new UserModel({username: 'bob', password: 'bob', firstNmae:"Bob", lastName:"Marley", roles:["student"] });
//
// admin.save();
// student.save();

passport.use(new LocalStrategy(
        function(username, password, done)
        {
          // var deferred = Q.defer();
          UserModel.findOne({username: username, password:password } , function(err, user){
       // if (err) deferred.reject(err.name + ': ' + err.message);

               if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {alert: 'Incorrect username.'});
        }
        if (user.password != password) {
            return done(null, false, {alert: 'Incorrect password.'});
        }
              //return done(null, false, {message: 'unable to login'});
            return done(null, user);

          });


        }));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

router.post("/login", passport.authenticate('local'), function(req,res){
  console.log('login');
  console.log(req.user);
  res.json(req.user);
  if(res.status==401){
    alert("invalid user");
  }


});

router.post("/logout",  function(req, res){
  req.logout();
  res.send(200);

});


router.get("/loggedin", function(req, res){
   res.send(req.isAuthenticated() ? req.user : '0');
});


router.post("/register", function(req, res){
    UserModel.findOne({username: req.body.username}, function(err, user){
      // if(UserModel.username==req.body.username){
      //   alert("user is already exist")
      // }
      
    if(user)
    {
      res.json(null);
      return;
    }
    else {
    
      var newUser = new UserModel(req.body);

      newUser.roles= ['student'];
      newUser.save(function(err, user)
      {
        req.login(user, function(err)
        {
          if(err) {return next(err);}
          res.json(user);
        });
      });
    }
    });
});

module.exports = router;
