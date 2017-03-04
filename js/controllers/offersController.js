import {data} from '../BaaS/data.js'
import {templateLoader} from '../template-loader.js';
import {alertCustom} from '../alert.js'
import {textHeader}     from '../text-header.js';

var offersController = (function () {
    function offers() {
        var ownerId = data.login.ownerId;
        var user = data.login.user;
        data.isLogged()
            .then(function (logged) {
                if (logged) {
                    data.offersByOwner()
                        .then(function (obj) {
                            obj.ownerId = ownerId;
                            obj.user = user;
                            return obj
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
                                        data.addOffer(offer)
                                            .then(function (res) {
                                                obj.totalObjects += 1;
                                                obj.data.push(res);
                                                templateLoader.get('addoffer')
                                                    .then(function (template) {
                                                        $('#content').html(template(obj));
                                                        //recursion
                                                        // offers()
                                                    })
                                            })
                                    })
                                })
                        })
                } else {
                    alertCustom('Login required', 'danger')
                }
            })
    }

    return offers
})();
export {offersController}





