import {data} from './BaaS/data.js';
import {templateLoader} from './template-loader.js';
import {dateTime} from './datetime.js';

var comments = (function () {
    var text, objectId, user, comment, parent, $that, commentCount;

    function post() {
        $('.offer').on('click', '#comment-btn', function () {
            $(this).next().toggle();
            $(this).addClass('first-click');
        });

        $('div.offer').on('click', '.first-click', function () {
            $that = $(this);
            parent = $(this.parentElement)[0].className;
            text = $(this).next().val();
            objectId = $(this).data("object-id");
            user = data.login.user;
            $(this).removeClass('first-click');
            comment = {
                objectId: objectId,
                comments: [
                    {
                        text: text,
                        user: user,
                        ___class: "comments"
                    }
                ]
            };
            if (comment.comments[0].text) {
                data.postComment(comment)
                    .then(function () {
                        data.offers()
                            .then(function (res) {
                                commentCount = $.grep(res.data, function (e) {
                                    return e.objectId == objectId;
                                });
                                $that.prev()
                                    .find('figcaption#count-comments a')
                                    .html('Comments: ' + '<b>' + commentCount[0].comments.length + '</b>')
                            })
                    })
            }
        })

    }

    function get() {
        $('#right-section').on('click', 'figure #count-comments', function () {
            objectId = $(this).data("object-id");
            data.offerById(objectId)
                .then(function (res) {
                    templateLoader.get('comments-list')
                        .then(function (template) {
                            $('#svg-map').toggle(false);
                            $('#comments-list').html(template(res));
                            $('.main-row').on('click', '#left-section #back-btn', function () {
                                $('#svg-map').toggle(true);
                                $('#comments-list').empty();
                            })
                        })
                })
        })
    }


    return {
        post,
        get
    }
})();
export {comments}
