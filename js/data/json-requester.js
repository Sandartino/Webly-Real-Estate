var jsonRequester = (function () {

    function send(method, url, headers, data) {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                contentType: 'application/json',
                headers: headers,
                applicationType: 'REST',
                data: JSON.stringify(data),
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function get(url, headers, data) {
        return send('GET', url, headers, data);
    }

    function post(url, headers, data) {
        return send('POST', url, headers, data);
    }

    function put(url, header, data) {
        return send('PUT', url, header, data);
    }

    function del(url) {
        return send('DELETE', url);
    }

    return {
        send: send,
        get: get,
        post: post,
        put: put,
        del: del
    };
}());

export {jsonRequester};
