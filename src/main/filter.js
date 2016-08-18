var moment = require('moment');

module.exports = {
  formatDate: function (time) {
    if (!time) { return '';}
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  },
  formatDay: function (time) {
    if (!time) { return '';}
    return moment(time).format('YYYY-MM-DD');
  },
  formatUserActivated: function (bo) {
    if (bo === true) {
      return '已激活';
    }
    return '未激活';
  },
  formatTicketStatus: function (status) {
    if (status === 0) {
      return '<span class="tag label work">未处理</span>';
    }
    if (status === 1) {
      return '<span class="tag label family">进行中</span>';
    }
    if (status === 8) {
      return '<span class="tag label friend">已回复</span>';
    }
    if (status === 9) {
      return '<span class="tag label study">工单结束</span>';
    }
    return '';
  }
};
