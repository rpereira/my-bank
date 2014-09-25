/*global angular */

angular.module("MyBank")

.constant("categories",
{
    expenses:
    [
        "General",
        "Food",
        "Education",
        "Clothes",
        "Rent",
        "House",
        "Insurances",
        "Health",
        "Travel",
        "Fuel",
        "Car",
        "Energy/Water"
    ],
    incomes:
    [
        "Wages",
        "Renting",
        "Gifts"
    ]
});
