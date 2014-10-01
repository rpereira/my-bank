/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true, unused: false */
/*global angular, $*/

angular.module("MyBank")

.value("SERVICE_URL", "http://localhost:8080")

.constant("categories",
{
    expenses:
    [
        "General",
        "Food",
        "Education",
        "Clothes",
        "Rent",
        "House",
        "Insurances",
        "Health",
        "Travel",
        "Fuel",
        "Car",
        "Energy/Water"
    ],
    incomes:
    [
        "Wages",
        "Renting",
        "Gifts"
    ]
});

function dismissModal(id)
{
    "use strict";

    $(id).modal("hide");
}

function showModal(id)
{
    "use strict";

    $(id).modal("show");
}
