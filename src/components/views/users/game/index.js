var acFilter = require('lodash/filter');
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      gameList: [],
      userGames: []
    };
  },
  watch: {
    userGames: function () {
      this.refresh();
    }
  },
  events: {
    loadUserGames: function (userGames) {
      this.userGames = userGames;
    }
  },
  created: function () {
    if (!this.userGames) {
      this.userGames = [];
    }
    this.initData();
  },
  methods: {
    initData: function () {
      var _this = this;
      var url = '/api/games';
      ac_http.request(_this, 'GET', url, function (ret) {
        ret.data.forEach(function (item) {
          item.checked = false;
        });
        _this.gameList = ret.data;
        _this.refresh();
      });
    },
    refresh: function () {
      var _this = this;
      if (!_this.userGames) {return;}
      _this.gameList.forEach(function (item) {
        item.checked = false;
        _this.userGames.forEach(function (temp) {
          if (temp.id === item.id) {
            item.checked = true;
          }
        });
      });
    },
    addUserGame: function (game) {
      this.removeUserGame(game);
      this.userGames.push(game);
      this.$dispatch('sync-games', this.userGames);
    },
    removeUserGame: function (game) {
      this.userGames = acFilter(this.userGames, function (item) { return item.id !== game.id; });
      this.$dispatch('sync-games', this.userGames);
    }
  }
};
