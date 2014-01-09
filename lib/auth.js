var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

var userModel = app.get('model_user');

exports.setupAuth = function(){
    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function(id, done) {
        findById(id, function (err, user) {
            done(err, user);
        });
    });

    function findById(id, cb) {
        userModel.find({
            where: {
                user_id: id
            }
        })
        .success(function(thisUser){
            return cb(null, thisUser);
        })
        .error(function(err){
            return cb(new Error('User ' + id + ' not found'));
        });
    }

    function findByEmail(email, cb){
        userModel.find({
            where: {
                email: email
            }
        })
        .success(function(thisUser){
            return cb(null, thisUser);
        })
        .error(function(err){
            return cb(new Error('email ' + email + ' not found'));
        });
    }

    passport.use(new localStrategy(
        function(username, password, done) {
            findByEmail(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown email ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            });
        }
    ));
};

exports.ensureAuthenticated = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
};