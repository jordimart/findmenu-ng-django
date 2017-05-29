(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['logger', '$translatePartialLoader', '$scope', 'mockdata', 'dataservice'];

    function HomeController(logger, $translatePartialLoader, $scope, mockdata, dataservice) {
        var vm = this;
        vm.title = 'Home';
        vm.posts = mockdata.getMockPosts();
        vm.breakpoints = getBreackPointsCarousel();

        $translatePartialLoader.addPart('home');

        activate();

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

        function getBreackPointsCarousel() {
            return [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }];
        }
    }
})();