/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var express = require("express");
var router  = express.Router();

var auth = require("../config/authentication.js");
var rows = require("../config/rows.js");

/**
 * Authentication.
 */
router.post("/auth/sign_up", auth.signUp);
router.post("/auth/sign_in", auth.signIn);

/**
 * CRUD operations.
 */
router.get("/api/rows/:type", rows.getAll);
router.post("/api/rows/:type", rows.create);
router.put("/api/rows/:type/:id", rows.update);
router.delete("/api/rows/:type/:id", rows.delete);

module.exports = router;
