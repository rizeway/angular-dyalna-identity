class DyalnaIdentityConfirmController {
  /* @ngInject */
  constructor($scope, DyalnaIdentityRepository) {
    this.loading = true;
    DyalnaIdentityRepository.confirm($scope.token).then(() => {
        this.confirmed = true;
        this.loading = false;
    }, () => {
        this.confirmed = false;
        this.loading = false;
    });
  }
}

export /* @ngInject */ function DyalnaIdentityConfirmDirective() {
  return {
    restrict: 'E',
    scope: {
      token: '=token'
    },
    controller: DyalnaIdentityConfirmController,
    controllerAs: 'ctrl',
    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'dyalna-identity/confirm.html';
    }
  };
}

export /* @ngInject */ function DyalnaIdentityConfirmTemplate($templateCache) {
  $templateCache.put('dyalna-identity/confirm.html',
    '<div ng-if="ctrl.loading" class="bs-callout bs-callout-info">' +
          '<i ng-if="ctrl.loading" class="glyphicon glyphicon-refresh spin"></i>' +
          'Confirmation in progress...' +
      '</div>' +
      '<div ng-if="!ctrl.loading && !ctrl.confirmed" class="alert alert-danger">Your account could not be activated.</div>' +
      '<div ng-if="!ctrl.loading && ctrl.confirmed" class="alert alert-success">Your account has been activated, you can now sign in.</div>'
  );
}
