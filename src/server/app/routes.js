/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var signUp    = require("../config/authentication.js").signUp;
var signIn    = require("../config/authentication.js").signIn;
var getRows   = require("../config/rows.js").getRows;
var addRow    = require("../config/rows.js").addRow;
var deleteRow = require("../config/rows.js").deleteRow;

module.exports = function(app)
{
    /**
     * Sign up
     */
    app.post("/auth/sign_up", function(req, res)
    {
        signUp(req.body, res);
    });

    /**
     * Sign in
     */
    app.post("/auth/sign_in", function(req, res)
    {
        signIn(req.body, res);
    });

    /**
     * Sign out
     */
    app.get("/sign_out");


    /**
     * Get rows
     */
    app.get("/api/rows/:type", function(req, res)
    {
        getRows(req.params.type, res);
    });

    /**
     * Add row
     */
    app.post("/api/rows", function(req, res)
    {
        addRow(req.body, res);
    });


    app.options("/api/rows/:type/:id", function(req, res, next)
    {
        res.set(
        {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "POST, DELETE"
        });

        next();
    });

    /**
     * Delete row
     */
    app.delete("/api/rows/:type/:id", function(req, res)
    {
        deleteRow(req.params, res);
    });
};

/**
 *
 */
function checkAuth(req, res, next)
{

}
