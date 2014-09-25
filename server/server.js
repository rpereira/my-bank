/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global require, process */

var express      = require("express");
var cors         = require("cors");
var logger       = require("morgan");
var bodyParser   = require("body-parser");
var errorHandler = require("errorhandler");

var app = express();

// all environments
app.set("port", process.env.PORT || 8080);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// development only
if("development" == app.get("env"))
{
    app.use(errorHandler());
}

// routes
app.use('/', require("./app/routes.js"));

// launch server
app.listen(app.get("port"), function()
{
    console.log("\n\n*********************************\n* Server listening on port " + app.get("port") + " *\n*********************************\n\n");
});
