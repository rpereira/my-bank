/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var mysql      = require("mysql");
var db_config  = require("./mysql.js");
var pool       = mysql.createPool(db_config.connection);

var auth =
{
    /**
     * sign up
     */
    signUp: function(req, res)
    {
        console.log(req.body)
        var name      = req.body.username;
        var password  = req.body.password;

        pool.getConnection(function(error, connection)
        {
            connection.query(
                "INSERT INTO users (name, password) SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS (SELECT name FROM users WHERE name=?) LIMIT 1",
                [name, password, name],
                function(err, rows)
                {
                    if(err)
                    {
                        res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
                    }
                    else if(rows.affectedRows === 0)    // user already exists
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
    },

    /**
     * sign in
     */
    signIn: function(req, res)
    {
        console.log(req.body)
        var name      = req.body.username;
        var password  = req.body.password;

        pool.getConnection(function(error, connection)
        {
            connection.query(
                "SELECT * FROM users WHERE name = ?",
                [name],
                function(err, rows)
                {
                    if(err)
                    {
                        res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
                    }
                    else
                    {
                        if(password !== rows[0].password)    // password does not match
                        {
                            res.status(200).json({ error: "The name or password you entered is incorrect." });
                        }
                        else
                        {
                            res.status(200).end();
                        }
                    }

                    connection.release();
                }
            );
        });
    }
};

module.exports = auth;
