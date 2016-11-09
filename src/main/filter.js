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
  formatMessageStatus: function (status) {
    if (status === 1) {
      return '<span class="tag label study">已读</span>';
    }
    return '<span class="tag label family">未读</span>';
  },
  formatDateRelative: function (time) {
    return moment(time).fromNow();
  },
  formatUserActivated: function (bo) {
    if (bo === true) {
      return '<span class="tag label work">已激活</span>';
    }
    return '<span class="tag label friend">未激活</span>';
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
  },
  formatFAQStatus: function (status) {
    if (status === 0) {
      return '<span class="tag label work">草稿</span>';
    }
    if (status === 1) {
      return '<span class="tag label family">发布</span>';
    }
    if (status === 2) {
      return '<span class="tag label friend">关闭</span>';
    }
    return '';
  },
  formatUserSuggestStatus: function (status) {
    if (status === 0) {
      return '<span class="tag label work">未处理</span>';
    }
    if (status === 1) {
      return '<span class="tag label family">已处理</span>';
    }
    if (status === 2) {
      return '<span class="tag label friend">已忽略</span>';
    }
    return '';
  },
  formatGameStatus: function (status) {
    if (status === 0) {
      return '<span class="tag label work">不显示</span>';
    }
    if (status === 1) {
      return '<span class="tag label family">显示</span>';
    }
    return '';
  },
  formatFAQGames: function (FAQGames) {
    // console.log(FAQGames);
    if (!FAQGames) { return ''; }
    var faqGames = '';
    // FAQGames.forEach(function (item) {
    //   console.log(item);
    // });
    return faqGames;
  }
};
