import {DyalnaIdentityHttpInterceptor} from './config/interceptor';
import {DyalnaStateChangeConfig} from './config/state-change';
import {DyalnaIdentityConfigProvider} from './service/config';
import {DyalnaIdentity} from './service/authentication';
import {DyalnaIdentityReferrer} from './service/referrer';
import {DyalnaIdentityRepository} from './service/repository';
import {DyalnaIdentityLoginFormDirective, DyalnaIdentityLoginTemplate} from './directive/login';
import {DyalnaIdentityRegisterFormDirective, DyalnaIdentityRegisterTemplate} from './directive/register';
import {DyalnaIdentityConfirmDirective, DyalnaIdentityConfirmTemplate} from './directive/confirm';
export var DyalnaIdentityModule = 'dyalna.identity';
angular
  .module(DyalnaIdentityModule, ['ui.router', 'ngCookies'])
  .config(DyalnaIdentityHttpInterceptor)
  .run(DyalnaStateChangeConfig)
  .run(DyalnaIdentityLoginTemplate)
  .run(DyalnaIdentityRegisterTemplate)
  .run(DyalnaIdentityConfirmTemplate)
  .provider('DyalnaIdentityConfig', DyalnaIdentityConfigProvider)
  .service('DyalnaIdentity', DyalnaIdentity)
  .service('DyalnaIdentityReferrer', DyalnaIdentityReferrer)
  .service('DyalnaIdentityRepository', DyalnaIdentityRepository)
  .directive('dyalnaIdentityLoginForm', DyalnaIdentityLoginFormDirective)
  .directive('dyalnaIdentityRegisterForm', DyalnaIdentityRegisterFormDirective)
  .directive('dyalnaIdentityConfirm', DyalnaIdentityConfirmDirective)
;
