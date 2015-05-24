class DyalnaIdentityRegeneratePasswordController {
  /* @ngInject */
  constructor($scope, DyalnaIdentityRepository) {
    this.loading = true;
    DyalnaIdentityRepository.regeneratePassword($scope.token).then(() => {
        this.confirmed = true;
        this.loading = false;
    }, () => {
        this.confirmed = false;
        this.loading = false;
    });
  }
}

export /* @ngInject */ function DyalnaIdentityRegeneratePasswordDirective() {
  return {
    restrict: 'E',
    scope: {
      token: '=token'
    },
    controller: DyalnaIdentityRegeneratePasswordController,
    controllerAs: 'ctrl',
    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'dyalna-identity/regenerate-password.html';
    }
  };
}

export /* @ngInject */ function DyalnaIdentityRegeneratePasswordTemplate($templateCache) {
  $templateCache.put('dyalna-identity/regenerate-password.html',
    '<div ng-if="ctrl.loading" class="bs-callout bs-callout-info">' +
          '<i ng-if="ctrl.loading" class="glyphicon glyphicon-refresh spin"></i>' +
          'Password regeneration in progress...' +
      '</div>' +
      '<div ng-if="!ctrl.loading && !ctrl.confirmed" class="alert alert-danger">Your password could not be updated.</div>' +
      '<div ng-if="!ctrl.loading && ctrl.confirmed" class="alert alert-success">Your password has been update, you can now sign in.</div>'
  );
}
