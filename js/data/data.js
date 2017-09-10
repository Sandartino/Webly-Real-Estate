import {jsonRequester} from './json-requester.js';

var data = (function () {
    const APP_ID = "EE276EF7-786C-BAC9-FF9E-31C3DE42FB00",
        APP_KEY = "80597B4F-87CA-E845-FFF6-7A57B4564E00",
        URL = "https://api.backendless.com/" + APP_ID + "/" + APP_KEY,
        AUTH_TOKEN = 'auth-token',
        HEADER = {
            "Content-Type": "application/json"
        };

    function register(user) {
        return jsonRequester.post(URL + '/users/register', HEADER, user);
    }

    function login(user) {
        return jsonRequester.post(URL + "/users/login", HEADER, user)
            .then(function (res) {
                sessionStorage.setItem(AUTH_TOKEN, res["user-token"]);
                sessionStorage.setItem('ownerId', res.ownerId);
                sessionStorage.setItem('userName', res.name);
                HEADER["user-token"] = res["user-token"]
            });
    }

    function isLogged() {
        var authToken = sessionStorage.getItem(AUTH_TOKEN);
        return jsonRequester.get(URL + '/users/isvalidusertoken/' + authToken, HEADER);
    }

    function logout() {
        HEADER["user-token"] = sessionStorage.getItem(AUTH_TOKEN);
        return jsonRequester.get(URL + '/users/logout', HEADER)
            .then(() => sessionStorage.clear());
    }

    function addOffer(offer) {
        return jsonRequester.post(URL + '/data/offers', HEADER, offer);
    }

    function deleteOffer(offer) {
        return jsonRequester.del(URL + '/data/offers/' + offer, HEADER);
    }

    function offersByOwner() {
        //var ownerId = `'${login.ownerId}'`;
        var ownerId = `'${sessionStorage.getItem('ownerId')}'`;
        return jsonRequester.get(URL + '/data/offers?where=' + encodeURIComponent("ownerId=" + ownerId), HEADER);
    }

    function offers() {
        return jsonRequester.get(URL + '/data/offers?loadRelations=comments&pageSize=100', HEADER);
    }

    function postComment(comment) {
        return jsonRequester.post(URL + '/data/comments', HEADER, comment);
    }

    function commentCount(offerId) {
        return jsonRequester.get(URL + '/data/comments/count?where=offers%5Bcomments%5D.objectId%20%3D%20%27' + offerId + '%27', HEADER);
    }

    function addRelationComment(parentId, childId) {
        return jsonRequester.put(URL + '/data/offers/' + parentId + "/comments", HEADER, childId);
    }

    function offerById(offerId) {
        return jsonRequester.get(URL + '/data/offers/' + offerId + '?loadRelations=comments', HEADER);
    }

    function sendMail(mail) {
        return jsonRequester.post(URL + '/messaging/email', HEADER, mail);
    }

    return {
        register,
        login,
        logout,
        isLogged,
        addOffer,
        deleteOffer,
        offersByOwner,
        offers,
        postComment,
        commentCount,
        addRelationComment,
        offerById,
        sendMail
    };

})();
export {data};
