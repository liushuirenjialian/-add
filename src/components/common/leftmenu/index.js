var myMenus = require('./menu.js');

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      menuItems: myMenus.myMenusList
    };
  },
  created: function () {
    // console.log(this.menuItems);
  },
  method: {
  }
};
