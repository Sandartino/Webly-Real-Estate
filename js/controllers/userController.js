import {data} from '../BaaS/data.js';
import {alertCustom} from '../alert.js'

var userController = (function () {
    $('#register-menu').on('click', function () {
        $('#register-container').toggle();
        $('#login-container').toggle(false)
    });
    $('#login-menu').on('click', function () {
        $('#login-container').toggle();
        $('#register-container').toggle(false);
    });

    function register() {
        $('#register-btn').on('click', function () {
            var user = {
                email: $('#register-email').val(),
                password: $('#register-pass').val()
            };
            data.register(user)
                .then(function () {
                    user.login = user.email;
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
                login: $('#login-email').val(),
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
                    console.log(err)
                })
        });
    }

    function logout() {
        data.logout()
            .then(function () {
                $('#login-menu a').html('Login')
                $('#logout-menu, #register-menu').toggle();
                $('#register-email, #register-pass').val('');
                //url refresh in case of multiple registrations in one browser session
                window.location.href = "http://localhost:63342/Webly-Real-Estate/index.html#/";
                location.reload();
            })
    }

    return {
        register,
        login,
        logout
    }
})();
export {userController}