var acIndexOf = require('lodash/indexOf');
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['total', 'size', 'page'],
  data: function () {
    return {
      pageNum: 0,
      checknum: 0,
      pageIndexList: [],
      sizeList: [10, 20, 50, 100],
      prevStaus: false,
      nextStaus: false,
      isshow: true,
      selectSize: 0,
      beSizeBo: false
    };
  },
  watch: {
    total: function () {
      // this.total = val;
      this.bindPaging();
    },
    size: function () {
      // this.size = val;
      this.bindPaging();
    },
    selectSize: function () {
      if (this.selectSize === '') {
        this.selectSize = 10;
      }
      this.linkgo(1, this.beSizeBo);
      this.beSizeBo = true;
    }
  },
  created: function () {
    this.bindPaging();
  },
  methods: {
    bindPaging: function () {
      this.isshow = true;
      this.pageCount = this.total % this.size === 0 ? this.total / this.size : Math.ceil(this.total / this.size);
      if (this.pageCount === 1) {
        this.isshow = false;
      }
      if (this.page > this.pageCount) {
        this.page = 0;
      }
      if (!this.size) { this.size = 0;}
      if (acIndexOf(this.sizeList, this.size) < 0) {
        this.sizeList.push(this.size);
      }
      this.bindPageButton();
    },
    linkgo: function (num, changeSize) {
      if (this.pageNum === num && !changeSize) { return;}
      this.pageNum = num;
      this.bindPaging();
      this.$dispatch('pagindGo', num - 1, this.selectSize);
    },
    buttonStausDo: function () {
      if (this.pageNum === 1) {
        this.prevStaus = true;
      } else {
        this.prevStaus = false;
      }
      if (this.pageNum === this.pageCount) {
        this.nextStaus = true;
      } else {
        this.nextStaus = false;
      }
    },
    bindPageButton: function () {
      this.pageIndexList = [];
      if (this.pageNum === 0) {
        this.pageNum = this.page + 1;
      }
      var pageNum = this.pageNum;
      if (this.pageCount > 8) {
        var num = this.pageCount - pageNum;
        if (pageNum > 4) {
          if (pageNum > this.pageCount - 4) {
            for (var l = 0; l < (6 - num); l++) {
              this.pageIndexList.push(pageNum - (6 - num) + l);
            }
            for (var k = 0; k < num + 1; k++) {
              this.pageIndexList.push(pageNum + k);
            }
          } else {
            for (var i = 0; i < 3; i++) {
              this.pageIndexList.push(pageNum - 3 + i);
            }
            for (var n = 0; n < 4; n++) {
              this.pageIndexList.push(pageNum + n);
            }
          }
        } else {
          for (var e = 0; e < 7; e++) {
            this.pageIndexList.push(e + 1);
          }
        }
      } else {
        for (var c = 0; c < this.pageCount; c++) {
          this.pageIndexList.push(c + 1);
        }
      }
      this.buttonStausDo();
    }
  }
};
