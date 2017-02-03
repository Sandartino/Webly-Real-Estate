import {templateLoader} from '../template-loader.js';

var homeController = (function () {

    function bgHeader() {
        $('#bg-header').addClass('bg-header-main').removeClass('bg-header-second');
        templateLoader.get('carousel')
            .then((html) => $('#header-content').html(html));
        templateLoader.get('home-content')
            .then((html) => $('#content').html(html));

    }

    return bgHeader
})();
export {homeController}