
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['name', 'isOrder'],
  data: function () {
    return {
      orderClass: 'caret',
      sort: 'desc',
      sortBo: false,
      isDo: false
    };
  },
  watch: {
    isOrder: function (val) {
      if (val === this.name) {
        if (!isDo) {
          this.sortBo = false;
          this.sortDo();
        }
      } else {
        this.orderClass = '';
        this.isDo = false;
      }
    }
  },
  methods: {
    sortDo: function () {
      debugger;
      this.isDo = true;
      this.sortBo = !this.sortBo;
      this.sort = this.sortBo ? 'desc' : 'asc';
      this.orderClass = this.sortBo ? 'caret' : 'asc';
      this.$dispatch('sortBy', this.name, this.sort);
    }
  }
};
