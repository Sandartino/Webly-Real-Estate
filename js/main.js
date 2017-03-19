import {homeController}     from  './controllers/homeController.js';
import {searchController}   from './controllers/searchController.js';
import {contactController}  from './controllers/contactController.js';
import {userController}     from './controllers/userController.js';
import {offersController}   from './controllers/offersController.js';

routie({
    '': homeController,
    'search': searchController,
    'addoffer': offersController,
    'register': userController.register,
    'contact': contactController,
    'login': userController.login,
    'logout': userController.logout
});









