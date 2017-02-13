import {homeController} from  './js/controllers/homeController.js';
import {searchController} from './js/controllers/searchController.js';
import {browseController} from './js/controllers/browseController.js';

var router = (function () {

    routie({
        '': homeController,
        'search': searchController,
        'browse': browseController
    })

})();
export {router}