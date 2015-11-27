var alt = require('../alt');
var EGRActions = require('../actions/EGRActions');

class EGRStore {
  constructor() {
    this.loginInfo = {
      login: "Login",
      pass: "Password"
    };

    this.bindListeners({
      handleUpdateLoginInfo: EGRActions.UPDATE_LOGIN
    });
  }

  handleUpdateLoginInfo(loginInfo) {
     if(loginInfo.hasOwnProperty('Pass'))
     {
       this.loginInfo.pass = loginInfo.Pass
     }
     else{
       this.loginInfo.login = loginInfo.Login
     }
  }
}

module.exports = alt.createStore(EGRStore, 'EGRStore');
