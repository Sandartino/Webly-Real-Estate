var searchFilter = (function () {
    function searchFilter() {
        searchFilter.region = [];
        searchFilter.price = [1000, 50000];
        var region = $('.region span'),
            $that, currentRegion, regionCollected, html, regexTest, id;

        //slider
        $("#slider_id").ionRangeSlider({
            type: "double",
            min: 1000,
            max: 50000,
            grid: true,
            step: 100,
            force_edges: true
        });


        //2way-binding --> http://stackoverflow.com/
        (function ($) {
            var oldHtml = $.fn.html;
            $.fn.html = function () {
                var ret = oldHtml.apply(this, arguments);
                this.trigger("change");
                return ret;
            };
        })(jQuery);

        //regions
        $("path, tspan").on('click', function () {
            $that = $(this);

            if ($that[0].nodeName == "tspan") {
                id = $that[0].innerHTML;
                $that = $("path#" + `${id}`)
            }

            var regionData = $that.data("region");
            currentRegion = new RegExp(regionData);
            html = region.html();
            regexTest = currentRegion.test(html);

            if (!regexTest) {
                region.append(regionData + " ")
            } else {
                html = html.replace(currentRegion, "");
                region.html(html);
                searchFilter.region.splice($.inArray(regionData, searchFilter.region), 1);
                return
            }

            regionCollected = $.inArray(regionData, searchFilter.region);
            if (regionCollected < 0) {
                searchFilter.region.push(regionData)
            }

        });

        //price
        $(".irs-single").on("change", function () {
            $('p.irs-from-bind span').html($(this).text());
            searchFilter.price[0] = +($('.irs-from').html().replace(/\s/g, ''));
            searchFilter.price[1] = +($('.irs-to').html().replace(/\s/g, ''));
        });

    }

    return searchFilter

})();
export {searchFilter}

