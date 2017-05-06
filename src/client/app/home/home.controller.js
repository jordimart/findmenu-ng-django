(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['logger', '$translatePartialLoader', '$scope', 'mockdata'];

    function HomeController(logger, $translatePartialLoader, $scope, mockdata) {
        var vm = this;
        vm.title = 'Home';
        vm.cards = mockdata.getMockRestaurants();
        vm.posts = mockdata.getMockPosts();
        vm.breakpoints = [
        {
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
        }
    ];

        $translatePartialLoader.addPart('home');

        activate();

        function activate() {
            logger.info('Activated Home View');

        }
    }
})();