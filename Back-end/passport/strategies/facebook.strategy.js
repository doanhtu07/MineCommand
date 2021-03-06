const { PrismaClient } = require('@prisma/client')
    , FacebookStrategy = require('passport-facebook').Strategy;
const prisma = new PrismaClient();
const {
    HOST,
    FACEBOOK_APP_ID, 
    FACEBOOK_APP_SECRET,
} = process.env;
const { indices } = require('../../algolia');

const facebookStrategy = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${HOST}/auth/facebook/callback`,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  },
  function(accessToken, refreshToken, profile, done) {
    const { id, email, first_name, last_name } = profile._json;
    prisma.user.findOne({
        where: {
            email
        }
    })
    .then(user => {
        if (user) {
            done(null, user);
            return null;
        }
        else {
            return prisma.user.create({
                data: {
                    name: `${first_name} ${last_name}`,
                    email,
                    password: "",
                    avatarUrl: `http://graph.facebook.com/${id}/picture?type=large`
                }
            })
        }
    })
    .then(newUser => {
        if (newUser) {
            newUser.objectID = newUser.id;
            indices.users_index.saveObject(newUser, {
                autoGenerateObjectIDIfNotExist: true,
            });
            done(null, newUser);
            return null;
        }
    })
    .catch(err => {
        return done(err);
    })
  }
);

module.exports = facebookStrategy;