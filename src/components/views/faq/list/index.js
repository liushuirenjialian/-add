require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var status = transition.to.params.status;
      this.status = status;
      this.$dispatch('showBreadcrumb', 'FAQ管理');
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
      sort: 'id,desc',
      myGames: []
    };
  },
  components: {
    paging: require('../../../common/paging')
  },
  ready: function () {
    this.bindMyGames();
    this.addtheadSort();
  },
  events: {
    pagindGo: function (num, size) {
      this.size = size;
      this.bindList(num);
    }
  },
  methods: {
    addtheadSort: function () {
      var _this = this;
      var tdList = $('#faqThead').find('td');
      tdList.each(function (index) {
        var td = tdList.eq(index);
        var name = td.attr('name');
        if (name) {
          td.append('<span/>');
          td.click(function () {
            tdList.attr('class', '');
            tdList.find('span').attr('class', '');
            td.find('span').attr('class', 'caret');
            var sort = name + ',desc';
            if (sort === _this.sort) {
              sort = name + ',asc';
              td.attr('class', 'dropup');
            }
            _this.sortDo(sort);
          });
        }
      });
    },
    sortDo: function (sort) {
      this.sort = sort;
      this.bindList(0);
    },
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    showEdit: function (id) {
      this.$router.go('/faq/edit/' + id);
    },
    bindList: function (num) {
      var url = '';
      var param = this.getSearchInfo();
      // ac_.assign(this.getSearchInfo(), param);
      param.page = num;
      param.size = this.size;
      this.page = num;
      var _this = this;
      if (this.status === 'all') {
        this.status = -1;
        // url = '/api/tickets/search/' + this.status;
      }
      // param.gameId = 23;
      param.sort = this.sort;
      param.categoryFaqId = this.status;
      param.games = this.getCheckedGames();
      url = '/api/search/f-aqs';
      ac_http.request(_this, 'GET', url, param, function (res) {
        _this.total = res.headers('x-total-count');
        res.data.forEach(function (item) {
          if (!item.majorCategoryInfo) {
            item.majorCategoryInfo = {};
            item.majorCategoryInfo.name = '';
          }
        });
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
    getSearchInfo: function () {
      var inputList = $('.field-div').find('input,select');
      var data = {};
      inputList.each(function (index) {
        var input = inputList.eq(index);
        var val = input.val();
        if (val) {
          var name = input.attr('name');
          eval('data.' + name + '=val');
        }
      });
      return data;
    },
    cancelSearch: function () {
      var inputList = $('.field-div').find('input,select');
      inputList.each(function (index) {
        var input = inputList.eq(index);
        input.val('');
      });
      this.bindList(0);
    },
    getCheckedGames: function () {
      var games = [];
      ac_.forEach(this.myGames, function (item) {
        if (item.checked) {
          games.push(item.id);
        }
      });
      return games.join(',');
    }
  }
};
