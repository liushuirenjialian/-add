require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      confirmStatus: false,
      id: 0
    };
  },
  components: {
    confirm: require('../../common/confirm')
  },
  methods: {
    confirm: function (data) {
      console.log("data:"+ data);
    },
    deleteData: function (n) {
      this.confirmStatus = true;
      this.id = n;
    }
  }
};
