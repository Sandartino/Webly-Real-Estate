import {templateLoader} from '../template-loader.js';
import {textHeader}     from '../text-header.js';
import {data}           from '../BaaS/data.js';

var searchController = (function () {
    function search() {
        templateLoader.get('search')
            .then(html => $('#content').html(html))
            .then(function () {
                $('#bg-header').addClass('bg-header-second');
                $('.header-buttons, #home-bottom-text').hide();
                textHeader('search')
            })
            .then(function () {
                $('#btn-search').on('click', function () {
                    var obj;
                    data.offers()
                        .then(function (res) {
                            obj = res;
                            return templateLoader.get('search-result')
                        })
                        .then(template => template(obj))
                        .then(function (html) {
                            $('#result-search').html(html)
                        })
                })
            })
        proba()
    }


    function proba() {
        // alert('ok')
    }

    return search

})()
export {searchController}
