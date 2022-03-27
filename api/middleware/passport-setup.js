const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function (user, done) {
    done(err, user.id)
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: "493115458590-r0aqeelnrd08kt2kdd71iou3kfovcei1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));