import {templateLoader} from '../template-loader.js';
import {textHeader}     from '../text-header.js';
import {data}           from '../BaaS/data.js';
import {searchFilter}   from '../search-filter.js'

var searchController = (function () {
    function search() {
        templateLoader.get('search')
            .then(html => $('#content').html(html))
            .then(function () {
                $('#bg-header').addClass('bg-header-second');
                $('.header-buttons, #home-bottom-text').hide();
                textHeader('search')
                searchFilter()
            })
            .then(function () {
                $('#btn-search').on('click', function () {
                    var obj = {data: []};
                    data.offers()
                        .then(function (respond) {
                            respond.data.forEach(function (item, index) {
                                for (var i = 0; i < searchFilter.region.length; i++) {
                                    if (item.region == searchFilter.region[i]) {
                                        obj.data.push(item)
                                    }
                                }
                            });
                            return templateLoader.get('search-result')
                        })
                        .then(template => template(obj))
                        .then(function (html) {
                            $('#result-search').html(html)
                        })
                })
            })
    }

    return search

})()
export {searchController}
