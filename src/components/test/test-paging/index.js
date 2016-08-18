require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      num: '',
      size: ''
    };
  },
  components: {
    paging: require('../../common/paging')
  },
  created: function () {
  },
  events: {
    pagindGo: function (num, size) {
      this.num = num;
      this.size = size;
      // console.log('num'+ num + 'size:' + size);
    }
  },
  methods: {
    getUserInfo: function () {

    }
  }
};
