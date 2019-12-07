require('dotenv').config();

const twilio = require('twilio')(
    process.env.accountSid,
    process.env.authToken
  );
  const body = 'This is a test!';
  const numbers = [process.env.MY_NUMBER, process.env.OTHER_NUMBER];
  
  const service = twilio.notify.services(process.env.serviceSid);
  
  const bindings = numbers.map(number => {
    return JSON.stringify({ binding_type: 'sms', address: number });
  });
  
  notification = service.notifications
    .create({
      toBinding: bindings,
      body: body
    })
    .then(() => {
      console.log(notification);
    })
    .catch(err => {
      console.error(err);
    });