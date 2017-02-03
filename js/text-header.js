import {templateLoader} from './template-loader.js';

var textHeader = (function () {

    function textHeader(category) {
        var categoryObj = {};
        var categoryList = {
            browse: {
                text:'Browse Category',
                subText:'Category description'
            },
            returnCategory(){
                for (let prop in categoryList) {
                    if (categoryList[category] == categoryList[prop]) {
                        return categoryObj[prop] = categoryList[prop];
                    }
                }
            }
        };

        categoryList.returnCategory();

        templateLoader.get('header-text')
            .then((html) => $('#header-content').html(html(categoryObj)))

    }

    return textHeader

})();
export {textHeader}
