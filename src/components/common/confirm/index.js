
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  // isshow：true 显示，false 不显示, Data：倒腾一下传回去
  props: ['isshow', 'data', 'message'],
  methods: {
    confirmDo: function (bo) {
      this.isshow = false;
      // 为true 再把数据传回去
      if (bo) {
        this.$dispatch('confirm-status', this.data);
      }
    }
  }
};
