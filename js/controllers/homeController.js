import {templateLoader} from '../modules/template-loader.js';
import {data} from '../back-end/data.js';

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
                if(isLogged){
                    $('#register-menu').toggle(false);
                    $('#login-menu a').html('Logged-in');
                    $('#logout-menu').css('display', 'inline');
                }
            });
    }

    return bgHeader;
})();
export {homeController};