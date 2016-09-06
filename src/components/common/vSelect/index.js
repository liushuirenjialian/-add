var vSelect = require('vue-select');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['options', 'value'],
  data: function () {},
  components: {
    vselect: vSelect.VueSelect
  },
  methods: {}
};
