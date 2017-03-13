import {homeController}     from  './js/controllers/homeController.js';
import {searchController}   from './js/controllers/searchController.js';
import {browseController}   from './js/controllers/browseController.js';
import {userController}     from './js/controllers/userController.js';
import {offersController} from './js/controllers/offersController.js';

routie({
    '': homeController,
    'search': searchController,
    'addoffer': offersController,
    'browse': browseController,
    'register': userController.register,
    'login': userController.login,
    'logout': userController.logout
});









