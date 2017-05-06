(function() {
    'use strict';

    angular
        .module('app.restaurants')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'restaurants-map',
            config: {
                url: '/restaurants/map',
                templateUrl: 'app/restaurants/restaurants-map.html',
                controller: 'RestaurantsController',
                controllerAs: 'vm',
                title: 'Restaurants',
            }
        },
        {
            state: 'restaurants-list',
            config: {
                url: '/restaurants/list',
                templateUrl: 'app/restaurants/restaurants-list.html',
                controller: 'RestaurantsController',
                controllerAs: 'vm',
                title: 'Restaurants',
            }
        }
        ];
    }
})();