/* @ngInject */
export class DyalnaIdentityConfigProvider {
  constructor() {
    this.config = {
      host: '/identity',
      loginUrl: '/login',
      logoutUrl: '/logout',
      loggedinUrl: '/me',

      unauthorizedState: 'unauthorized',
      targetState: 'home',
      loginState: 'login',
      lostPasswordState: 'lost-password',
      tokenName: 'authtoken'
    };
  }

  setConfig(configuration) {
    this.config = configuration;
  }

  $get() {
    return {
      host: this.config.host,
      loginUrl: this.config.loginUrl,
      logoutUrl: this.config.logoutUrl,
      loggedinUrl: this.config.loggedinUrl,

      targetState: this.config.targetState,
      loginState: this.config.loginState,
      unauthorizedState: this.config.unauthorizedState,
      lostPasswordState: this.config.lostPasswordState,
      tokenName: this.config.tokenName,
    };
  }
}
