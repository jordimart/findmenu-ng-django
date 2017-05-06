(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-center';
    }

    var config = {
        appErrorPrefix: '[jordimart Error] ',
        appTitle: 'jordimart'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider',
        'exceptionHandlerProvider', '$translatePartialLoaderProvider', '$translateProvider'
    ];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider,
        exceptionHandlerProvider, $translatePartialLoaderProvider, $translateProvider) {

        $translateProvider.registerAvailableLanguageKeys(['es', 'ca', 'en'], {
            'ca-ES': 'ca',
            'en-US': 'en',
            'en-UK': 'en',
            'es-ES': 'es'
        });

        $translatePartialLoaderProvider.addPart('core');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/i18n/{part}/{lang}.json',
            loadFailureHandler: 'MyErrorHandler'
        });
        $translateProvider.useCookieStorage();

        $translateProvider
            .determinePreferredLanguage()
            .fallbackLanguage('en')
            .useSanitizeValueStrategy(null);


        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ': '
        });
    }

})();