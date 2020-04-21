// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("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");
// const msg = {
//   to: 'doanhtu07@gmail.com',
//   from: 'no-reply@minecommand.us',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err.response.body);
// });

//My verification flow:
//- Create VerificationToken
//- Send Email to verify
//- If verify -> create new user
//- If not -> don't create new user, the token eventually expires.

const { PrismaClient } = require('@prisma/client')
    , LocalStrategy = require('passport-local').Strategy;
const prisma = new PrismaClient();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require('fs');

const signupStrategy = new LocalStrategy({
        usernameField: 'email',
    },
    (email, password, done) => {
        prisma.user.findOne({
            where: {
                email 
            }
        })
        .then(user => {
            if (user) {
                done(null, { message: "User with this email already exists." }); 
                return [null, null];
            }
            const file = new Promise((resolve, reject) => {
                console.log(process.cwd());
                fs.readFile('./emailVerification/form.html', 'utf8', (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                })
            });

            let date = new Date();
            date = (date.getMonth()+1) + '/' + (date.getDate()+1) + '/' + date.getFullYear();
            const verificationToken = new Promise((resolve, reject) => {
                prisma.userVerification.create({
                    data: {
                        email,
                        password,
                        expiredAt: date
                    }
                })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
            });

            return Promise.all([file, verificationToken]);
        })
        .then(([file, verificationToken]) => {
            if(!file && !verificationToken)
                return null;
            
            //file is a string of the html file, we replace substring {{ formAction }}
            //by the string 'something else'...
            file = file.replace("{{ formAction }}", `${process.env.HOST}/verification/${verificationToken.id}`);
            const msg = {
                to: email,
                from: 'customerservice@minecommand.us',
                subject: 'Email Verification',
                //text: 'and easy to do anywhere, even with Node.js',
                html: file,
            };

            return sgMail.send(msg);

        })
        .then(emailVerification => {
            if(emailVerification)
                done(null, { message: "Verification has been sent to your email. Waiting for Email Verification..." });
            return null;
        })
        .catch(err => {
            console.log(err);
            return done(err);
        })
    }
);

module.exports = signupStrategy;