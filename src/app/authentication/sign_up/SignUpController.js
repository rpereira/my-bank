/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular*/

angular.module("MyBank")

.controller("SignUpController", ["$scope", "$location", "Auth", function($scope, $location, Auth)
{
    $scope.signUp = function()
    {
        Auth.signUp(
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
                $location.path("/sign_in");
            }
        });
    };
}]);
