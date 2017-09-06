import {data}           from '../data/data.js';
import {templateLoader} from './template-loader.js';
import './datetime';

var comments = (function () {
    var text, offerId, user, comment, parent, $that, commentCount;

    function post() {
        $('.offer').on('click', '#comment-btn', function () {
            $(this).next().toggle();
            $(this).addClass('first-click');
        });

        $('div.offer').on('click', '.first-click', function () {
            $that = $(this);
            parent = $(this.parentElement)[0].className;
            text = $(this).next().val();
            offerId = $(this).data("object-id");
            user = sessionStorage.getItem('userName');
            $(this).removeClass('first-click');
            comment =
                {
                    text: text,
                    user: user
                };

            if (comment.text) {
                data.postComment(comment)
                    .then(function (res) {
                        var commentId = [res.objectId];
                        data.addRelationComment(offerId, commentId)
                            .then(function () {
                                data.commentCount(offerId)
                                    .then(function (count) {
                                        $that.parent()
                                            .find('span#count-comments a span')
                                            .html(count)
                                            .animate({fontSize: '21px'},'fast')
                                            .animate({fontSize: '19px'},'fast')
                                    })
                            })
                    });
            }
        });

    }

    function get() {
        $('#right-section').on('click', 'p #count-comments', function () {
            offerId = $(this).data("object-id");
            data.offerById(offerId)
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
