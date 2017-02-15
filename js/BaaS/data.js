import {jsonRequester} from './json-requester.js';

var data = (function () {
    const APP_ID = "379AE062-1B99-6B22-FF9A-5AA317152A00",
        APP_KEY = "80597B4F-87CA-E845-FFF6-7A57B4564E00",
        URL_OFFERS = "https://api.backendless.com/v1/data/offers",
        headers = {
            "application-id": APP_ID,
            "secret-key": APP_KEY,
            "application-type": "REST"
        };

    function offers() {
        return jsonRequester.get(URL_OFFERS, headers)
    }
    function filterOffers(){
        // var query="=(region='Burgas' OR region='Varna') AND (price>=1000 AND price<=20000)";
        // var encode=encodeURIComponent(query)
        // var url="https://api.backendless.com/v1/data/offers?where"+encode

        // return jsonRequester.get(URL_OFFERS, headers)
        
    }

    return {
        offers,
        filterOffers
    }

})();
export {data}
