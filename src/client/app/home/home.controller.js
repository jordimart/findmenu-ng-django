(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['logger', '$translatePartialLoader', '$scope', 'mockdata', 'dataservice'];

    function HomeController(logger, $translatePartialLoader, $scope, mockdata, dataservice) {
        var vm = this;
        vm.title = 'Home';
        //vm.cards = mockdata.getMockRestaurants();
        vm.posts = mockdata.getMockPosts();
        vm.breakpoints = [{
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

        $translatePartialLoader.addPart('home');

        activate();

        function activate() {
            logger.info('Activated Home View');
            dataservice.get('/restaurants/').then(function(response) {
                console.log(response.data);
                vm.cards = response.data;
            });
            dataservice.get('/restaurants/1/').then(function(response) {
                console.log(response.data);
            });

        }
    }
})();