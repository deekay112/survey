const express = require('express')
const cors = require('cors');
var path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const config = {
//     mailserver: {
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         secure: false,
//         auth: {
//           user: "2f7aac09bfecda",
//           pass: "2c5300cada6e1f"
//         }
//     },
//     mail: {
//       from: 'mailer@mailtrap.io',
//       to: 'fa0360458f-e1d01b@inbox.mailtrap.io',
//       subject: 'The Survery App',
//       html: '<!DOCTYPE html><html> <head> <title>New Lead</title> </head> <body> <img alt="Lexxi Logo" src="http://localhost:5000/lexxi.png" width="150" height="70"><br><h4>This is a test html message</h4> </body></html>'
//     }
//   };


const config = {
    mailserver: {
        host: "mail.supremecluster.com",
        port: 465,
        secure: true,
        auth: {
          user: "survey@lexxicharm.com",
          pass: "3T7DVq9mmz"
        }
    },
    mail: {
      from: 'survey@lexxicharm.com',
      to: 'lexxicharmllc@gmail.com',
      subject: 'The Survery App',
      html: '<!DOCTYPE html><html> <head> <title>New Lead</title> </head> <body> <img alt="Lexxi Logo" src="http://localhost:5000/lexxi.png" width="150" height="70"><br><h4>This is a test html message</h4> </body></html>'
    }
  };

const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver);

    // send mail using transporter
    let info = await transporter.sendMail(mail);
};


app.get('/', (req, res) => {
    // config.mail.html = '<!DOCTYPE html><html> <head> <title>New Lead</title> </head> <body> <img alt="Lexxi Logo" src="http://localhost:5000/lexxi.png" width="150" height="70"><br><h4>This is a the modified version... Whoops!</h4><p>`Name: ${req.body.data.name}`</p><p>`Email: ${req.body.data.email}`</p><p>`Phone: ${req.body.data.phone}`</p> </body></html>';
    // sendMail(config).catch(console.error);
    // console.log(req.connection.remoteAddress);
    res.send('Get Success!')
   
}); 

app.post('/', function (req, res) {
    let name = req.body.data.name;
    let email = req.body.data.email;
    let phone = req.body.data.phone;

    var loseweight;
    if(req.body.data.loseweight === 'Y'){
        loseweight = 'Yes';
    } else if (req.body.data.loseweight === 'N') {
        loseweight = 'No';
    } else {
        loseweight = 'Not Appplicable';
    }

    var struggle;
    if(req.body.data.struggle === 'MNT'){
        struggle = '1 - 11 months';
    } else if (req.body.data.struggle === 'YRS') {
        struggle = '1 - 10 years';
    }  else if (req.body.data.struggle === 'AML') {
        struggle = 'All my life';
    } else {
        struggle = 'Not Appplicable';
    }

    var eat;
    if(req.body.data.eat === 'Y'){
        eat = 'Yes';
    } else if (req.body.data.eat === 'N') {
        eat = 'No';
    } else {
        eat = 'Not Appplicable';
    }

    var water;
    if(req.body.data.water === 'L'){
        water = 'Less than 3 bottles/day';
    } else if (req.body.data.water === 'M') {
        water = 'More than 3 bottles/day';
    } else {
        water = 'Not Appplicable';
    }

    var meal;
    if(req.body.data.meal === 'Y'){
        meal = 'Yes';
    } else if (req.body.data.meal === 'Y') {
        meal = 'No';
    } else {
        meal = 'Not Appplicable';
    }
    

    config.mail.html = `<!DOCTYPE html><html> <head> <title>New Lead</title> </head> <body> <img alt="Lexxi Logo" src="http://localhost:5000/lexxi.png" width="150" height="70"><br><h4>This is a the modified version... Whoops!</h4><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p> <p>Do you want to lose weight? ${loseweight}</p><p>How long have you struggled with your weight? ${struggle}</p><p>Do you eat healthy? ${eat}</p><p>What is your water intake? (measured by 16oz bottle) ${water}</p><p>Do you need help with meal planning? ${meal}</p></body></html>`;
    console.log(req.body.data);
    sendMail(config).catch(console.error);
    res.send('Post Success!')
});

app.listen(port, () => {
    console.log(`App is Listening!`);
});