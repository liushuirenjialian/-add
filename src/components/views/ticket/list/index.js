require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var status = transition.to.params.status;
      this.status = status;
      this.$dispatch('showBreadcrumb', '工单管理');
      this.bindList(0);
    }
  },
  data: function () {
    return {
      actionId: 1,
      status: '',
      roleList: [],
      page: 0,
      size: 10,
      total: 0,
      myGames: []
    };
  },
  components: {
    paging: require('../../../common/paging')
  },
  created: function () {
    this.bindMyGames();
  },
  events: {
    pagindGo: function (num, size) {
      this.size = size;
      this.bindList(num);
    }
  },
  methods: {
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    showDetatil: function (id) {
      this.$router.go('/ticket/detail/' + id);
    },
    bindList: function (num) {
      var url = '/api/tickets';
      var param = {};
      param.page = num;
      param.size = this.size;
      this.page = num;
      var _this = this;
      if (this.status === 'all') {
        this.status = -1;
        // url = '/api/tickets/search/' + this.status;
      }
      param.status = this.status;
      param.games = this.getCheckedGames();
      url = '/api/tickets/getList';
      ac_http.request(_this, 'GET', url, param, function (res) {
        _this.total = res.headers('x-total-count');
        _this.roleList = res.data;
      });
    },
    bindMyGames: function () {
      var url = '/api/users/myGames';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        res.data.forEach(function (item) {
          item.checked = false;
        });
        _this.myGames = res.data;
      });
    },
    searchGame: function (game) {
      ac_.forEach(this.myGames, function (item) {
        if (item.id === game.id) {
          item.checked = !game.checked;
        }
      });
      this.bindList(0);
    },
    getCheckedGames: function () {
      var games = '';
      ac_.forEach(this.myGames, function (item) {
        if (item.checked) {
          games += item.id + ',';
        }
      });
      return games;
    }
  }
};
