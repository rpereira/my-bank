/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank")

.factory("Rows", function($resource, SERVICE_URL)
{
    return $resource(SERVICE_URL + "/api/rows/:type", null,
    {
        "query" : { method: "GET", isArray: true, cache: true },
        "create": { method: "POST" }
    });
})

.factory("Row", function($resource, SERVICE_URL)
{
    return $resource(SERVICE_URL + "/api/rows/:type/:id", null,
    {
        "update": { method: "PUT" },
        "delete": { method: "DELETE" }
    });
});
