var moment = require('moment');

module.exports = {
  formatDate: function (time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  },
  formatDay: function (time) {
    return moment(time).format('YYYY-MM-DD');
  },
  formatUserActivated: function (bo) {
    if (bo === true) {
      return '已激活';
    }
    return '未激活';
  }
};
