import {data}           from '../data/data.js';
import {templateLoader} from '../modules/template-loader.js';
import {alertCustom}    from '../modules/alert.js';
import {textHeader}     from '../modules/text-header.js';

var offersController = (function () {
    function offers() {
        var ownerId = sessionStorage.getItem('ownerId'),
            user = sessionStorage.getItem('userName'),
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

                                    //add
                                    $('#addOffer-btn').on('click', function () {
                                        var offer = {
                                            title: $('#title').val(),
                                            price: +$('#price').val(),
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
                                                    obj.push(res);
                                                    var li = "<li id=" +`${res.objectId}`+"><span data-objectid="+ `${res.objectId}`+">"+`${res.title}`+"</span></li>";
                                                    var img = "<a style='display: block' href='#addoffer'><img src='./img/delete.png' data-objectid=" +`${res.objectId}`+"></a>";
                                                    $('#count-offer').html(obj.length)
                                                    $('#list-offer').append(li);
                                                    $('#delete').append(img);
                                                    //alertCustom('success','success')
                                                })
                                        }
                                    });

                                    //delete
                                    $('#delete').on('click', 'img', function () {
                                        var deleteOffer = $(this).data("objectid");
                                        $('li#' + deleteOffer).remove();
                                        $(this).parent().remove();
                                        $('#count-offer').html(obj.length - 1);
                                        data.deleteOffer(deleteOffer)
                                            .then(function () {
                                                obj = $.grep(obj, function (n) {
                                                    return n.objectId !== deleteOffer
                                                });
                                                obj.ownerId = ownerId;
                                                obj.user = user;
                                                alertCustom('deleted','success')
                                            })
                                    });

                                });
                        });
                } else {
                    alertCustom('Login required', 'danger');
                }
            });
    }


    function validateOffer(offer) {
        if(offer.title.length > 27){
            alertCustom('Title must be under 28 symbols', 'danger');
            return false;
        }
        if (offer.price < 1000 || offer.price > 50000 || isNaN(offer.price)) {
            alertCustom('Price must be 1000-50000', 'danger');
            return false;
        }
        if (offer.img.length === 0) {
            offer.img = "http://placehold.it/150x150";
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

// .catch(function (err) {
//     console.log(JSON.parse(err.responseText).message);
// });





