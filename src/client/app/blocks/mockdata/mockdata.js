(function() {
    'use strict';

    angular
        .module('blocks.mockdata')
        .factory('mockdata', mockdata);

    /* @ngInject */
    function mockdata() {
        var service = {

            getMockRestaurants: getMockRestaurants,
            getMockPosts: getMockPosts,
            getMockUsers: getMockUsers

        };


        return service;
        /////////////////////

        function getMockRestaurants() {
            return [
                { image: 'static/images/grilled.jpg', name: 'Bar el LLombo', breackfast_price: 5, launch_price: 7, dinner_price: 14, city: 'Ontinyent', valoration: '7/10', num_reviews: '200', users: '100', lat: 38.81867897937066, lon: -0.6092698127031326, filters: '' },
                { image: 'static/images/finger-food.jpg', name: 'La Tardor', breackfast_price: 4.5, launch_price: 9, dinner_price: 15, city: 'Ontinyent', valoration: '4/10', num_opinions: '100', users: '550', lat: 38.818269377532786, lon: -0.6107631325721741, filters: '' },
                { image: 'static/images/food-platter.jpg', name: 'El tirador', breackfast_price: 6, launch_price: 11, dinner_price: 13, city: 'Ontinyent', valoration: '2/10', num_opinions: '250', users: '320', lat: 38.82526990128548, lon: -0.6088252365589142, filters: '' },
                { image: 'static/images/pizza.jpg', name: 'El encuentro', breackfast_price: 7, launch_price: 8, dinner_price: 12, city: 'Ontinyent', valoration: '6/10', num_opinions: '300', users: '2', lat: 38.813592226254336, lon: -0.6084725260734558, filters: '' },
                { image: 'static/images/salad.jpg', name: 'Hermanos camineros', breackfast_price: 5.5, launch_price: 10, dinner_price: 11, city: 'Villena', valoration: '9/10', num_opinions: '90', users: '450', lat: 38.64530882678072, lon: -0.8681391924619675, filters: '' },
                { image: 'static/images/grilled.jpg', name: 'Restaurante el Poligon', breackfast_price: 4, launch_price: 9, dinner_price: 9, city: 'Carlet', valoration: '7/10', num_opinions: '68', users: '600', lat: 39.232326896777074, lon: -0.4890076071023941, filters: '' },
                { image: 'static/images/bruschetta.jpg', name: 'La Taska', breackfast_price: 4, launch_price: 6, dinner_price: 10, city: 'Ontinyent', valoration: '5/10', num_opinions: '2', users: '1000', lat: 38.818956922133204, lon: -0.6107215583324432, filters: '' }
            ];
        }

        function getMockPosts() {
            return [
                { image: 'static/images/grilled.jpg', name: 'Noticia 1', text_resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula tellus, vehicula et enim auctor, elementum varius enim.' },
                { image: 'static/images/bruschetta.jpg', name: 'Noticia 2', text_resume: 'Donec ultricies lacus in augue finibus, nec pulvinar nisi venenatis. Cras vestibulum egestas consequat. Proin eget aliquet nulla' },
                { image: 'static/images/food-platter.jpg', name: 'Noticia 3', text_resume: 'Nunc lobortis tortor sit amet est faucibus, tincidunt sollicitudin lacus hendrerit. Maecenas quis purus congue,' },
                { image: 'static/images/pizza.jpg', name: 'Noticia 4', text_resume: 'Suspendisse scelerisque sed ante quis cursus. Donec tempus justo convallis condimentum volutpat. Nunc et auctor massa.' },
                { image: 'static/images/salad.jpg', name: 'Noticia 5', text_resume: 'Aenean consequat turpis a nunc rhoncus, finibus finibus augue commodo.' },
                { image: 'static/images/finger-food.jpg', name: 'Noticia 6', text_resume: 'Proin risus leo, volutpat non enim in, accumsan blandit elit. Donec a risus sodales, porta nisl gravida, porta augue. Morbi quis ligula id dolor eleifend fermentum ac at ipsum.' },
            ];
        }

        function getMockUsers() {
            return [
                { image: 'static/images/jorge.png', user: 'admin', name: 'Jorge', first_name: 'Martínez', last_name: 'Frias', email: 'jordimart83@gmail.com', city: 'Ontinyent', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula tellus, vehicula et enim auctor, elementum varius enim.', restaurants: 20, friendsnumber: 200, datebirthday: '26/05/1983', registrationdate: '01/05/2017' },
                { image: 'static/images/profile1.jpg', user: 'josito', name: 'Jose', first_name: 'Sanz', last_name: 'Rodriguez', email: 'sanz@gmail.com', city: 'Ontinyent', text: 'Donec ultricies lacus in augue finibus, nec pulvinar nisi venenatis. Cras vestibulum egestas consequat. Proin eget aliquet nulla', restaurants: 200, friendsnumber: 100, datebirthday: '20/06/1990', registrationdate: '01/05/2017' },
                { image: 'static/images/profile2.jpg', user: 'javito', name: 'Javi', first_name: 'Cuerda', last_name: 'Alijo', email: 'cuerda@gmail.com', city: 'Ontinyent', text: 'Nunc lobortis tortor sit amet est faucibus, tincidunt sollicitudin lacus hendrerit. Maecenas quis purus congue,', restaurants: 100, friendsnumber: 400, datebirthday: '10/02/1950', registrationdate: '01/05/2017' },
                { image: 'static/images/profile3.jpg', user: 'raquelita', name: 'Raquel', first_name: 'Bosé', last_name: 'Úbeda', email: 'bose@gmail.com', city: 'Ontinyent', text: 'Suspendisse scelerisque sed ante quis cursus. Donec tempus justo convallis condimentum volutpat. Nunc et auctor massa.', restaurants: 300, friendsnumber: 245, datebirthday: '15/08/1991', registrationdate: '01/05/2017' },
                { image: 'static/images/profile4.jpg', user: 'josefita', name: 'Josefa', first_name: 'Fernandez', last_name: 'Gramaje', email: 'fernandez@gmail.com', city: 'Ontinyent', text: 'Aenean consequat turpis a nunc rhoncus, finibus finibus augue commodo.', restaurants: 150, friendsnumber: 432, datebirthday: '22/09/1945', registrationdate: '01/05/2017' },
                { image: 'static/images/profile5.jpg', user: 'lolita', name: 'Lola', first_name: 'Mesa', last_name: 'Pérez', email: 'mesa@gmail.com', city: 'Ontinyent', text: 'Proin risus leo, volutpat non enim in, accumsan blandit elit. Donec a risus sodales, porta nisl gravida, porta augue. Morbi quis ligula id dolor eleifend fermentum ac at ipsum.', restaurants: 1, friendsnumber: 20, datebirthday: '25/11/2005', registrationdate: '01/05/2017' },
            ];
        }
    }
}());