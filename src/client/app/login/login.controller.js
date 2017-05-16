(function() {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$translatePartialLoader', 'dataservice', '$state', '$uibModalInstance',
        'cookiesService', 'logger', 'headerService', 'Authentication'
    ];

    function LoginController($translatePartialLoader, dataservice, $state, $uibModalInstance,
        cookiesService, logger, headerService, Authentication) {

        var vm = this;
        $translatePartialLoader.addPart('layout');
        vm.loginUser = '';
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
                'user': vm.loginUser,
                'password': vm.loginPass
            };

            //var dataUserJSON = JSON.stringify(data);
            //dataservice.localSignin(dataUserJSON).then(function(response) {

            if ('admin' === vm.loginUser && 'admin' === vm.loginPass) {
                logger.success('Usuario autentificado');
                cookiesService.SetCredentials(data);
                $uibModalInstance.close();
                headerService.login();
            } else if (response.data === 'errorcredentials') {
                logger.error(
                    'Error en las credenciales, el usuario o la contraseña no son correctos'
                );
            } else {
                logger.error('Error en el server');
            }

            // }
            //)

        }

        function SubmitSignup() {
            console.log('entro a el signup');

            if (vm.registerPass === vm.registerPass2) {

                /*var data = {
                    'user': vm.registerUser,
                    'email': vm.registerEmail,
                    'password': vm.registerPass,
                    'usertype': 'client'
                };*/

                //var dataUserJSON = JSON.stringify(data);
                //dataservice.signup(dataUserJSON).then(function(response) {
                Authentication.register(vm.registerEmail, vm.registerPass, vm.registerUser);
                /* if ('admin' === vm.registerUser) {
                     logger.success('Usuario registrado');
                     $uibModalInstance.close();
                 } else {
                     if (response.data === 'name') {
                         logger.warning('Ya existe un usuario con ese nombre');

                     } else if (response.data === 'err') {
                         logger.error('Error en el server');
                     }
                 }*/
                // });
            } else {
                logger.warning('Los dos passwords deben ser iguales');

            }
        }

        function Close() {
            $uibModalInstance.close();
        }


    }
})();