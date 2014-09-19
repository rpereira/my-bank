/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var mysql      = require("mysql");
var db_config  = require("./mysql.js");
var pool       = mysql.createPool(db_config.connection);

/**
 * sign up
 */
module.exports.signUp = function(req_body, res)
{
    var user_name = req_body.username;
    var password  = req_body.password;

    pool.getConnection(function(error, connection)
    {
        connection.query(
            "INSERT INTO users (name, password) SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS (SELECT name FROM users WHERE name=?) LIMIT 1",
            [user_name, password, user_name],
            function(err, rows)
            {
                if(err)
                {
                    res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
                }
                else if(rows.affectedRows === 0) // user already exists
                {
                    res.status(200).json({ error: "Someone already has that username. Try another?" });
                }
                else
                {
                    res.status(200).end();
                }

                connection.release();
            }
        );
    });
};

/**
 * sign in
 */
module.exports.signIn = function()
{
    connection.query();
};

/**
 * sign out
 */
module.exports.signOut = function()
{
    connection.query();
};
