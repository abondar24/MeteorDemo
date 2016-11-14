/**
 * Created by abondar on 11/12/16.
 */

angular.module('FoodMenu', ['angular-meteor', 'ui.router', 'accounts.ui']);

angular.module('FoodMenu').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider.state("addItem", {
            url: '/add-item',
            templateUrl: 'client/templates/addItem.ng.html',
            controller: 'CreateItemController',
            resolve: {
                "currentUser": ["$meteor", function ($meteor) {
                    return $meteor.requireUser();
                }]
            }
        })
            .state('list', {
                url: '/',
                templateUrl: 'client/templates/foodList.ng.html',
                controller: 'FoodListController',
                resolve: {
                    "subscribe": ["$meteor", function ($meteor) {
                        return $meteor.subscribe('images');
                    }]
                }
            })
            .state('editItem', {
                url: '/edit-item/:itemId',
                templateUrl: 'client/templates/addItem.ng.html',
                controller: 'EditItemController',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }],
                    "subscribe": ["$meteor", '$stateParams', function ($meteor, $stateParams) {
                        return $meteor.subscribe('foodMenu', {_id: $stateParams.itemId});
                    }]
                }
            });

        $urlRouterProvider.otherwise('/');
    }
]);

angular.module('FoodMenu').run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParms, fromState, fromParams, error) {
        if (error === "AUTH_REQUIRED"){
            $state.go('list');
        }
    });
}]);

