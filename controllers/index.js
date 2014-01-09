var ensureAuthenticated = app.get('ensureAuthenticated');
var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: 'hello', user: req.user });
    });

    // proof of concept
    app.get('/account', ensureAuthenticated, function(req, res){
        res.render('index', {title: 'Authenticated!', user: req.user });
    });

    app.get('/login', function(req, res){
        res.render('login');
    });

    app.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            successRedirect: '/account'
        }
    ),
    function(req, res){
        res.redirect('/');
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};