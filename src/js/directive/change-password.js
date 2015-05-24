class DyalnaIdentityChangePasswordController {
  /* @ngInject */
  constructor(DyalnaIdentityRepository) {
    this.DyalnaIdentityRepository = DyalnaIdentityRepository;
    this.password1 = '';
    this.password2 = '';
    this.notSame = false;
    this.loading = false;
    this.error = false;
    this.confirmed = false;
  }

  submit() {
    this.notSame = false;
    this.loading = true;
    this.confirmed = false;
    if (this.password1 !== this.password2) {
      this.notSame = true;
        this.loading = false;
      return;
    }
    this.DyalnaIdentityRepository.changePassword(this.password1).then(() => {
        this.confirmed = true;
        this.loading = false;
    }, () => {
        this.error = true;
        this.confirmed = false;
        this.loading = false;
    });
  }
}

export /* @ngInject */ function DyalnaIdentityChangePasswordDirective() {
  return {
    restrict: 'E',
    scope: true,
    controller: DyalnaIdentityChangePasswordController,
    controllerAs: 'ctrl',
    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'dyalna-identity/change-password.html';
    }
  };
}

export /* @ngInject */ function DyalnaIdentityChangePasswordTemplate($templateCache) {
  $templateCache.put('dyalna-identity/change-password.html',
      '<div ng-if="ctrl.loading" class="bs-callout bs-callout-info">' +
          '<i class="glyphicon glyphicon-refresh spin"></i>' +
          'Password change in progress...' +
      '</div>' +
      '<div ng-if="ctrl.error" class="bs-callout bs-callout-danger">' +
          'An error occured while changing your password.' +
      '</div>' +
      '<div ng-if="ctrl.notSame" class="bs-callout bs-callout-danger">' +
          'Your two passwords does not match.' +
      '</div>' +
      '<div ng-if="ctrl.confirmed" class="bs-callout bs-callout-success">' +
          'Your password has been changed.' +
      '</div>' +
      '<form class="change-password-form" ng-show="!ctrl.confirmed && !ctrl.loading" ng-submit="ctrl.submit()">' +
          '<input type="password" placeholder="Password" ng-model="ctrl.password1" />' +
          '<input type="password" placeholder="Repeat your password" ng-model="ctrl.password2" />' +
          '<input type="submit" value="Submit" />' +
       '</form>'
  );
}
