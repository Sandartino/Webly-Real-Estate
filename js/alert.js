var alertCustom = (function () {
    function alertCustom(message, alerttype) {
        $('#alert_placeholder')
            .append('<div style="max-width: 100%;min-width: 160px;height: auto;position: absolute;z-index: 100;left:38%" id="alertdiv" class="alert ' + 'alert-' + alerttype + '">' +
                '<a class="close" data-dismiss="alert">×</a>' +
                '<span>' + message + '</span>' +
                '</div>');
        setTimeout(function () {
            $("#alertdiv").remove();
        }, 4000);
    }

    return alertCustom
})();
export {alertCustom}
