/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global require, process */

var express      = require("express");
var logger       = require("morgan");
var bodyParser   = require("body-parser");
var errorHandler = require("errorhandler");

var app = express();
var SERVICE_URL = "http://127.0.0.1:55471";

// all environments
app.set("port", process.env.PORT || 8080);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// development only
if("development" == app.get('env'))
{
    app.use(errorHandler());
}

app.all("/*", function(req, res, next)
{
    // CORS headers
    res.header("Access-Control-Allow-Origin", SERVICE_URL);
    //res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

    next();
});

// routes
app.use('/', require("./app/routes.js"));

// launch server
app.listen(app.get('port'), function()
{
    console.log("\n\n*********************************\n* Server listening on port " + app.get("port") + " *\n*********************************\n\n");
});
