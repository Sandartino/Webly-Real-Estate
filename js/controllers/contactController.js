import {templateLoader} from '../template-loader.js';
import {textHeader}     from '../text-header.js';
import {data}           from '../BaaS/data.js';
import {alertCustom}    from '../alert.js';

var contactController = (function () {

    function contact() {
        data.isLogged()
            .then(function (logged) {
                if (logged) {
                    templateLoader.get('contact')
                        .then(function (template) {
                            $('#content').html(template);
                            $('#bg-header').addClass('bg-header-second');
                            $('.header-buttons, #home-bottom-text').hide();

                            textHeader('contact');

                            $('#sendMail-btn').on('click', function () {

                                var mail = {
                                    subject: $('#subject').val(),
                                    bodyparts: {
                                        textmessage: $('#mail-text').val()
                                    },
                                    to: ["weblydemo@gmail.com"]
                                };

                                data.sendMail(mail)
                                    .then(function () {
                                        alertCustom('Success', 'success');
                                        $('#mail')[0].reset();
                                    })
                                    .catch(function (err) {
                                        alertCustom('Error.Mail not send!', 'danger');
                                        console.log(JSON.parse(err.responseText).message);
                                    });

                            });
                        });
                } else {
                    alertCustom('Login required', 'danger');
                }
            });

    }

    return contact;
})();
export {contactController};


