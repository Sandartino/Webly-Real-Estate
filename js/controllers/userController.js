import {data} from '../back-end/data.js';
import {alertCustom} from '../modules/alert.js';

var userController = (function () {
    $('#register-menu').on('click', function () {
        $('#register-container').toggle();
        $('#login-container').toggle(false);
    });
    $('#login-menu').on('click', function () {
        $('#login-container').toggle();
        $('#register-container').toggle(false);
    });

    $('#register-menu-m').on('click', function () {
        $('#register-container-m').toggle();
        $('#login-container-m').toggle(false);
    });
    $('#login-menu-m').on('click', function () {
        $('#login-container-m').toggle();
        $('#register-container-m').toggle(false);
    });

    function register() {
        $('#register-btn, #register-btn-m').on('click', function () {
            var user = {
                name: $('#register-name').val(),
                password: $('#register-pass').val()
            };
            if (!user.name) {
                user = {
                    name: $('#register-name-m').val(),
                    password: $('#register-pass-m').val()
                };
                $('#login-container-m, #register-container-m').toggle(false)
            }

            data.register(user)
                .then(function () {
                    user.login = user.name;
                    data.login(user);
                    $('#register-container, #register-menu').toggle();
                    $('#logout-menu').css('display', 'inline');
                    $('#login-menu a').html('Logged-in');
                })
                .then(function () {
                    alertCustom("Registered </br> Logged-in", 'success');
                })
                .catch(function (err) {
                    alertCustom(JSON.parse(err.responseText).message, 'danger');
                });
        });
    }

    function login() {
        $('#login-btn, #login-btn-m').on('click', function () {
            var user = {
                login: $('#login-name').val(),
                password: $('#login-pass').val()
            };
            if (!user.login) {
                user = {
                    login: $('#login-name-m').val(),
                    password: $('#login-pass-m').val()
                };
                $('#login-container-m, #register-container-m').toggle(false)
            }

            data.login(user)
                .then(function () {
                    $('#login-container, #register-menu').toggle(false);
                    $('#login-menu a').html('Logged-in');
                    $('#logout-menu').css('display', 'inline');
                })
                .catch(function (err) {
                    alertCustom(JSON.parse(err.responseText).message, 'danger');
                });
        });
    }

    var hostname = window.location.href;
    function logout() {
        data.logout()
            .then(function () {
                $('#login-menu a').html('Login');
                $('#logout-menu, #register-menu').toggle();
                $('#register-name, #register-pass').val('');

                window.location.href = hostname;
            });
    }

    return {
        register,
        login,
        logout
    };
})();
export {userController};
