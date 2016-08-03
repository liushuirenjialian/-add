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
  methods: {
    register: function () {
      var url = '/api/register';
      var param = {};
      param.login = this.account;
      param.email = this.email;
      param.password = this.password;
      var _this = this;
      var headers = {
        'Authorization': 'Basic dGlja2V0YXBwOm15LXNlY3JldC10b2tlbi10by1jaGFuZ2UtaW4tcHJvZHVjdGlvbg=='
      };
      ac_http.request(_this, 'post', url, param, function (ret) {
        if (ret.ret < 0) {
<<<<<<< HEAD
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
=======
          _this.$dispatch('showMsg', '信息填写不正确', 1);
          return;
        }
        _this.$dispatch('showMsg', '注册成功，等待管理员审核!', 2);
>>>>>>> master
      }, headers);
    }
  }
};
