/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank")

.controller("LoginController", ["$scope", "$http", "$location", function($scope, $http, $location)
{
    $scope.login = function()
    {
        $http.post("/sign_in",
        {
            username : $scope.user.name,
            password : $scope.user.password,
            remember : $scope.remember_me
        })
        .success(function(user)
        {
            // redirect to overview
            $location.url("/overview");
        })
        .error(function(reason)
        {
            $scope.error_message = reason;

            // redirect to home
            $location.url('/');
        });
    };
}]);
