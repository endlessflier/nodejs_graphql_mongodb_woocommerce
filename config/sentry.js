
    const Sentry = require("@sentry/node");
    const Tracing = require("@sentry/tracing");
    Sentry.init({
      dsn: process.env.SENTRY_URL,
      tracesSampleRate: 1.0,
    });
    
    export default Sentry