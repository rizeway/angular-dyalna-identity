export /* @ngInject */ function DyalnaIdentityHttpInterceptor($httpProvider) {
    // alternatively, register the interceptor via an anonymous factory
    $httpProvider.interceptors.push(/* @ngInject */ function($cookies, DyalnaIdentityConfig) {
      return {
        request: function(config) {
          var token = $cookies.get(DyalnaIdentityConfig.tokenName);
          if (token) {
            if (!config.headers) {
              config.headers = {};
            }
            config.headers[DyalnaIdentityConfig.tokenName] = token;
          }

          return config;
        }
      };
  });
}

