(function () {
    'use strict';

    angular
        .module('app.restaurants')
        .factory('filterRestaurants', filterRestaurants);

    function filterRestaurants($http, $q, exception, logger) {
        var service = {
            filterTags: filterTags
        };

        return service;


        /**
         * @param  {} radioModel Input parameter
         * @param  {} cards Object to which we will change the filters parameter
         * 
         */
        function filterTags(radioModel, cards) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].filters = cards[i][radioModel];
            }
            return cards;
        }
    }
})();