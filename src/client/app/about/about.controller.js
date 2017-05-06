(function() {
    'use strict';

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

    AboutController.inject = ['logger', '$translatePartialLoader'];

    function AboutController(logger, $translatePartialLoader) {
        var vm = this;
        vm.title = 'About';

        $translatePartialLoader.addPart('about');

        activate();

        ////////////////

        function activate() {
            logger.info('Activated About View');
        }
    }
})();