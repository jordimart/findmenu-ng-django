(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', 'dataservice', 'cookiesService','mockdata','$state'];

  function ProfileController(logger, dataservice, cookiesService, mockdata,$state) {
    var vm = this;
    vm.title = 'Home';
    vm.name = '';
    vm.lastname = '';
    vm.birthdate = '';
    vm.email = '';
    vm.city = '';
    vm.text ='';

    vm.friends = mockdata.getMockUsers();
    vm.restaurants = mockdata.getMockRestaurants();
    vm.breakpoints = [
        {
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
        }
    ];

    vm.SubmitProfile = SubmitProfile;

    activate();

    function activate() {
      logger.info('Activated Profile View');
      getProfile();
    }

    function getProfile() {

      var user = cookiesService.GetCredentials();
      if (user.user ==='admin'){
          vm.user= 'admin';
          vm.name = 'Jorge';
          vm.firstname = 'Martínez';
          vm.lastname= 'Frias';
          vm.birthdate = '26/05/1983';
          vm.email = 'jordimart83@gmail.com';
          vm.city = 'Ontinyent';
          vm.registrationdate = '01/05/2017';
          vm.restaurantnumber = 200;
          vm.friendsnumber = 100;
          vm.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula tellus, vehicula et enim auctor, elementum varius enim.';
      }
    }

    function SubmitProfile(){
        logger.success('Datos modificados');
        $state.go('home');
    }

  }
})();
