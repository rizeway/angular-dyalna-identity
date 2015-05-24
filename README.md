Dyalna Identity
===============

A client to the [Dyalna Identity Server](https://github.com/rizeway/dyalna-identity)


Install & configure
-------------------

1- Install the dependency

    bower install angular-dyalna-identity

2- Import and configure the angular module

    import {DyalnaIdentityModule} from './bower_components/angular-dyalna-identity/src/js/module';
    angular
      .module('mymodule', [DyalnaIdentityModule])
      .config(function (DyalnaIdentityConfigProvider) {
        DyalnaIdentityConfigProvider.setConfig({
          host: '/identity', // Dyalna Identity Host (Proxy required, CORS not authorized)
          loginUrl: '/login',
          logoutUrl: '/logout',
          loggedinUrl: '/me',

          unauthorizedState: 'app.unauthorized', // A state you have to create for unauthorized states
          targetState: 'app.list', // Default login target state
          loginState: 'app.login', // A state containing the login form
          tokenName: 'x-dyalna-identity-token' // The header shared in your http requests your server (same as the server)
        });
      });

3- Include the login directive in your login state template (the template attribute is optional)

    <dyalna-identity-login-form template-url="core/user/login-form.html"></dyalna-identity-login-form>

4- Include the register directive in your register state template

    <dyalna-identity-register-form template-url="core/user/register-form.html"></dyalna-identity-register-form>

5- Include the confirm directive in the state called on account activation links (see server configuration params for this url)

    <dyalna-identity-confirm token="ctrl.token" template-url="core/user/confirm.html"></dyalna-identity-confirm>

6- Other available directives

 - Password Lost Directive (email form)
 - Password regeneration Directive

Details
-------

 * The library offers a service called DyalnaIdentity to get the loggedin user and has some utilities
 * The library also triggers events on Login and Logout
