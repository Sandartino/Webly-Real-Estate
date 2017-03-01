import {homeController}     from  './js/controllers/homeController.js';
import {searchController}   from './js/controllers/searchController.js';
import {browseController}   from './js/controllers/browseController.js';
import {userController}     from './js/controllers/userController.js';
import {offersController} from './js/controllers/offersController.js';

// iztegli routie.js
//mahni "/" v index.html
//     routie({
//         '': homeController,
//         'search': searchController,
//         'browse': browseController,
//         'register': userController.register,
//         'login': userController.login,
//         'logout': userController.logout
//     })

(function () {
    Path.map("#/").to(homeController);
    Path.map("#/search").to(searchController);
    
    Path.map("#/addoffer").to(offersController);
    // Path.map("#/addoffer/post").to(offersController.postOffer);
    
    Path.map("#/browse").to(browseController);
    Path.map("#/register").to(userController.register);
    Path.map("#/login").to(userController.login);
    Path.map("#/logout").to(userController.logout);
    
    Path.root("#/");
    Path.listen();
})();








