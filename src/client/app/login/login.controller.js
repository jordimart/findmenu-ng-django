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
                'email': vm.loginUser,
                'password': vm.loginPass
            };
            dataservice.post('/api/v1/auth/login/', data).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect to index
             */
            function loginSuccessFn(response) {
                //Authentication.setAuthenticatedAccount(response.data);
                logger.success('Usuario autentificado');
                console.log(response.data);
                cookiesService.SetCredentials(response.data);
                console.log(response.data);
                $uibModalInstance.close();
                headerService.login();
            }

            /**
             * @name loginErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function loginErrorFn(response) {
                //return response;
                logger.error(
                    'Error en las credenciales, el usuario o la contraseña no son correctos');
            }
            //var dataUserJSON = JSON.stringify(data);
            //dataservice.localSignin(dataUserJSON).then(function(response) {

            /*if ('admin' === vm.loginUser && 'admin' === vm.loginPass) {
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
            }*/

            // }
            //)

        }

        function SubmitSignup() {
            console.log('entro a el signup');

            if (vm.registerPass === vm.registerPass2) {

                var data = {
                    'username': vm.registerUser,
                    'email': vm.registerEmail,
                    'password': vm.registerPass
                        //'usertype': 'client'
                };
                dataservice.post('/api/v1/accounts/', data).then(registerSuccessFn, registerErrorFn);

                /**
                 * @name registerSuccessFn
                 * @desc Log the new user in
                 */
                function registerSuccessFn(data, status, headers, config) {
                    logger.success('Usuario registrado');
                    $uibModalInstance.close();
                }

                /**
                 * @name registerErrorFn
                 * @desc Log "Epic failure!" to the console
                 */
                function registerErrorFn(data, status, headers, config) {
                    console.error('Register failure!');
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
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