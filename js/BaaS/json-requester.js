var jsonRequester = (function() {

  function send(method, url, options) {
    options = options || {};

    // headers e promenen
    var headers = options || {},
      data = options.data || undefined;

    var promise = new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        headers: headers,
        applicationType: 'REST',
        data: JSON.stringify(data),
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    //   var headers = {
    //     "application-id": "379AE062-1B99-6B22-FF9A-5AA317152A00",
    //     "secret-key": "80597B4F-87CA-E845-FFF6-7A57B4564E00",
    //     "application-type": "REST"
    //   }
    //   $.ajax({
    //     url: url,
    //     method: method,
    //     contentType: 'application/json',
    //     applicationType: 'REST',
    //     headers: headers,
    //     success: function(res) {
    //       resolve(res);
    //     },
    //     error: function(err) {
    //       reject(err);
    //     }
    //   });
    // });


    return promise;
  }

  function get(url, options) {
    return send('GET', url, options);
  }

  function post(url, options) {
    return send('POST', url, options);
  }

  function put(url, options) {
    return send('PUT', url, options);
  }

  function del(url, options) {
    return send('POST', url, options);
  }

  return {
    send: send,
    get: get,
    post: post,
    put: put,
    delete: del
  };
}());

export {jsonRequester}
