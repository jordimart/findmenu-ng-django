(function() {
    'use strict';

    angular
        .module('app.contact')
        .controller('ContactController', ContactController);

    ContactController.inject = ['logger', '$translatePartialLoader','NgMap'];

    function ContactController(logger, $translatePartialLoader, NgMap) {
        var vm = this;
        vm.title = 'Contact';
        vm.name = '';
        vm.email = '';
        vm.subjectList = '';
        vm.comments = '';
        vm.submit = submit;

        $translatePartialLoader.addPart('contact');

        activate();

        ////////////////

        NgMap.getMap().then(function(map) {
            //$rootScope.map = map;
        });

        function activate() {
            logger.info('Activated Contact View');
        }
        function submit(){
            var data = {
                name: vm.name,
                from: vm.email,
                to: '',
                subject: vm.subjectList,
                text: vm.comments,
                
            };
            logger.success('Email enviado');
        }
    }
})();