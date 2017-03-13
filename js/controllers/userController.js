import {data} from '../BaaS/data.js';
import {alertCustom} from '../alert.js'

var userController = (function () {
    $('#register-menu').on('click', function () {
        $('#register-container').toggle();
        $('#login-container').toggle(false)
    });
    $('#login-menu, #login-menu-m').on('click', function () {
        $('#login-container').toggle();
        $('#register-container').toggle(false);
    });

    function register() {
        $('#register-btn').on('click', function () {
            var user = {
                name: $('#register-name').val(),
                password: $('#register-pass').val()
            };
            data.register(user)
                .then(function () {
                    user.login = user.name;
                    data.login(user);
                    $('#register-container, #register-menu').toggle();
                    $('#logout-menu').css('display', 'inline');
                    $('#login-menu a').html('Logged-in');
                })
                .then(function () {
                    alertCustom("Registered </br> Logged-in", 'success')
                })
                .catch(function (err) {
                    alertCustom(JSON.parse(err.responseText).message, 'danger')
                })
        });
    }

    function login() {
        $('#login-btn').on('click', function () {
            var user = {
                login: $('#login-name').val(),
                password: $('#login-pass').val()
            };
            data.login(user)
                .then(function () {
                    $('#login-container, #register-menu').toggle(false);
                    $('#login-menu a').html('Logged-in');
                    $('#logout-menu').css('display', 'inline');
                })
                .catch(function (err) {
                    alertCustom(JSON.parse(err.responseText).message, 'danger');
                })
        });
    }

    function logout() {
        data.logout()
            .then(function () {
                $('#login-menu a').html('Login');
                $('#logout-menu, #register-menu').toggle();
                $('#register-name, #register-pass').val('');
                //url refresh in case of multiple registrations in one browser session
                window.location.href = "http://localhost:63342/Webly-Real-Estate/index.html";
            })
    }

    return {
        register,
        login,
        logout
    }
})();
export {userController}
