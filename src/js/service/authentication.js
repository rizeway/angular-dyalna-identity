export class DyalnaIdentity {
  /* @ngInject */
  constructor($q, $http, $rootScope, $cookies, DyalnaIdentityConfig) {
    this.user = null;
    this.lastUser = null;

    this.$q = $q;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;
    this.DyalnaIdentityConfig = DyalnaIdentityConfig;
  }

  isLoggedIn() {
    return this.user !== null;
  }

  authorize(role) {
    return !role || (
      this.user !== null &&
        (role === true || this.user.roles.indexOf(role) !== -1)
      );
  }

  login(username, password) {
    return this.$http.post(this.DyalnaIdentityConfig.host + this.DyalnaIdentityConfig.loginUrl, {
        username: username,
        password: password
      }).then(response => {
        this.$cookies.put(this.DyalnaIdentityConfig.tokenName, response.data.token);
        return this.check();
      });
  }

  logout() {
    return this.$http.get(this.DyalnaIdentityConfig.host + this.DyalnaIdentityConfig.logoutUrl).then(() => {
      this.$cookies.remove(this.DyalnaIdentityConfig.tokenName);
      this.user = null;
      this.$rootScope.$broadcast('DyalnaIdentity.logout');
      return 'ok';
    });
  }

  check() {
    var defer = this.$q.defer();
    this.$http.get(this.DyalnaIdentityConfig.host + this.DyalnaIdentityConfig.loggedinUrl).then(response => {
      var previous = this.user;
      this.user = response.data;
      this.lastUser = response.data;
      if (!angular.equals(previous, this.user)) {
        this.$rootScope.$broadcast('DyalnaIdentity.login', this.user);
      }

      defer.resolve(this.user);
    }, () => {
      if (this.user !== null) {
          this.$cookies.remove(this.DyalnaIdentityConfig.tokenName);
          this.$rootScope.$broadcast('DyalnaIdentity.logout');
      }
      this.user = null;
      defer.reject();
    });

    return defer.promise;
  }
}

