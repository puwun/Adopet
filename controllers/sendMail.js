const nodemailer = require('nodemailer');
async function sendFeedbackMail(username,email,subject,feedback)
{
   let receiverMail = email; 
   //write formalities for submission of feedback like your username has submiites this feedback
   let text = username+" "+subject+" "+feedback;
   let transporter = await nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure: true,
        auth:{
            user: process.env.EMAIL_USER, //use maddercode ka acoount
            pass: process.env.EMAIL_PASSWORD,
        },
   });
   
   let info = await transporter.sendMail({
    from:'"MadderCode" <maddercode69@gmail.com>', 
    to : receiverMail,
    subject:"Feedback Submission mail",
    text:text,
   });
};

async function sendOwnerMail(username,email,subject,feedback)
{
   let receiverMail = email; 
   //write formalities for submission of feedback like your username has submiites this feedback
   let text = username+" "+subject+" "+feedback;
   let transporter = await nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure: true,
        auth:{
            user: process.env.EMAIL_USER, //use maddercode ka acoount
            pass: process.env.EMAIL_PASSWORD,
        },
   });
   
   let info = await transporter.sendMail({
    from:'"MadderCode" <maddercode69@gmail.com>',
    to : receiverMail,
    subject:"Feedback Submission mail",
    text:text,
   });
};

async function sendAdopterMail(username,email,pet,ownerName, ownerEmail,ownerPhone)
{
   let receiverMail = email; 
   //write formalities for submission of feedback like your username has submiites this feedback
   let text = username+" "+ownerName+" "+ownerPhone+" "+ownerEmail+" "+pet;
   let transporter = await nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure: true,
        auth:{
            user: process.env.EMAIL_USER, //use maddercode ka acoount
            pass: process.env.EMAIL_PASSWORD,
        },
   });
   
   let info = await transporter.sendMail({
    from:'"MadderCode" <maddercode69@gmail.com>',
    to : receiverMail,
    subject:"Adoption Submission mail",
    text:text,
   });
};

module.exports = {sendFeedbackMail,sendOwnerMail,sendAdopterMail};  