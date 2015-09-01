angular
    .module("moneYou", [])
    .controller("rateTabCtrl", function ($scope, $http) {

        $scope.data = {};

        //$scope.mcat = 0;

        $scope.settings = {mcat: 0};

        $scope.categories = ["NHG", "Up to 55%", "55% to 65%", "65% to 85%"]

        $scope.refresh = function () {

            //console.log(window.document.location.origin);

            var urlParm = window.document.location.origin + "/api/ratetabs?mcat=" + $scope.settings.mcat;

            $http.get(urlParm)
                .success(function (data) {
                    $scope.data.ratetabs = data;
            })
                .error(function (error) {
                    $scope.data.error = error;
            });           
        }
    });
