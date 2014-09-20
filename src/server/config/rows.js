/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global module, require */

var mysql      = require("mysql");
var db_config  = require("./mysql.js");
var pool       = mysql.createPool(db_config.connection);

/**
 * Get rows
 */
module.exports.getRows = function(type, res)
{
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
};

/**
 * Add row
 */
module.exports.addRow = function(params, res)
{
    var type        = params.type;
    var user_id     = 10;
    var date        = params.row.date;
    var category    = params.row.category;
    var amount      = params.row.amount;
    var description = params.row.description;

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
};
