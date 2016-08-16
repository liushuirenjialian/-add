require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1,
      showFlow: false,
      detail: {
        id: 0,
        gameRegion: '',
        channelName: '',
        content: '',
        tags: '',
        updatedAt: '',
        replyContent: ''
      }
    };
  },
  components: {
    flow: require('../flow'),
    flowlist: require('../flowList')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '工单详情');
    this.initData();
  },
  methods: {
    logout: function () {
    },
    initData: function () {
      var _this = this;
      var id = this.$route.params.id;
      var url = '/api/tickets/' + id;
      ac_http.request(_this, 'GET', url, function (ret) {
        _this.detail = ret.data;
      });
    },
    backList: function () {
      this.$router.go('/home/ticket/detail');
    },
    showFlowDo: function () {
      this.showFlow = true;
    },
    replyDo: function () {

    }
  }
};
