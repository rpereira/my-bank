/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var mysql      = require("mysql");
var db_config  = require("./mysql.js");
var pool       = mysql.createPool(db_config.connection);

var rows =
{
    /**
     * Get all user rows.
     */
    getAll: function(req, res)
    {
        var type    = req.params.type;
        var user_id = 10;

        pool.getConnection(function(error, connection)
        {
            connection.query(
                "SELECT entry_id, date, category, amount, description FROM ?? WHERE user_id = ?",
                [type, user_id],
                function(err, rows)
                {
                    if(err)
                    {
                        res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
                    }
                    else
                    {
                        res.status(200).send(rows);
                    }

                    connection.release();
                }
            );
        });
    },

    /**
     * Create row.
     */
    create: function(req, res)
    {
        var type        = req.params.type;
        var user_id     = 10;
        var date        = req.body.date;
        var category    = req.body.category;
        var amount      = req.body.amount;
        var description = req.body.description;

        pool.getConnection(function(error, connection)
        {
            connection.query(
                "INSERT INTO ?? (user_id, date, category, amount, description) VALUES (?, ?, ?, ?, ?)",
                [type, user_id, date, category, amount, description],
                function(err)
                {
                    if(err)
                    {
                        res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
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
     * Update row.
     */
    update: function(req, res)
    {
        var type        = req.params.type;
        var entry_id    = req.params.id;
        var date        = req.body.date;
        var category    = req.body.category;
        var amount      = req.body.amount;
        var description = req.body.description;

        pool.getConnection(function(error, connection)
        {
            connection.query(
                "UPDATE ?? SET category = ?, date = ?, amount = ?, description = ? WHERE entry_id = ?",
                [type, category, date, amount, description, entry_id],
                function(err)
                {
                    if(err)
                    {
                        res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
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
     * Delete row.
     */
    delete: function(req, res)
    {
        var type     = req.params.type;
        var entry_id = req.params.id;

        pool.getConnection(function(error, connection)
        {
            connection.query(
                "DELETE FROM ?? WHERE entry_id = ?",
                [type, entry_id],
                function(err)
                {
                    if(err)
                    {
                        res.status(401).json({ message: "We couldn't fetch your request due to a database error:\n" + err });
                    }
                    else
                    {
                        res.status(200).end();
                    }

                    connection.release();
                }
            );
        });
    }
};

module.exports = rows;
