var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("customers.php").then(function(response) {
        $scope.myData = response.data.records;
    });
});