const User = require("./user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new localStrategy(async(username, password, done) => {
      var user;
      try {
        user = await User.findOne({username: username})
      }catch (err){
        throw err;
      }

      if (!user){
        return done(null, false);
      }

      const match = await bcrypt.compare(password, user.password);
      if (match){
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  })

  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}, (err, user) => {
      cb(err, user);
    });
  });
}