import {templateLoader} from '../template-loader.js';
import {textHeader}     from '../text-header.js';
import {data}           from '../BaaS/data.js';

var browseController = (function () {
    function bgHeader() {
        var obj;
        data.browse()
            .then(function (res) {
                obj = res;
                return templateLoader.get('browse-content')
            })
            .then(template=>template(obj))
            .then(html => $('#content').html(html))
            .then(function () {
                $('#bg-header').addClass('bg-header-second');
                $('.header-buttons,#home-bottom-text').hide();
                textHeader('browse')
            });
    }

    return bgHeader
})();
export {browseController}
