/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var signUp = require("../config/authentication.js").signUp;
var signIn = require("../config/authentication.js").signIn;

module.exports = function(app)
{
    /**
     * Sign up
     */
    app.post("/auth/sign_up", function(req, res)
    {
        // needed for AngularJS
        res.set("Access-Control-Allow-Credentials", true);
        res.set("Access-Control-Allow-Origin", '*');

        signUp(req.body, res);
    });

    /**
     * Sign in
     */
    app.post("/auth/sign_in", function(req, res)
    {
        // needed for AngularJS
        res.set("Access-Control-Allow-Credentials", true);
        res.set("Access-Control-Allow-Origin", '*');

        signIn(req.body, res);
    });

    /**
     * Sign out
     */
    app.get("/sign_out");
};

/**
 *
 */
function checkAuth(req, res, next)
{

}
