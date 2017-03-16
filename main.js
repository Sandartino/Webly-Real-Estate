import {homeController}     from  './js/controllers/homeController.js';
import {searchController}   from './js/controllers/searchController.js';
import {contactController}  from './js/controllers/contactController.js';
import {userController}     from './js/controllers/userController.js';
import {offersController}   from './js/controllers/offersController.js';

routie({
    '': homeController,
    'search': searchController,
    'addoffer': offersController,
    'register': userController.register,
    'contact': contactController,
    'login': userController.login,
    'logout': userController.logout
});









