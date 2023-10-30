window.passport = new window.immutable.passport.Passport({
    baseConfig: new window.immutable.config.ImmutableConfiguration({
      environment: window.immutable.config.Environment.SANDBOX,
    }),
    clientId: '3yH4O0SJZZZY7mKrigqw73MncdWtuOsa',
    redirectUri: 'https://immutable-spaceinvaders.netlify.app/',
    logoutRedirectUri: 'https://immutable-spaceinvaders.netlify.app/logout',
    audience: 'platform_api',
    scope: 'openid offline_access email transact'
  });


  