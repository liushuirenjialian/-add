var H5Uploader = require('../../../lib/h5uploader.js');
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo(),
      inputFirstName: '',
      email: '',
      password: '',
      qq: '',
      avatar: '',
      phone: '',
      confirmPassword: ''
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '个人信息');
  },
  methods: {
    updateProfile: function () {
      var url = '/api/account';
      var _this = this;
      var param = ac_store.getUserInfo();
      param.firstName = this.user.firstName;
      param.email = this.user.email;
      param.qq = this.user.qq;
      param.avatar = this.user.avatar;
      param.phone = this.user.phone;
      var authorities = param.authorities;
      delete param.authorities;
      ac_http.request(_this, 'POST', url, param, function (ret) {
        if (ret.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        param.authorities = authorities;
        ac_store.setUserInfo(param);
      });
    },
    uploadPicture: function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();
    },
    uploadAvatar: function () {
      var _this = this;
      H5Uploader.upload({
        action: 'http://www.hoolaiimg.com/h/fileUpload/upload',
        id: 'uploadFile',
        size: {
          max: 5000, // 5000kb
          valide: function () {
            _this.$dispatch('showMsg', '传输图片尺寸大于 5000KB');
          }
        },
        type: {
          name: 'csv;png;jpg;jpeg',
          valide: function () {
            _this.$dispatch('showMsg', '传输图片格式要求为' + this.name.replace(/;/g, ','));
          }
        },
        success: function (res) {
          if (res.ret < 1) {
            handleXHR.call(this, { res: res, type: 'alert' }); return;
          }
          _this.user.avatar = res.data.img;
        }
      });
    }
  },
  events: {
    onActived: function (id) {
      this.actionId = id;
    }
  }
};
