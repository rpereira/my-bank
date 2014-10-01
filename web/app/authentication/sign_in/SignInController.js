/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank")

.controller("SignInController", ["$scope", "$location", "Auth", function($scope, $location, Auth)
{
    $scope.signIn = function()
    {
        Auth.signIn(
        {
            username : $scope.user.name,
            password : $scope.user.password
        })
        .then(function(response)
        {
            if(response.hasOwnProperty("error"))
            {
                $scope.error = response.error;
            }
            else
            {
                $location.path("/dashboard");
            }
        });
    };
}]);
