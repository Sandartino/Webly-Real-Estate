import {jsonRequester} from './json-requester.js';

var data = (function () {
    const APP_ID = "379AE062-1B99-6B22-FF9A-5AA317152A00",
        APP_KEY = "80597B4F-87CA-E845-FFF6-7A57B4564E00",
        URL_ALL = "https://api.backendless.com/v1/data/browse",
        headers = {
            "application-id": APP_ID,
            "secret-key": APP_KEY,
            "application-type": "REST"
        };

    function browse() {
        return jsonRequester.get(URL_ALL, headers)
    }

    return {
        browse
    }

})();
export {data}
