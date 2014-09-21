/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank")

.factory("Rows", function($resource, SERVICE_URL)
{
    return $resource(SERVICE_URL + "/api/rows/:type/:row");
})

.factory("Row", function($resource, SERVICE_URL)
{
    return $resource(SERVICE_URL + "/api/rows/:type/:id", null,
    {
        'delete': { method: 'DELETE'}
    });
});
