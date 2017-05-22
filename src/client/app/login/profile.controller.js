(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['logger', 'dataservice', 'authCookiesService', 'mockdata', '$state'];

    function ProfileController(logger, dataservice, authCookiesService, mockdata, $state) {
        var vm = this;
        vm.title = 'Home';
        vm.name = '';
        vm.lastname = '';
        vm.birthdate = '';
        vm.email = '';
        vm.city = '';
        vm.text = '';

        vm.friends = mockdata.getMockUsers();
        vm.restaurants = mockdata.getMockRestaurants();
        vm.breakpoints = [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }];

        vm.SubmitProfile = SubmitProfile;

        activate();

        function activate() {
            logger.info('Activated Profile View');
            getProfile();
        }

        function getProfile() {

            var user = authCookiesService.GetCredentials();
            if (user.username) {
                dataservice.get('/api/profiles/' + user.username).then(profileSuccessFn, profileErrorFn);

                function profileSuccessFn(response) {
                    logger.success('Profile');
                    var user = response.data.profile;

                    console.log(response);
                    vm.name = user.first_name;
                    vm.firstname = user.last_name;
                    vm.birthdate = user.date_birth;
                    vm.email = user.email;
                    vm.city = user.city;
                    vm.restaurantnumber = user.restaurants;
                    vm.friendsnumber = user.friends;
                    vm.text = user.bio;
                    vm.image = user.image;
                }

                function profileErrorFn(response) {
                    logger.error(
                        'Error al entrar al profile');
                }
                /* vm.user = 'admin';
                 vm.name = 'Jorge';
                 vm.firstname = 'Martínez';
                 vm.lastname = 'Frias';
                 vm.birthdate = '26/05/1983';
                 vm.email = 'jordimart83@gmail.com';
                 vm.city = 'Ontinyent';
                 vm.registrationdate = '01/05/2017';
                 vm.restaurantnumber = 200;
                 vm.friendsnumber = 100;
                 vm.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula tellus, vehicula et enim auctor, elementum varius enim.';*/
            }
        }

        function SubmitProfile() {
            logger.success('Datos modificados');
            $state.go('home');
        }

    }
})();