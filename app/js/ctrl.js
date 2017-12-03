var app = angular.module('schoolApp', []);
app.controller('schoolCtrl', function($scope, $http) {
    $scope.gap = 5;
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.pagedSchools = [];
    $scope.sortMsg = 'Default Order';
    $scope.selectPlaceHolder = "Select search type";

    $scope.searchList = [{name:'School Name',val:'FIELD5'},
            {name:'Address',val:'FIELD9'},
            {name:'Area',val:'FIELD10'},
            {name:'Pincode',val:'FIELD11'},
            {name:'Landmark',val:'FIELD12'}];

    $scope.setSearch =function(searchVal){
        var txt = "<span class='caret'></span>"
        $('#searchDrop').html(searchVal.name)
        $('#searchDrop').append(txt)
        $scope.searchValue = searchVal.val;
        $scope.selectPlaceHolder = "Search by " + searchVal.name;
    }

    $scope.groupToPages = function() {
        $http.get("bangaloreSchools.json").then(function(response) {
            $scope.schools = response.data;
            for (var i = 0; i < $scope.schools.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedSchools[Math.floor(i / $scope.itemsPerPage)] = [$scope.schools[i]];
                } else {
                    $scope.pagedSchools[Math.floor(i / $scope.itemsPerPage)].push($scope.schools[i]);
                }
            }
        });
    };

    $scope.range = function (size, start, end) {
        var ret = [];
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedSchools.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.showMap = function (latlon) {
        var map = new google.maps.Map(document.getElementById("map"), {
            center:new google.maps.LatLng(latlon.replace("POINT(", "").replace(" ", ",").replace(")", "")),
            zoom:5
        });
    }
});

