import {homeController} from  './js/controllers/homeController.js';
import {browseController} from './js/controllers/browseController.js';

var router = (function () {

    routie({
        '':  homeController,
         'browse': browseController
    })

})();
export {router}