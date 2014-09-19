/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular, $*/

angular.module("MyBank")

.factory("Auth", function($http, $q)
{
    "use strict";

    // set headers
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {

        /**
         * Sign up.
         *
         * @param   {object}     user - User's name and password.
         * @return  {Promise}    Returns a promise object.
         */
        signUp: function(user)
        {
            var deferred = $q.defer();

            $http
                .post("http://localhost:8080/auth/sign_up", $.param(user))
                .success(function(response)
                {
                    deferred.resolve(response);
                })
                .error(function(reason)
                {
                    deferred.reject(reason);
                });

            return deferred.promise;
        }
    };
});
