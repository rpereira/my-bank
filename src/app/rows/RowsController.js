/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular, dismissModal, $*/

angular.module("MyBank")

.controller("RowsController",
            ["$scope", "$routeParams", "Rows", "categories",
            function($scope, $routeParams, Rows, categories)
{
    "use strict";

    /*
     * Sorting and filtering
     */
    $scope.predicate       = "date";
    $scope.reverse         = true;
    $scope.category_filter = "";
    $scope.categories      = categories;

    /*
     * Pagination
     */
    $scope.paged_rows = [];
    $scope.pagination =
    {
        current_page : 1,
        max_size     : 5,
        num_per_page : 10
    };

    $scope.$watch("[rows, pagination.current_page + pagination.num_per_page]", function()
    {
        var begin = ($scope.pagination.current_page - 1) * $scope.pagination.num_per_page;
        var end   = begin + $scope.pagination.num_per_page;

        $scope.paged_rows = $scope.rows.slice(begin, end);
    }, true);

    /**
     * Reset the form to add a new row.
     */
    function initNewRow()
    {
        $scope.new_row =
        {
            date        : null,
            category    : null,
            amount      : null,
            description : ''
        };
    }

    /**
     * Get user rows.
     */
    function initialize()
    {
        $scope.rows = [];

        Rows.query({ type: $routeParams.type })
            .$promise.then(function(rows)
            {
                $scope.rows = rows;
            });
    }

    /**
     * Add row.
     */
    $scope.addRow = function()
    {
        Rows.save($.param({ type: $routeParams.type, row: $scope.new_row }))
            .$promise.then(function()
            {
                dismissModal("#modal_newRow");
                $scope.rows.push($scope.new_row);
                initNewRow();
            });
    };

    /**
     * Save row edition.
     */
    $scope.save = function()
    {
    };

    /**
     * Save row edition.
     */
    $scope.remove = function()
    {
    };

    /**
     * Execute on page loading.
     */
    initialize();
    initNewRow();

}]);
