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
  getToken: function () {
    return this.fetch('nami_token');
  }
};
