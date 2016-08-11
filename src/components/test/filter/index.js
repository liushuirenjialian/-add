
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      message: 'test-message',
      list: [{
        time: '2016-01-13 09:44:15',
        status: '1'
      }, {
        time: '2016-02-10 09:44:15',
        status: '1'
      }]
    };
  },
  computed: {
    newMessage: function () {
      return 'hello:' + this.message + 'end!';
    }
  },
  methods: {
    update: function () {
      this.list = [{
        time: '2016-08-12 09:44:15'
      }, {
        time: '2016-08-12 09:44:15'
      }];
    }
  }
};
