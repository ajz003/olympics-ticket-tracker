var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  

  passport.use('local-login', new LocalStrategy(
    function(username, password, done) {

      let user = {
        username: "ajz003",
        password: "doink"
      }
      if (username !== user.username) { console.log("wrong username"); return done(null, false, {message: "wrong username"}); }
      else if (username === user.username && password !== user.password) { console.log("wrong password"); return done(null, false,  {message: "wrong password"}); }
      else if (username === user.username && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  ));