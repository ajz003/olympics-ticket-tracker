// Download the Node helper library from www.twilio.com/docs/libraries/node#installation
// These identifiers are your accountSid and authToken from
// https://www.twilio.com/console
require('dotenv').config();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

const notificationOpts = {
  toBinding: JSON.stringify({
    binding_type: 'sms',
    address: process.env.MY_NUMBER,
  }),
  body: 'Knock-Knock! This is your first Notify SMS',
};

client.notify
  .services(process.env.serviceSid)
  .notifications.create(notificationOpts)
  .then(notification => console.log(notification.sid))
  .catch(error => console.log(error));