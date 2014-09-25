/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank", ["ngRoute", "ngTouch", "mobile-angular-ui"])

.config(["$routeProvider", "$compileProvider", function($routeProvider, $compileProvider)
{
    "use strict";

    $routeProvider

        // Home
        .when('/', { templateUrl: "/js/home/home.tpl.html" })

        // Expenses
        .when("/lists/:type",
        {
            templateUrl : "app/js/rows/list.tpl.html",
            controller  : "RowsController"
        })

        // redirect to home
        .otherwise(
        {
            redirectTo: '/'
        });
}])

.config(["$httpProvider", function($httpProvider)
{
    $httpProvider.defaults.headers.put["Content-Type"]  =
    $httpProvider.defaults.headers.post["Content-Type"] = "application/json";

    $httpProvider.interceptors.push(function($q, $location)
    {
        return {

            responseError: function(response)
            {
                if(response.status === 401)
                {
                    $location.path("/sign_in");
                }

                return $q.reject(response);
            }

        };
    });
}]);
