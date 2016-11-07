var H5Uploader = require('../../../../lib/h5uploader.js');
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo(),
      message: '',
      errorList: [],
      uploadState: false
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', 'FAQ导入');
  },
  methods: {
    upload: function () {
      if (this.uploadState) { return;}
      this.uploadState = true;
      this.message = '';
      this.errorList = [];
      var _this = this;
      H5Uploader.upload({
        action: '/v1/api/f-aqs/read',
        id: 'uploadFile',
        type: {
          name: 'xls',
          valide: function () {
            _this.uploadState = false;
            _this.$dispatch('showMsg', '导入格式必须为.xls', 1);
          }
        },
        fail: function (res) {
          _this.uploadState = false;
          if (res.code !== 1) {
            _this.message = res.message; return;
          }
        },
        success: function (res) {
          _this.uploadState = false;
          if (res.code !== 1) {
            _this.message = res.message; return;
          }
          _this.message = '成功导入' + res.count + '条数据。';
          _this.errorList = res.errorList;
        }
      });
    }
  }
};
