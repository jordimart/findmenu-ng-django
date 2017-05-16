(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'nya.bootstrap.select',
            'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.mockdata',
            'ui.router', 'ngplus', 'pascalprecht.translate', 'slickCarousel',
        ]).factory('MyErrorHandler', function($q, $log) {
            return function(part, lang, response) {
                $log.error('The "' + part + '/' + lang + '" part was not loaded. ' + response);
                return $q.when({});
            };
        })
        .run(function($rootScope, $translate) {
            $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
                console.log('TRANSLATE REFRESH');
                $translate.refresh();
            });
        })
        .run(function($http, $cookies) {
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        });
})();