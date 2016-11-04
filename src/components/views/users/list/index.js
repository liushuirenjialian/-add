require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var rolename = transition.to.params.rolename;
      this.rolename = rolename;
      this.$dispatch('showBreadcrumb', '用户管理');
      this.bindList(0);
    }
  },
  data: function () {
    return {
      dropdownStatus: false,
      userList: [],
      total: 0,
      page: 0,
      size: 10,
      sort: 'id,desc',
      rolename: ''
    };
  },
  components: {
    paging: require('../../../common/paging')
  },
  events: {
    pagindGo: function (num, size) {
      this.size = size;
      this.bindList(num);
    },
    listRoleQuery: function (rolename) {
      if (this.rolename !== rolename) {
        this.rolename = rolename;
        this.bindList(0);
      }
    }
  },
  ready: function () {
    this.addtheadSort();
  },
  methods: {
    addtheadSort: function () {
      var _this = this;
      var tdList = $('#userThead').find('td');
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
    bindList: function (num) {
      var url = '/api/users';
      var _this = this;
      var param = {};
      param.page = num;
      param.size = this.size;
      param.sort = this.sort;
      this.page = num;
      if (this.rolename !== 'all') {
        url = '/api/users/search/' + this.rolename;
      }
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.total = ret.headers('x-total-count');
        _this.userList = ret.data;
      });
    },
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    showDetatil: function (id) {
      this.$router.go('/users/detail/' + id);
    },
    deleteData: function (id) { // 确定删除后，把倒腾的数据传回来
      var url = '/api/users/' + id;
      var _this = this;
      ac_http.request(_this, 'DELETE', url, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.bindList(_this.page);  // 删除后刷新页面
      });
    },
    deleteDo: function (id) {
      this.confirmStatus = true; // 控制显示confirm
      this.id = id; // 传给子组件， 子组件再传回来
    }
  }
};
