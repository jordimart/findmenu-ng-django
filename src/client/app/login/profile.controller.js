(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['logger', 'dataservice', 'authCookiesService', 'mockdata', '$state'];

    function ProfileController(logger, dataservice, authCookiesService, mockdata, $state) {
        var vm = this;
        vm.title = 'Home';
        //data profile//
        vm.name = '';
        vm.firstname = '';
        vm.lastname = '';
        vm.birthdate = '';
        vm.email = '';
        vm.city = '';
        vm.restaurantnumber = '';
        vm.friendsnumber = '';
        vm.text = '';
        vm.image = '';
        vm.registrationdate = '';

        //data restaurants//
        vm.email = '';
        vm.restName = '';
        vm.restImage = '';
        vm.restCity = '';
        vm.restLatitude = '';
        vm.restLongitude = '';
        vm.valoration = '';
        vm.breackfast_price = '';
        vm.launch_price = '';
        vm.dinner_price = '';

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

        vm.restaurantcontrol = false;

        vm.SubmitProfile = SubmitProfile;
        vm.SubmitRestaurant = SubmitRestaurant;

        activate();

        function activate() {

            getProfile();
        }

        function getProfile() {

            var user = authCookiesService.GetCredentials();
            if (user.username) {
                dataservice.get('/api/profiles/' + user.username).then(profileSuccessFn, profileErrorFn);

                function profileSuccessFn(response) {
                    logger.success('Profile');
                    var user = response.data.profile;

                    vm.name = user.name;
                    vm.firstname = user.first_name;
                    vm.lastname = user.last_name;
                    vm.birthdate = user.date_birth;
                    vm.email = user.email;
                    vm.city = user.city;
                    vm.restaurantnumber = user.restaurants;
                    vm.friendsnumber = user.friends;
                    vm.text = user.bio;
                    vm.image = user.image;
                    vm.registrationdate = user.created_at;
                }

                function profileErrorFn(response) {
                    $state.go('home');
                    logger.error(
                        'Error al entrar al profile');
                }

            }
        }

        function SubmitProfile() {
            logger.success('Datos modificados');
            $state.go('home');
        }

        function SubmitRestaurant() {
            var data = {
                'author': vm.email,
                'name': vm.restName,
                'image': vm.restImage,
                'city': vm.restCity,
                'lat': vm.restLatitude,
                'lon': vm.restLongitude,
                'valoration': vm.valoration,
                'breackfast_price': vm.breackfast_price,
                'launch_price': vm.launch_price,
                'dinner_price': vm.dinner_price
            };

            dataservice.post('/restaurants/', data).then(successFn, errorFn);

            function successFn(response) {
                logger.success('Restaurante añadido');
                vm.restaurantcontrol = false;
            }

            function errorFn(response) {
                logger.error(
                    'Error al añadir el restaurante');
            }
        }

    }
})();