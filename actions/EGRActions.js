var alt = require('../alt');

class EGRActions {
  updateLogin(loginInfo) {
    this.dispatch(loginInfo);
  }
}

module.exports = alt.createActions(EGRActions);
