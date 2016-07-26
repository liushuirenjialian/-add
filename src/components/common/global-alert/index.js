
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      alert: {
        show: 'alert-hide',
        class: 'bg-success',
        message: '操作成功'
      }
    };
  },
  components: {
    alert: require('../alerts')
  },
  created: function () {
    // console.log(this.data);
    this.$broadcast('showAlert', '这是全局的提示', 1);
  },
  events: {
    // classname 0:操作成功 1：信息 bg-info 2：提示  bg-warning 3：错误 bg-danger
    showAlert: function (message, classname) {
    }
  },
  methods: {
    close: function () {
      // console.log("close");
    }
  }
};
