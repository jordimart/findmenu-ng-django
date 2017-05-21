(function() {
    'use strict';

    angular
        .module('headerService')
        .factory('headerService', header);

    header.$inject = ['authCookiesService', '$rootScope', '$state', '$uibModal', 'dataservice'];

    /* @ngInject */
    function header(authCookiesService, $rootScope, $state, $uibModal, dataservice) {
        return {
            login: login,
            logout: logout,
            openLoginModal: openLoginModal
        };

        function login() {

            //al cargarse la pagina por primera vez, user es undefined
            var user = authCookiesService.GetCredentials();
            if (user) {
                //mostramos enlces segun la entrada
                $rootScope.accederV = false;
                $rootScope.profileV = true;
                $rootScope.logoutV = true;
                //$rootScope.avatar = user.avatar;
                $rootScope.user = user.username;

                /* if (user.user.length === 1) {
                   $rootScope.name = user.email;
                 } else {
                   $rootScope.name = user.name;
                 }*/

                //redirigimos al home si nos logueamos
                $state.go('home');

            } else {
                $rootScope.accederV = true;
            }
        }

        function logout() {
            var data = authCookiesService.GetCredentials();
            dataservice.post('/api/v1/auth/logout/', data).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(response) {
                authCookiesService.ClearCredentials();

                //habilitamos o deshabilitamos enlaces
                $rootScope.accederV = true;
                $rootScope.profileV = false;
                //limpiamos los valores
                $rootScope.name = '';
                $rootScope.avatar = '';
                $rootScope.logoutV = false;
                //redirigimos al home
                $state.go('home');
            }

            function loginErrorFn(response) {
                console.log('error en el server');
            }

        }

        function openLoginModal() {

            var modalInstance = $uibModal.open({
                animation: 'true',

                templateUrl: 'app/login/login.html',
                windowClass: 'modal-center modal fade in',
                controller: 'LoginController',
                controllerAs: 'vm',
                size: 'sm'
            });
        }

    }

}());