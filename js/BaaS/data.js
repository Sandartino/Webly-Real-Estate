import {jsonRequester} from './json-requester.js';

var data = (function () {
    const APP_ID = "379AE062-1B99-6B22-FF9A-5AA317152A00",
        APP_KEY = "80597B4F-87CA-E845-FFF6-7A57B4564E00",
        URL = "https://api.backendless.com/v1/",
        AUTH_TOKEN = 'auth-token',
        HEADER = {
            "application-id": APP_ID,
            "secret-key": APP_KEY
        };

    function register(user) {
        return jsonRequester.post(URL + 'users/register', HEADER, user)
    }

    function login(user) {
        return jsonRequester.post(URL + 'users/login', HEADER, user)
            .then(function (res) {
                sessionStorage.setItem(AUTH_TOKEN, res["user-token"])
            })
    }

    function logout() {
        HEADER["user-token"] = sessionStorage.getItem(AUTH_TOKEN);
        return jsonRequester.get(URL + 'users/logout', HEADER)
            .then(() => sessionStorage.removeItem(AUTH_TOKEN))
    }

    function isLogged() {
        var authToken = sessionStorage.getItem(AUTH_TOKEN);
        return jsonRequester.get(URL + 'users/isvalidusertoken/' + authToken, HEADER)
    }

    function offers() {
        return jsonRequester.get(URL + 'data/offers', HEADER)
    }


    return {
        register,
        login,
        logout,
        isLogged,
        offers
    }

})();
export {data}
