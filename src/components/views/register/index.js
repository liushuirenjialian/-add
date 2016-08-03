require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      account: '',
      email: '',
      password: ''
    };
  },
  components: {
    // alert: require('../../common/global-alert')
  },
  created: function () {
    this.$dispatch('toggleNoauth');
  },
  // created: function () {
  //    this.$broadcast('showAlert', '注册211212功21核!');
  // },
  methods: {
    register: function () {
    // 在使用时向上广播找到components，然后向下找到globalalert下的方法
    // components界限，、向下广播
      // debugger
      // this.$dispatch('showMsg', 'heyanfang');//向上 传入一个meg
    // this.$broadcast('showAlert', '账号或密码错误!', 2);//下
      var url = '/api/register';
      var param = {};
      param.login = this.account;
      param.email = this.email;
      param.password = this.password;
      var _this = this;
      // setValidate(param);
      var headers = { 
        'Authorization': 'Basic dGlja2V0YXBwOm15LXNlY3JldC10b2tlbi10by1jaGFuZ2UtaW4tcHJvZHVjdGlvbg=='
      };
      ac_http.request(_this, 'post', url, param, function (ret) {
        if (ret.ret < 0) {
          // var data = ret.request.data;
                // console.log(ret);
                // alert(ret.data);
        _this.$dispatch('showMsg', '信息填写不正确', 1);
          return;
        }
        _this.$dispatch('showMsg', '注册成功，等待管理员审核!',2);
        // _this.$broadcast('showAlert', '注册成功，等待管理员审核!', 3);
            // var data = ret.data;
            // console.log(data)
            // ac_store.setUserInfo(data);
            // _this.$dispatch('showAlert', '注册成功');
      }, headers);
    }

    // setValidate(param){
    //  if(param.login.value < 4 ){
      
    //  }
    // }
  }
};

