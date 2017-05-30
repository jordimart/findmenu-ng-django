(function() {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$translatePartialLoader', 'dataservice', '$state', '$uibModalInstance',
        'authCookiesService', 'logger', 'headerService'
    ];

    function LoginController($translatePartialLoader, dataservice, $state, $uibModalInstance,
        authCookiesService, logger, headerService) {

        var vm = this;
        $translatePartialLoader.addPart('layout');
        vm.loginEmail = '';
        vm.loginPass = '';
        vm.registerUser = '';
        vm.registerEmail = '';
        vm.registerPass = '';
        vm.registerPass2 = '';
        vm.SubmitLogin = SubmitLogin;
        vm.SubmitSignup = SubmitSignup;
        vm.Close = Close;

        function SubmitLogin() {
            var data = {
                'email': vm.loginEmail,
                'password': vm.loginPass
            };
            dataservice.post('/api/users/login/', data).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(response) {
                logger.success('Usuario autentificado');
                authCookiesService.SetCredentials(response.data);
                $uibModalInstance.close();
                headerService.login();
            }

            function loginErrorFn(response) {
                logger.error(
                    'Error en las credenciales, el usuario o la contraseña no son correctos');
            }
        }

        function SubmitSignup() {

            if (vm.registerPass === vm.registerPass2) {

                var data = {
                    'username': vm.registerUser,
                    'email': vm.registerEmail,
                    'password': vm.registerPass
                };
                dataservice.post('/api/v1/accounts/', data).then(registerSuccessFn, registerErrorFn);

                function registerSuccessFn(response) {
                    logger.success('Usuario registrado');
                    $uibModalInstance.close();
                }

                function registerErrorFn(response) {
                    logger.warning('Ya existe un usuario con ese nombre');
                }
            } else {
                logger.warning('Los dos passwords deben ser iguales');

            }
        }

        function Close() {
            $uibModalInstance.close();
        }


    }
})();