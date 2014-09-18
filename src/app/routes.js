/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank", ["ngRoute"])

.config(["$routeProvider", function($routeProvider)
{
    "use strict";

    $routeProvider

        // Home
        .when("/",
        {
            templateUrl : "src/app/home/home.tpl.html"
        })

        // redirect to home
        .otherwise(
        {
            redirectTo: "/"
        });
}]);
