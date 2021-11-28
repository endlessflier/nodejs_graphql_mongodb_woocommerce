const sgMailProvider = require("@sendgrid/mail");
sgMailProvider.setApiKey(process.env.SENDGRID_KEY);
export default sgMailProvider;
