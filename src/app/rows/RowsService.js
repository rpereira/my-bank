/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank")

.factory("Rows", function($http, $resource, SERVICE_URL)
{
    // set headers
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return $resource(SERVICE_URL + "/api/rows/:type/:row");
});
