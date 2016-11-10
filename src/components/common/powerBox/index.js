
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  name: 'power-box',
  props: ['auth'],
  data: function () {
    return {
      user: ac_store.getUserInfo(),
      show: false
    };
  },
  created: function () {
    this.show = this.hasPower(this.auth.split(','));
  },
  methods: {
    hasPower: function (itemAuth) {
      var power = false;
      var authorities = this.user.authorities;
      // if (itemAuth === null || itemAuth === '') { return true; }
      authorities.forEach(function (auth) {
        if (itemAuth.indexOf(auth) > -1) {
          power = true; return;
        }
      });
      return power;
    }
  }
};
