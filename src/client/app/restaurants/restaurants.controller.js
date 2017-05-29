(function() {
    'use strict';

    angular
        .module('app.restaurants')
        .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.inject = ['logger', '$translatePartialLoader', '$scope', 'mockdata', 'filterRestaurants', 'dataservice'];

    function RestaurantsController(logger, $translatePartialLoader, $scope, mockdata, filterRestaurants, dataservice) {
        var vm = this;
        vm.title = 'Restaurants';
        vm.radioModel = 'launch_price';
        vm.userIcon = {
            'scaledSize': [40, 40],
            'url': "static/images/user-icon.png"
        };
        vm.findmenuIcon = "static/images/findmenuGreen.png";
        vm.changeTags = changeTags;

        $translatePartialLoader.addPart('restaurants');

        activate();

        ////////////////

        function activate() {
            getDataRestaurants();
        }

        function getDataRestaurants() {
            dataservice.get('/restaurants/').then(function(response) {
                if (response.data.length === 0) {
                    vm.cards = mockdata.getMockRestaurants();
                } else {
                    vm.cards = response.data;
                }
            });
        }

        /**
         * Change the map tags dynamically.
         * vm.radioModel Is the parameter we want to apply
         * We introduce vm.cards to change your filters parameter
         */
        function changeTags() {
            vm.cards = filterRestaurants.filterTags(vm.radioModel, vm.cards);
        }

    }
})();