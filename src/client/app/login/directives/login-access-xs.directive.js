(function () {
    'use strict';

    angular
        .module('app.login')
        .directive('loginAccessXs', loginAccessXs);

    /* @ngInject */
    function loginAccessXs() {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'app/login/directives/login-access-xs.html'
        };

        TopNavController.$inject = ['headerService'];

        /* @ngInject */
        function TopNavController(headerService) {
            var vm = this;
            vm.showLogin = showLogin;
            vm.logout = logout;

            activate();

            function activate() {
                headerService.login();
            }

            function showLogin() {
                headerService.openLoginModal();
            }

            function logout() {
                headerService.logout();
            }
        }
        return directive;
    }
})();