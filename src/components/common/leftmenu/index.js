var myMenus = require('./menu.js');

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: {
    selected: {
      type: Number,
      coerce: function (val) {
        var res = val;
        if (typeof val !== 'number') {
          res = val || 99;
        }
        return res;
      }
    }
  },
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
