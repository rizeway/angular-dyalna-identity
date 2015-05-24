class DyalnaIdentityLostPasswordController {
  /* @ngInject */
  constructor(DyalnaIdentityRepository) {
    this.error = false;
    this.success = false;
    this.DyalnaIdentityRepository = DyalnaIdentityRepository;
  }

  submit() {
     this.DyalnaIdentityRepository.lostPassword(this.email).then(() => {
       this.success= true;
     }, () => {
       this.error = true;
     })
  }
}

export /* @ngInject */ function DyalnaIdentityLostPasswordDirective() {
  return {
    restrict: 'E',
    scope: true,
    controller: DyalnaIdentityLostPasswordController,
    controllerAs: 'ctrl',
    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'dyalna-identity/lost-password.html';
    }
  };
}

export /* @ngInject */ function DyalnaIdentityLostPasswordTemplate($templateCache) {
  $templateCache.put('dyalna-identity/lost-password.html',
    '<form ng-hide="ctrl.success" class="lost-password-form" ng-submit="ctrl.submit()">' +
        '<p>Provide your email address to recover your password :</p>' +
        '<div class="alert alert-error" ng-show="ctrl.error">' +
            'This email is invalid.' +
        '</div>' +
        '<input type="email" placeholder="Email" ng-model="ctrl.email" />' +
        '<input type="submit" value="Recover" />' +
    '</form>' +
    '<div class="alert alert-success" ng-show="ctrl.success">' +
        'Check your inbox now. An email has been sent with the instructions to recover your password.' +
    '</div>'
  );
}
