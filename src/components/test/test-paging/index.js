require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function() {
    return {
      account: '',
      password: ''
    };
  },
  components: {
    paging: require('../../common/paging')
  },
  created: function () {
  },
  events: {
    pagindGo: function (num) {
      console.log(num);
    }
  },
  methods: {
    getUserInfo: function() {

    }
  }
};
