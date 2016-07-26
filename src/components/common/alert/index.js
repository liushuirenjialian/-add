
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo()
    };
  },
  created: function () {
    console.log(this.data);
  },
  methods: {
    close: function () {
      console.log("close");
    }
  }
};
