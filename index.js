const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sgMail = require("@sendgrid/mail");

require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const START_DAY = 26;

const msg = n => {
  return {
    to: "brandonwkleiman@gmail.com",
    from: "brandonwkleiman@gmail.com",
    subject: `Day ${n}`,
    text: `${2*n-1}-${2*n}`,
    html: `<p>${2*n-1}-${2*n}</p>`,
  };
};

app.get('/', (req, res) => {
    sgMail
      .send(msg(getDayOfTheYear()))
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
})

app.listen(port, () => {
    console.log('listening on port 3000');
    getDayOfTheYear()
});

function getDayOfTheYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day - START_DAY;
}
