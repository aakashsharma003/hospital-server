const express = require("express");
const app = express();
const port = process.env.port;
app.get("/sum", (req, res) => {
  const num1 = parseInt(req.query.a);
  const num2 = parseInt(req.query.b);
  res.send(`Sum of ${num1} and ${num2} is ${num1 + num2}`);
});

app.listen(port, () => {
  console.log(`Our app is listening on port ${port}`);
});
