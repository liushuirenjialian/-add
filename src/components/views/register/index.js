require('./style.scss');
module.exports = {
    template: require('./template.html'),
    replace: true,
    data: function() {
        return {
            account: '',
            email: '',
            password: ''
        };
    },
    components: {
        // require 的是alert下的index.js
        alert: require('../../common/alerts')
    },
    methods: {
        reg: function() {
            var url = '';
            var info = {};
            info.userName = this.account;
            info.email = this.email;
            info.password = this.password;
            var _this = this;
           // judge the value of user
        },
      
    }
};
