export class DyalnaIdentityRepository {
  /* @ngInject */
  constructor($http, DyalnaIdentityConfig) {
    this.$http = $http;
    this.DyalnaIdentityConfig = DyalnaIdentityConfig;
  }

  register(user) {
    return this.$http.post(this.DyalnaIdentityConfig.host + '/register?domain=' + this.DyalnaIdentityConfig.domain, user).then((response) => response.data.data);
  }

  confirm(token) {
    return this.$http.get(this.DyalnaIdentityConfig.host + '/activate?token=' + token);
  }

  lostPassword(email) {
    return this.$http.put(this.DyalnaIdentityConfig.host + '/lostPassword?email=' + email + '&domain=' + this.DyalnaIdentityConfig.domain);
  }

  regeneratePassword(token) {
    return this.$http.put(this.DyalnaIdentityConfig.host + '/regeneratePassword?token=' + token);
  }

  changePassword(password) {
    return this.$http.put(this.DyalnaIdentityConfig.host + '/changePassword', {
      password: password
    });
  }
}
