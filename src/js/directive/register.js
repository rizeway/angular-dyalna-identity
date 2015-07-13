class DyalnaIdentityRegisterController {
  /* @ngInject */
  constructor(DyalnaIdentityRepository) {
    this.DyalnaIdentityRepository = DyalnaIdentityRepository;
    this.user = {};
    this.passwordCheck = null;
  }

  register() {
    if (this.loading) {
      return;
    }

    if (this.passwordCheck !== this.user.password) {
      this.error = true;
      return;
    }

    this.error = false;
    this.loading = true;
    this.DyalnaIdentityRepository.register(this.user).then(() => {
      this.loading = false;
      this.error   = false;
      this.success = true;
    }, () => {
      this.error = true;
      this.loading = false;
    });
  }
}

export /* @ngInject */ function DyalnaIdentityRegisterFormDirective() {
  return {
    restrict: 'E',
    scope: true,
    controller: DyalnaIdentityRegisterController,
    controllerAs: 'ctrl',
    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'dyalna-identity/register.html';
    }
  };
}

export /* @ngInject */ function DyalnaIdentityRegisterTemplate($templateCache) {
  $templateCache.put('dyalna-identity/register.html',
      '<div ng-if="ctrl.error" class="alert alert-danger">' +
          'An error occured while registering. Check your informations' +
      '</div>' +
      '<div ng-if="ctrl.success" class="alert alert-success">' +
          'You have beed registered successfully. You will receive an email with instructions to activate your account. Welcome between us.' +
      '</div>' +
      '<div>' +
          '<form ng-show="!ctrl.success" ng-submit="ctrl.register()">' +
              '<div class="input-icon">' +
                  '<div class="add-on"><i class="fa fa-user"></i></div>' +
                  '<div class="input-container">' +
                      '<input type="text" placeholder="Username" data-ng-model="ctrl.user.username" />' +
                  '</div>' +
              '</div>' +
              '<div class="input-icon">' +
                  '<div class="add-on"><i class="fa fa-lock"></i></div>' +
                  '<div class="input-container">' +
                      '<input type="password" placeholder="Password" data-ng-model="ctrl.user.password" />' +
                  '</div>' +
              '</div>' +
              '<div class="input-icon">' +
                  '<div class="add-on"><i class="fa fa-lock"></i></div>' +
                  '<div class="input-container">' +
                      '<input type="password" placeholder="Repeat the password" data-ng-model="ctrl.passwordCheck" />' +
                  '</div>' +
              '</div>' +
              '<div class="input-icon">' +
                  '<div class="add-on"><i class="fa fa-envelope"></i></div>' +
                  '<div class="input-container">' +
                      '<input type="email" placeholder="Email" data-ng-model="ctrl.user.email" />' +
                  '</div>' +
              '</div>' +
              '<p class="text-muted text-small">By submitting the form, you accept <a href="javascript:;">the terms of use.</a>.</p>' +
              '<div class="divider"></div>' +
              '<button type="submit" class="btn btn-primary btn-block btn-lg" ng-class="{disabled: ctrl.loading}">' +
                  'Register' +
                  '<i ng-if="ctrl.loading" class="fa fa-spinner spin"></i>' +
              '</button>' +
          '</form>' +
      '</div>'
  );
}
