export class DyalnaIdentityReferrer {
  /* @ngInject */
  constructor() {
    this.referer = false;
  }

  has() {
    return this.referer !== false;
  }

  reset() {
    this.referer = false;
  }

  set(referer) {
    this.referer = referer;
  }

  get() {
    return this.referer;
  }
}
