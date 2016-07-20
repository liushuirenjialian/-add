
module.exports = {

  oahth : function(url,param,callback) {
    param.grant_type="password"
    param.scope="read write"
    param.client_secret="my-secret-token-to-change-in-production";
    param.client_id="ticketapp";
    var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + Base64.encode('ticketapp' + ':' + 'my-secret-token-to-change-in-production')
                };
    this.request("POST",url,param,function(ret){
      ac_store.setToken(ret);
      callback(ret);
    },headers);
  },
  request : function(method,url,param,callback,headers) {
    if(!param){
      param = {};
    }
    if(typeof(param) == 'function'){
       callback = param;
       param = {};
    }
    if(!headers){
        headers =  {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': 'Basic ' + ac_store.getToken().token;
                    };
    }
    this.$http({
      url: url,
      data: param,
      method: method,
      headers: headers
    }).then(function (res) {
      if(callback)
          callback(res);
    }, function (res) {
      if(callback)
          callback(res);
    });
  }

}
