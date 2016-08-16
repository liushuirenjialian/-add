module.exports = {
  fetch: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },
  save: function (key, store) {
    localStorage.setItem(key, JSON.stringify(store));
  },
  setToken: function (store) {
    this.save('nami_token', store);
  },
  hasValidToken: function () {
    var token = this.fetch('nami_token');
    return token && token.expires_at && token.expires_at > new Date().getTime();
  },
  checkToken: function () {
    if (!this.hasValidToken()) {
      this.setUserInfo(null);
      this.setToken(null);
      return false;
    }
    return true;
  },
  getToken: function () {
    if (!this.checkToken()) {
      return null;
    }
    return this.fetch('nami_token');
  },
  getUserInfo: function () {
    if (!this.checkToken()) {
      return null;
    }
    return this.fetch('nami_userinfo');
  },
  setUserInfo: function (userInfo) {
    this.save('nami_userinfo', userInfo);
  },
  logout: function () {
    this.setUserInfo(null);
    this.setToken(null);
  }
};
