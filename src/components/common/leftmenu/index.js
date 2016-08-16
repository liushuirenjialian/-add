var myMenus = require('./menu.js');

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      menuItems: []
    };
  },
  created: function () {
    // debugger;
    this.menuItems = myMenus.myMenusList(ac_store.getUserInfo());
    // console.log('myMenus');
    // console.log(this.menuItems);
  },
  method: {
  }
};
