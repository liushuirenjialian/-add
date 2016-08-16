var menus = require('json!./menu.json');

function getMyMenus(userInfo) {
  // var userInfo = acStore.getUserInfo();
  if (!userInfo) { return {};}
  var authorities = userInfo.authorities;
  authorities.push('ROCES');

  var myMenusList = [];
  function hasPower(itemAuth) {
    var power = false;
    if (itemAuth === null || itemAuth === '') { return true; }
    authorities.forEach(function (auth) {
      if (itemAuth.indexOf(auth) > -1) {
        power = true; return;
      }
    });
    return power;
  }

  menus.forEach(function (item) {
    item.haspower = false;
    myMenusList.push(item);
    if (item.subMenu === null || item.subMenu.length === 0) {
      item.haspower = true;
    }
    item.subMenu.forEach(function (subItem) {
      subItem.haspower = false;
      var power = hasPower(subItem.authorities);
      if (power) {
        subItem.haspower = true;
        item.haspower = true;
      }
    });
  });
  return myMenusList;
}
var myMenus = {
  myMenusList: function (userInfo) {
    return getMyMenus(userInfo);
  }
};

module.exports = myMenus;
