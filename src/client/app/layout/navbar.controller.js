(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'routerHelper', '$translate', '$translatePartialLoader'];
    /* @ngInject */
    function NavbarController($state, routerHelper, $translate, $translatePartialLoader) {
        var vm = this;
        $translatePartialLoader.addPart('layout');
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.setLang = setLang;

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function setLang(langKey) {
            // You can change the language during runtime
            $translate.use(langKey);
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();