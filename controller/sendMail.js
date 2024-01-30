const nodemailer = require('nodemailer');
async function sendMail(username,email,subject,feedback)
{
   let receiverMail = email; 
   //write formalities for submission of feedback like your username has submiites this feedback
   let text = username+" "+subject+" "+feedback;
   let transporter = await nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure: true,
        auth:{
            user: 'maddercode69@gmail.com', //use maddercode ka acoount
            pass: 'bxfeelaiqxnlqeqw',
        },
   });
   
   let info = await transporter.sendMail({
    from:'"MadderCode" <maddercode69@gmail.com>',
    to : receiverMail,
    subject:"Feedback Submission mail",
    text:text,
   });
};

module.exports = sendMail;  