require('./style.scss');
var vSelect = require('vue-select');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var id = transition.to.params.id;
      this.$dispatch('showBreadcrumb', 'FAQ编辑');
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
      faqStatus: [
        { id: 0, name: '草稿' },
        { id: 1, name: '发布' },
        { id: 2, name: '关闭' }
      ],
      selected: null,
      gameList: [],
      isNoReply: false,
      isRecommend: false,
      isHighlight: false,
      isCategoryTop: false,
      isApplyAll: false,
      defaultData: {
        id: '',
        asked: 'asked',
        categoryFaq: {},
        channelIds: 'channelIds',
        channelVals: 'channelVals',
        createAt: new Date(),
        faq_games: [],
        fromUserId: '',
        fromUserName: ac_store.getUserInfo().login,
        hates: 0,
        isCategoryTop: false,
        isHighlight: false,
        isNoReply: false,
        isRecommend: false,
        isAllgames: 0,
        keywords: '',
        likes: 0,
        questions: '',
        status: 0,
        updateAt: new Date(),
        views: 0
      },
      detail: { }
    };
  },
  methods: {
    initData: function (id) {
      this.getCategoryFaqs();
      this.getAllGames();
      this.detail = this.defaultData;
      this.checkCheckbox();
      if (id === 'add') { return; }
      var _this = this;
      var url = '/api/f-aqs/' + id;
      ac_http.request(_this, 'GET', url, function (res) {
        // res.data.id = '';
        _this.detail = res.data;
        _this.checkCheckbox();
      });
    },
    checkCheckbox: function () {
      this.isCategoryTop = this.detail.isCategoryTop === 1;
      this.isHighlight = this.detail.isHighlight === 1;
      this.isNoReply = this.detail.isNoReply === 1;
      this.isRecommend = this.detail.isRecommend === 1;
      this.isApplyAll = this.detail.faq_games.length === 0;
    },
    setCheckbox: function () {
      this.detail.isCategoryTop = this.isCategoryTop ? 1 : 0;
      this.detail.isHighlight = this.isHighlight ? 1 : 0;
      this.detail.isNoReply = this.isNoReply ? 1 : 0;
      this.detail.isRecommend = this.isRecommend ? 1 : 0;
      if (this.isApplyAll) {
        this.detail.faq_games = [];
      }
      this.detail.isAllgames = this.isApplyAll ? 1 : 0;
    },
    getCategoryFaqs: function () {
      var _this = this;
      var url = '/api/category-faqs';
      var param = {};
      param.page = 0;
      param.size = 1000;
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
      this.setCheckbox();
      var param = {};
      ac_.forEach(this.detail, function (val, key) {
        param[key] = val;
      });
      param.fromUserName = this.user.login;
      var url = '/api/f-aqs';
      var method = 'POST';
      if (param.id > 0) {
        method = 'PUT';
      }
      if (!param.categoryFaq || !param.categoryFaq.id) {
        _this.$dispatch('showMsg', '分类不能为空！', 1); return;
      }
      if (!param.asked) {
        _this.$dispatch('showMsg', '问题题目不能为空', 1); return;
      }
      if (!param.questions) {
        _this.$dispatch('showMsg', '回答答案不能为空', 1); return;
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
