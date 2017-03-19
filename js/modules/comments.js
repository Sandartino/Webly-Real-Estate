import {data}           from '../back-end/data.js';
import {templateLoader} from './template-loader.js';
import './datetime';

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
                                $that.parent()
                                    .find('span#count-comments a span')
                                    .html(commentCount[0].comments.length);
                            });
                    });
            }
        });

    }

    function get() {
        $('#right-section').on('click', 'p #count-comments', function () {
            objectId = $(this).data("object-id");
            data.offerById(objectId)
                .then(function (data) {
                    sortComments(data);
                    templateLoader.get('comments-list')
                        .then(function (template) {
                            $('#svg-map').toggle(false);
                            $('#comments-list').html(template(data));
                            $('.main-row').on('click', '#left-section #back-btn', function () {
                                $('#svg-map').toggle(true);
                                $('#comments-list').empty();
                            });
                        });
                });
        });
    }

    function sortComments(data) {
        data.comments.sort(function (a, b) {
            return b.created - a.created;
        });
    }

    return {
        post,
        get
    };
})();
export {comments};
