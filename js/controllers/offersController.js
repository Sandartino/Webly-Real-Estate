import {data}           from '../data/data.js';
import {templateLoader} from '../modules/template-loader.js';
import {alertCustom}    from '../modules/alert.js';
import {textHeader}     from '../modules/text-header.js';

var offersController = (function () {
    function offers() {
        var ownerId = data.login.ownerId,
            user = data.login.user,
            validOffer = false;
        data.isLogged()
            .then(function (logged) {
                if (logged) {
                    data.offersByOwner()
                        .then(function (obj) {
                            obj.ownerId = ownerId;
                            obj.user = user;
                            return obj;
                        })
                        .then(function (obj) {
                            templateLoader.get('addoffer')
                                .then(function (template) {
                                    $('#content').html(template(obj));
                                    $('#bg-header').addClass('bg-header-second');
                                    $('.header-buttons, #home-bottom-text').hide();

                                    textHeader('addoffer');

                                    $('#content').on('click', 'form #addOffer-btn', function () {
                                        
                                        var offer = {
                                            title: $('#title').val(),
                                            price: $('#price').val(),
                                            img: $('#img-url').val(),
                                            region: $('#select').val(),
                                            text: $('#textarea').val(),
                                            ownerId: obj.ownerId,
                                            user: obj.user
                                        };

                                        validOffer = validateOffer(offer);

                                        if (validOffer) {
                                            data.addOffer(offer)
                                                .then(function (res) {
                                                    obj.totalObjects += 1;
                                                    obj.data.push(res);
                                                    templateLoader.get('addoffer')
                                                        .then(function (template) {
                                                            $('#content').html(template(obj));
                                                        });
                                                })
                                                .catch(function (err) {
                                                    alertCustom('Invalid property', 'danger');
                                                    console.log(JSON.parse(err.responseText).message);
                                                });
                                        }
                                    });
                                });
                        });
                } else {
                    alertCustom('Login required', 'danger');
                }
            });
    }

    //validator client side
    function validateOffer(offer) {
        if (offer.img.length == 0) {
            offer.img = "http://placehold.it/150x150";
        }
        if (offer.price < 1000 || offer.price > 50000) {
            alertCustom('Price must be 1000-50000', 'danger');
            return false;
        }
        if (offer.region === null) {
            alertCustom('Property region is empty', 'danger');
            return false;
        }
        return true;
    }

    return offers;
})();
export {offersController};





