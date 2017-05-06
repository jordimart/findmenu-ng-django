(function() {
    'use strict';

    angular
        .module('app.blog')
        .controller('BlogController', BlogController);

    BlogController.inject = ['logger', '$translatePartialLoader'];

    function BlogController(logger, $translatePartialLoader) {
        var vm = this;
        vm.title = 'Blog';

        $translatePartialLoader.addPart('blog');

        activate();

        ////////////////

        function activate() {
            logger.info('Activated Blog View');
        }
    }
})();