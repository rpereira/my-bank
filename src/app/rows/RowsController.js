/*jslint browser: true, devel: true, nomen: true, plusplus: true, vars: true, white: true */
/*global angular, dismissModal, $*/

angular.module("MyBank")

.controller("RowsController",
            ["$scope", "$routeParams", "Rows", "Row", "categories",
            function($scope, $routeParams, Rows, Row, categories)
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
     * Reset the new row's form.
     */
    function initNewRow()
    {
        $scope.new_row =
        {
            date        : new Date(),    // current day
            category    : null,
            amount      : '',
            description : ''
        };
    }

    /**
     * Read user rows.
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
     * Create row.
     */
    $scope.create = function()
    {
        // Format data
        $scope.new_row.date = $scope.new_row.date.toISOString("%Y-%m-%d").slice(0, 10);

        Rows.create({ type: $routeParams.type }, $.param($scope.new_row))
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
    $scope.update = function(row)
    {
        Row.update({ type: $routeParams.type, id: row.entry_id }, $.param(row))
           .$promise.then(function()
           {
                // row edit mode
                row.edit = false;
           });
    };

    /**
     * Delete row.
     */
    $scope.delete = function(row)
    {
        if(!confirm("Confirm delete"))
        {
            return;
        }

        Row.remove({ type: $routeParams.type, id: row.entry_id })
            .$promise.then(function()
            {
                // remove row from scope
                var index = $scope.rows.indexOf(row);
                $scope.rows.splice(index, 1);
            });
    };

    /**
     * Execute on page loading.
     */
    initialize();
    initNewRow();

}]);
