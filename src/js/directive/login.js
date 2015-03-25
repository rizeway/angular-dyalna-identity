/* @ngInject */
class DyalnaIdentityLoginController {
  constructor($scope, $state, DyalnaIdentity, DyalnaIdentityConfig, DyalnaIdentityReferrer) {
    this.error    = false;
    this.ready  = false;

    this.$state = $state;
    this.DyalnaIdentityReferrer = DyalnaIdentityReferrer;
    this.DyalnaIdentityConfig = DyalnaIdentityConfig;
    this.DyalnaIdentity = DyalnaIdentity;

    // Check Login
    DyalnaIdentity.check().then(() => this.redirect(), () => {
      this.ready = true;
    });
  }

  redirect() {
    if (this.DyalnaIdentityReferrer.has()) {
      var referer = this.DyalnaIdentityReferrer.get();
      this.DyalnaIdentityReferrer.reset();
      this.$state.transitionTo(referer.state, referer.params);
    } else {
      this.$state.transitionTo(this.DyalnaIdentityConfig.targetState);
    }
  }

  submit() {
    if (!this.loading) {
      this.loading  = true;
      this.DyalnaIdentity.login(this.username, this.password).then(() => {
        this.loading  = false;
        this.redirect();
      }, () => {
        this.loading  = false;
        this.error = true;
      });
    }
  }
}

export function DyalnaIdentityLoginFormDirective() {
  return {
    restrict: 'E',
    scope: true,
    controller: DyalnaIdentityLoginController,
    controllerAs: 'ctrl',
    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'dyalna-identity/login.html';
    }
  };
}

/* @ngInject */
export function DyalnaIdentityLoginTemplate($templateCache) {
  $templateCache.put('dyalna-identity/login.html',
    '<form class="login-form" ng-show="ctrl.ready"ng-submit="ctrl.submit()">' +
        '<div class="alert alert-error" ng-show="ctrl.error">' +
            'Check your username or password' +
            '<button class="close" ng-click="ctrl.error = false">&times;</button>' +
        '</div>' +
        '<input type="text" placeholder="Username" ng-model="ctrl.username" />' +
        '<input type="password" placeholder="Password" ng-model="ctrl.password" />' +
        '<input type="submit" value="Login" />'+
    '</form>'
  );
}
