module.exports = {
  oauth: function (ctx, url, param, callback) {
    param.grant_type = 'password';
    param.scope = 'read write';
    param.client_secret = 'my-secret-token-to-change-in-production';
    param.client_id = 'ticketapp';
    vueApp.http.options.emulateJSON = true;
    //  'Content-Type': 'application/x-www-form-urlencoded',
    var headers = {
      Authorization: 'Basic dGlja2V0YXBwOm15LXNlY3JldC10b2tlbi10by1jaGFuZ2UtaW4tcHJvZHVjdGlvbg=='
    };
    this.request(ctx, 'POST', url, param, function (ret) {
      callback(ret);
    }, headers);
  },
  refresh_token: function (ctx, callback) {
    var oldtoken = ac_store.getToken();
    var param = {};
    param.grant_type = 'refresh_token';
    param.scope = 'read write';
    param.client_secret = 'my-secret-token-to-change-in-production';
    param.client_id = 'ticketapp';
    param.refresh_token = oldtoken.refresh_token;
    var url = '/oauth/token';
    var headers = {
    };
    vueApp.http.options.emulateJSON = true;
    this.request(ctx, 'POST', url, param, function (ret) {
      var token = ret.data;
      var expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
      token.expires_at = expiredAt.getTime();
      ac_store.setToken(token);
      callback(ret);
    }, headers);
  },
  requestDo: function (ctx, method, url, param, callback, headers) {
    if (!headers) {
      var token = ac_store.getToken();
      vueApp.http.options.emulateJSON = false;
      headers = {
        Authorization: 'Bearer ' + token.access_token
      };
    }
    ctx.$http({
      url: '/v1' + url,
      data: param,
      method: method,
      headers: headers
    }).then(function (res) {
      res.ret = 1;
      if (callback) {
        callback(res);
      }
    }, function (res) {
      res.ret = -1;
      if (!res.data) { res.data = {}; }
      if (!res.data.message) {
        res.data.message = '未知错误请重试！';
      }
      if (res.error && res.error !== 'invalid_token') {
        ac_store.logout();
        ctx.$dispatch('showMsg', 'token超时，请重新登录！', 1);
        ctx.$router.go('/login');
        return;
      }
      if (callback) {
        callback(res);
      }
    });
  },
  request: function (ctx, method, url, param, callback, headers) {
    var _this = this;
    if (!param) {
      param = {};
    }
    if (typeof(param) === 'function') {
      callback = param;
      param = {};
    }
    if (!headers) {
      var token = ac_store.getToken();
      if (token === null || !token) {
        ctx.$router.go('/');
        return;
      }
      var now = ac_util.dateAdd(new Date(), 'n', 5);
      if (token.expires_at < now.getTime()) {
        this.refresh_token(ctx, function () {
          _this.requestDo(ctx, method, url, param, callback, headers);
        });
      } else {
        _this.requestDo(ctx, method, url, param, callback, headers);
      }
    } else {
      _this.requestDo(ctx, method, url, param, callback, headers);
    }
  }
};
