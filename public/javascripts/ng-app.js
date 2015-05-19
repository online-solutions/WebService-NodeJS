/**
 * Created by yohananjr13 on 5/19/15.
 */

angular.module('app', ['ngRoute'])
    //---------------
    // Services
    //---------------
    .factory('Products', ['$http', function ($http) {
        return $http.get('/products');
    }])
    //---------------
    // Controllers
    //---------------
    .controller('ProductController', ['$scope', 'Products', function ($scope, Products) {
        Products.success(function (data) {
            $scope.products = data;
        }).error(function (data, status) {
            console.log(data, status);
            $scope.products = [];
        });
    }])
    .controller('ProductDetailCtrl', ['$scope', '$routeParams', 'Products', function ($scope, $routeParams, Products) {
        $scope.product = Products[$routeParams.id];
    }])
    //---------------
    // Routes
    //---------------
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/products.html',
                controller: 'ProductController'
            })
            .when('/:id', {
                templateUrl: '/productDetail.html',
                controller: 'ProductDetailCtrl'
            });
    }]);