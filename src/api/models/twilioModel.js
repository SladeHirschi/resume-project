exports.sendSMS = (message)  => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_NUMBER;
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
        .create({
            to: '+14352181442',
            from: fromNumber,
            body: message
        })
        .then(message => console.log(message.sid))
        .done();

    return {success: true, message: ''};
}