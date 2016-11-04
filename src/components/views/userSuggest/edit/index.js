require('./style.scss');
var vSelect = require('vue-select');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var id = transition.to.params.id;
      this.$dispatch('showBreadcrumb', '用户反馈编辑');
      this.initData(id);
    }
  },
  components: { vSelect: vSelect.VueSelect },
  data: function () {
    return {
      actionId: 1,
      showFlow: false,
      user: ac_store.getUserInfo(),
      categoryFaqs: [],
      userSuggestStatus: [
        { id: 0, name: '未处理' },
        { id: 1, name: '已处理' },
        { id: 2, name: '已忽略' }
      ],
      gameList: [],
      defaultData: {
        id: '',
        suggest: '',
        categoryFaq: {},
        game: {},
        userMobile: '',
        userQq: '',
        createAt: new Date(),
        fromUserId: '',
        fromUserName: ac_store.getUserInfo().login,
        isCategoryTop: 0,
        results: '',
        status: 0,
        updateAt: new Date()
      },
      detail: { }
    };
  },
  methods: {
    initData: function (id) {
      this.getCategoryFaqs();
      this.getAllGames();
      this.detail = this.defaultData;
      if (id === 'add') { return; }
      var _this = this;
      var url = '/api/user-suggests/' + id;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.detail = res.data;
      });
    },
    getCategoryFaqs: function () {
      var _this = this;
      var url = '/api/category-faqs';
      var param = {};
      param.page = 0;
      param.size = 1000;
      param.sort = 'sort,asc';
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.categoryFaqs = ret.data;
      });
    },
    getAllGames: function () {
      var _this = this;
      var url = '/api/games';
      var param = {};
      param.page = 0;
      param.size = 1000;
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.gameList = ret.data;
      });
    },
    save: function () {
      var _this = this;
      var param = {};
      ac_.forEach(this.detail, function (val, key) {
        param[key] = val;
      });
      param.fromUserName = this.user.login;
      var url = '/api/user-suggests';
      var method = 'POST';
      if (param.id > 0) {
        method = 'PUT';
      }
      if (!param.categoryFaq || !param.categoryFaq.id) {
        _this.$dispatch('showMsg', '分类不能为空！', 1); return;
      }
      if (!param.game || !param.game.id) {
        _this.$dispatch('showMsg', '所属游戏不能为空！', 1); return;
      }
      if (!param.suggest) {
        _this.$dispatch('showMsg', '反馈内容不能为空', 1); return;
      }
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.$dispatch('showMsg', '保存成功！');
        _this.detail.id = res.data.id;
        // _this.$router.go({
        //   name: 'faq-detail',
        //   params: { id: res.data.id }
        // });
      });
    }
  }
};
