var ensureAuthenticated = app.get('ensureAuthenticated');

module.exports = function (app) {
    // proof of concept
    app.get('/api/example', ensureAuthenticated, function(req, res){
        res.json({message: "OK"});
    });
};