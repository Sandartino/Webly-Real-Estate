import {templateLoader} from '../modules/template-loader.js';
import {data} from '../data/data.js';
import {alertCustom}    from '../modules/alert.js';

var homeController = (function () {

    function bgHeader() {
        $('.header-buttons, #home-bottom-text').toggle(true);
        $('#bg-header').addClass('bg-header-main').removeClass('bg-header-second');
        templateLoader.get('carousel')
            .then((html) => $('#header-content').html(html));
        templateLoader.get('home-content')
            .then((html) => $('#content').html(html));

        data.isLogged()
            .then(function (isLogged) {
                if (isLogged) {
                    $('#register-menu').toggle(false);
                    $('#login-menu a').html('Logged-in').css('color', '#009900');
                    $('#logout-menu').css('display', 'inline');
                } else if (sessionStorage.getItem("autoLogin") !== "1") {
                    var user = {
                        login: "test_user",
                        password: "test_user"
                    };
                    sessionStorage.removeItem("autoLogin");
                    data.login(user)
                        .then(function () {
                            $('#login-container, #register-menu').toggle(false);
                            $('#login-menu a').html('Logged-in').css('color', '#009900');
                            $('#logout-menu').css('display', 'inline');
                            alertCustom("Auto logged in as: </br> <b>test_user</b>", 'success');
                        })
                        .catch(function (err) {
                            alertCustom('error log in', 'danger');
                            console.log(err)
                        })

                }
            });
    }

    return bgHeader;
})();
export {homeController};