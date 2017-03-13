import {templateLoader} from '../template-loader.js';
import {textHeader}     from '../text-header.js';
import {data}           from '../BaaS/data.js';
import {searchFilter}   from '../search-filter.js';
import {comments}       from '../comments.js';
import 'pagination';

var searchController = (function () {
    function search() {
        templateLoader.get('search')
            .then(function (template) {
                $('#content').html(template);
                $('#bg-header').addClass('bg-header-second');
                $('.header-buttons, #home-bottom-text').hide();

                textHeader('search');
                searchFilter();
            });
        
        $('#content').on('click', '#left-section #search-btn', function () {
            var obj = {data: []};
            data.offers()
                .then(function (respond) {
                    respond.data.forEach(function (item, index) {
                        for (var i = 0; i < searchFilter.region.length; i++) {
                            if (item.region == searchFilter.region[i] && priceRange(item.price)) {
                                obj.data.push(item)
                            }
                        }
                    });
                    return templateLoader.get('search-result')
                })
                .then(function (template) {
                    $('#right-section').html(template(obj));

                    comments.get();
                    comments.post();
                })
                .then(function () {
                    // pagination
                    $(".pagination").customPaginate({
                        itemsToPaginate : ".offer",
                        activeClass : "active-class"

                    });
                })
        })

    }

    function priceRange(price) {
        var inRange = false;
        if (price >= searchFilter.price[0] && price <= searchFilter.price[1]) {
            inRange = true;
        }
        return inRange
    }

    return search

})();
export {searchController}
