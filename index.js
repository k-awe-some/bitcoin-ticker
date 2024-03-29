const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// app.post("/", (req, res) => {
//   const { crypto, fiat } = req.body;
//   request(
//     `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`,
//     (error, response, body) => {
//       const data = JSON.parse(body);
//       const last = data.last;
//       const currentDate = data.display_timestamp;
//
//       res.write(`<h1>Current date is ${currentDate}</h1>`);
//       res.write(`<h1>Current ${crypto} price is ${fiat} ${last}</h1>`);
//       res.send();
//     }
//   );
// });

app.post("/", (req, res) => {
  const { crypto, fiat, amount } = req.body;
  const options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };
  request(options, (error, response, body) => {
    const data = JSON.parse(body);
    const { time, price } = data;
    res.write(`<h1>Current date is ${time}</h1>`);
    res.write(
      `<h1>Current price for ${amount} ${crypto} price is ${price} ${fiat}</h1>`
    );
    res.send();
  });
});

app.listen(3000, () => console.log("🎉 Server is running on port 3000"));
