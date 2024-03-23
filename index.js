// we are creating an http server
// express
const express = require("express");

const app = express();

const getSum = (n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
};

app.get("/", function (req, res) {
  let n = req.query.n;
  let ans = getSum(n);
  res.send(`Sure i can give u the sum till ${n} : ` + ans.toString());
});

app.listen(3000);
