const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../user");

passport.use(
  new LocalStrategy(function (email, password, done) {
    console.log(email);

    UserModel.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!bycrpt.compare(password, user.passowrd)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
