const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../sequelize-models/User')


passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    //User.findById(id).then((user) => {
    done(null, user)
    //}).catch((error) => done(error))
})

const getProfile = (profile) => {
    const { id, displayName, emails, provider } = profile
    if (emails && emails.length) {
        const email = emails[0].value
        return {
            googleId: id,
            name: displayName,
            email,
            provider
        }
    }
    return null
}

passport.use(
    new GoogleStrategy(
        {
            clientID: "493115458590-r0aqeelnrd08kt2kdd71iou3kfovcei1.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/googleAuth/google/callback"
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                const existingGoogleUser = await User.findOne({
                    where: { google_id: profile.id }
                });
                if (!existingGoogleUser) {
                    const existingEmailUser = await User.findOne({
                        where: { email: getProfile(profile).email }
                    });
                    // Create user if he is not registered already
                    if (!existingEmailUser) {
                        const newUser = await User.create(getProfile(profile));
                        return done(null, newUser);
                    }
                    return done(null, existingEmailUser);
                }
                return done(null, existingGoogleUser);
            } catch (e) {
                throw new Error(e);
            }
        }
    )
);

// passport.use(new GoogleStrategy({
//     clientID: "493115458590-r0aqeelnrd08kt2kdd71iou3kfovcei1.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:3000/googleAuth/google/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         console.log("profile", profile)
//         /*
//          use the profile info (mainly profile id) to check if the user is registerd in ur db
//          If yes select the user and pass him to the done callback
//          If not create the user and then select him and pass to callback
//         */
//         return done(null, profile);
//     }



    // async (accessToken, refreshToken, profile, done) => {
    //     console.log("one", profile)
    //     try {
    //         const existingGoogleAccount = await User.findOne({
    //             where: { email: profile.id }
    //         })
    //         if (!existingGoogleAccount) {
    //             const existingEmailAccount = await User.findOne({
    //                 where: { email: getProfile(profile).email }
    //             })
    //             if (!existingEmailAccount) {
    //                 const newAccout = await User.create(getProfile(profile))
    //                 return done(null, newAccout)
    //             }
    //             return done(null, existingEmailAccount)
    //         }
    //         return done(null, existingGoogleAccount)
    //     }
    // // if(existingGoogleAccount){
    // //     console.log('Found');
    // // }else{
    // //     console.log('Not Found');
    // // }
    //     catch (error) {
    //         throw new Error(error)
    //     }
    // }


    // function (accessToken, refreshToken, profile, done) {
    //     console.log(profile);
    //     // Query the database to find user record associated with this
    //     // google profile, then pass that object to done callback
    //     User.findById(profile.id).then(function (id) {
    //         if (id) {
    //             return done(null, profile);
    //         }
    //         else {
    //             User.createUser(profile.id)
    //                 .then(function (id) {
    //                     return done(null, profile);
    //                 });
    //         }
    //     })
    // }

// ));