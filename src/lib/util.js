/* global ac_util ac_ ac_cookies */

module.exports = {
  startLoading: function () {
    // document.querySelector('.loading').style.display = 'block';
  },
  stopLoading: function () {
    // document.querySelector('.loading').style.display = 'none';
  },
  formatDate: function (date, fmt) {
    function pad(value) {
      return (value.toString().length < 2) ? '0' + value : value;
    }
    function getWeekNumber(value) {
      var dateValue = new Date(value);
      dateValue.setHours(0, 0, 0);
      dateValue.setDate(dateValue.getDate() + 4 - (dateValue.getDay() || 1));
      return Math.ceil((((dateValue - new Date(dateValue.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    }
    return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
      switch (fmtCode) {
        case 'Y':
          return date.getFullYear();
        case 'M':
          return pad(date.getMonth() + 1);
        case 'W':
          return getWeekNumber(date);
        case 'd':
          return pad(date.getDate());
        case 'H':
          return pad(date.getHours());
        case 'm':
          return pad(date.getMinutes());
        case 's':
          return pad(date.getSeconds());
        default:
          throw new Error('Unsupported format code: ' + fmtCode);
      }
    });
  },
  countChinese: function (str) {
    var m = str.match(/[\u4e00-\u9fff\uf900-\ufaff]/g);
    return (!m ? 0 : m.length);
  },
  handleError: function (text) {
    throw new Error(text);
  },
  hasClass: function (el, className) {
    var result = false;
    if (el.classList) {
      result = el.classList.contains(className);
    } else {
      result = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
    return result;
  },
  toggleClass: function (el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);
      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }
      el.className = classes.join(' ');
    }
  },
  addClass: function (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },
  removeClass: function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
};
