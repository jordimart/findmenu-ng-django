(function() {
    'use strict';

    angular
        .module('app.blog')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'blog',
            config: {
                url: '/blog',
                templateUrl: 'app/blog/blog.html',
                controller: 'BlogController',
                controllerAs: 'vm',
                title: 'Blog',
                settings: {
                    nav: 2,
                    content: 'Blog'
                }
            }
        }];
    }
})();