/* @ngInject */
export function DyalnaStateChangeConfig($rootScope, $state, DyalnaIdentity, DyalnaIdentityConfig, DyalnaIdentityReferrer) {
  $rootScope.$on('$stateChangeStart', (event, nextState, nextParams) => {
    var security = nextState.security === undefined || nextState.security;
    if (!DyalnaIdentity.authorize(security)) {
      event.preventDefault();
      if (DyalnaIdentity.isLoggedIn()) {
        $state.transitionTo(DyalnaIdentityConfig.unauthorizedState);
      } else {
        DyalnaIdentityReferrer.set({ state: nextState.name, params: nextParams });
        $state.transitionTo(DyalnaIdentityConfig.loginState);
      }
    }
  });
}
