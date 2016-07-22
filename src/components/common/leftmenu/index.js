
var actionList = [];
var action = {};
action.id = 0;
action.name = '首页';
action.active = false;
action.link = '/home/index';
actionList.push(action);
action = {};
action.id = 1;
action.name = '工单';
action.active = false;
action.link = '/home/ticket';
actionList.push(action);

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: {
    selected: {
      type: Number,
      coerce: function (val) {
        var res = val;
        if (typeof val !== 'number') {
          res = val || 99;
        }
        return res;
      }
    }
  },
  data: function () {
    return {
      actionList: actionList
    };
  },
  created: function () {
    console.log(123333333);
  },
  method: {
    goLink: function (){
    }
  }
};
