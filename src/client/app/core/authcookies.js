(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authCookiesService', authCookiesService);

    authCookiesService.$inject = ['$cookies'];

    /* @ngInject */
    function authCookiesService($cookies) {
        return {
            SetCredentials: SetCredentials,
            ClearCredentials: ClearCredentials,
            GetCredentials: GetCredentials,
            Base64encode: Base64encode,
            Base64decode: Base64decode,
            GetCredentialsdecode: GetCredentialsdecode,
            GetCredentialsencode: GetCredentialsencode
        };
        //////////////////////////////////////////////////////////////////////
        function SetCredentials(users) {
            //encriptar data
            var email = Base64encode(users.email);
            var username = Base64encode(users.username);
            //var name = Base64encode(users.name);

            //almacenarlos en la cookie session
            $cookies.putObject('session', {
                email: email,
                //avatar: users.avatar,
                //password: password,
                username: username
            }, {
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            });

        }

        function ClearCredentials() {
            $cookies.remove('session');
        }

        function GetCredentials() {
            //al cargarse la pagina por primera vez, user es undefined
            var user = $cookies.getObject('session');
            if (user) { //si no es undefined
                //console.log(user); //datos encriptados
                user = GetCredentialsdecode();
                //console.log(user); //datos no encriptados
            }
            return user;

        }

        function GetCredentialsencode(users) {
            var email = Base64encode(users.email);
            var username = Base64encode(users.username);
            //var name = Base64encode(users.name);
            return {
                email: email,
                //avatar: users.avatar,
                username: username,
                //name: name
            };
        }

        function GetCredentialsdecode() {
            var email = Base64decode($cookies.getObject('session').email);
            var username = Base64decode($cookies.getObject('session').username)
                //var name = Base64decode($cookies.getObject('session').name);
            return {
                email: email,
                //avatar: $cookies.getObject('session').avatar,
                username: username,
                //name: name
            };
        }

        function Base64encode(input) {
            var keyStr =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            try {
                do {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = '';
                    enc1 = enc2 = enc3 = enc4 = '';
                } while (i < input.length);
            } catch (err) {
                console.log('error char');
            }
            return output;
        }

        function Base64decode(input) {
            var keyStr =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert(
                    'There were invalid base64 characters in the input text.\n' +
                    'Valid base64 characters are A-Z, a-z, 0-9, "+", "/",and "="\n' +
                    'Expect errors in decoding.');
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            } while (i < input.length);
            return output;
        }
    }

}());