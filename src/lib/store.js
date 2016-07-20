export default {
    fetch (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    save (key,store) {
        localStorage.setItem(key, JSON.stringify(store));
    },
    setToken (store) {
      this.save("nami_token",store);
    },
    getToken () {
       return this.fetch("nami_token");
    }
};
