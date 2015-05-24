import {DyalnaIdentityHttpInterceptor} from './config/interceptor';
import {DyalnaStateChangeConfig} from './config/state-change';
import {DyalnaIdentityConfigProvider} from './service/config';
import {DyalnaIdentity} from './service/authentication';
import {DyalnaIdentityReferrer} from './service/referrer';
import {DyalnaIdentityRepository} from './service/repository';
import {DyalnaIdentityLoginFormDirective, DyalnaIdentityLoginTemplate} from './directive/login';
import {DyalnaIdentityRegisterFormDirective, DyalnaIdentityRegisterTemplate} from './directive/register';
import {DyalnaIdentityConfirmDirective, DyalnaIdentityConfirmTemplate} from './directive/confirm';
import {DyalnaIdentityLostPasswordDirective, DyalnaIdentityLostPasswordTemplate} from './directive/lost-password';
import {DyalnaIdentityRegeneratePasswordDirective, DyalnaIdentityRegeneratePasswordTemplate} from './directive/regenerate-password';
import {DyalnaIdentityChangePasswordDirective, DyalnaIdentityChangePasswordTemplate} from './directive/change-password';
export var DyalnaIdentityModule = 'dyalna.identity';
angular
  .module(DyalnaIdentityModule, ['ui.router', 'ngCookies'])
  .config(DyalnaIdentityHttpInterceptor)
  .run(DyalnaStateChangeConfig)
  .run(DyalnaIdentityLoginTemplate)
  .run(DyalnaIdentityRegisterTemplate)
  .run(DyalnaIdentityConfirmTemplate)
  .run(DyalnaIdentityLostPasswordTemplate)
  .run(DyalnaIdentityRegeneratePasswordTemplate)
  .run(DyalnaIdentityChangePasswordTemplate)
  .provider('DyalnaIdentityConfig', DyalnaIdentityConfigProvider)
  .service('DyalnaIdentity', DyalnaIdentity)
  .service('DyalnaIdentityReferrer', DyalnaIdentityReferrer)
  .service('DyalnaIdentityRepository', DyalnaIdentityRepository)
  .directive('dyalnaIdentityLoginForm', DyalnaIdentityLoginFormDirective)
  .directive('dyalnaIdentityRegisterForm', DyalnaIdentityRegisterFormDirective)
  .directive('dyalnaIdentityConfirm', DyalnaIdentityConfirmDirective)
  .directive('dyalnaIdentityLostPassword', DyalnaIdentityLostPasswordDirective)
  .directive('dyalnaIdentityRegeneratePassword', DyalnaIdentityRegeneratePasswordDirective)
  .directive('dyalnaIdentityChangePassword', DyalnaIdentityChangePasswordDirective)
;
