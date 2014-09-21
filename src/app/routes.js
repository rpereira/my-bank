/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank", ["ngRoute", "ngResource", "ui.bootstrap"])

.config(["$routeProvider", function($routeProvider)
{
    "use strict";

    $routeProvider

        // Home
        .when("/",
        {
            templateUrl : "src/app/home/home.tpl.html"
        })

        // Sign up
        .when("/sign_up",
        {
            templateUrl : "src/app/authentication/sign_up/sign_up.tpl.html",
            controller  : "SignUpController"
        })

        // Sign in
        .when("/sign_in",
        {
            templateUrl : "src/app/authentication/sign_in/sign_in.tpl.html",
            controller  : "SignInController"
        })

        // Sign out
        // TODO...

        // Expenses
        .when("/dashboard",
        {
            templateUrl : "src/app/dashboard/dashboard.tpl.html",
            controller  : ""
        })

        // Expenses
        .when("/lists/:type",
        {
            templateUrl : "src/app/rows/list.tpl.html",
            controller  : "RowsController"
        })

        // redirect to home
        .otherwise(
        {
            redirectTo: "/"
        });
}])

.config(["$httpProvider", function($httpProvider)
{
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

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
