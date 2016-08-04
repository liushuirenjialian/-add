
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  components: {
    omoheader: require('../header'),
    omoleftmenu: require('../leftmenu')
  }
};
