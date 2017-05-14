(function() {
    'use strict';

    angular
        .module('app.restaurants')
        .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.inject = ['logger', '$translatePartialLoader', '$scope', 'mockdata', 'filterRestaurants', 'dataservice'];

    function RestaurantsController(logger, $translatePartialLoader, $scope, mockdata, filterRestaurants, dataservice) {
        var vm = this;
        vm.title = 'Restaurants';
        //vm.cards = mockdata.getMockRestaurants();
        vm.radioModel = 'launch_price';
        vm.userIcon = {
            'scaledSize': [40, 40],
            'url': "static/images/user-icon.png"
        };
        vm.findmenuIcon = "static/images/findmenuGreen.png";
        vm.changeTags = changeTags;
        // vm.options = mockdata.getMockRestaurants().city;



        $translatePartialLoader.addPart('restaurants');

        activate();


        ////////////////

        function activate() {
            logger.info('Activated Restaurants View');
            dataservice.get('/restaurants/').then(function(response) {
                console.log(response.data);
                vm.cards = response.data;
                changeTags();
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