const express = require("express");

const app = express();

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: false,
      },
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
  {
    name: "Alex",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.use(express.json());
//  console.log(users.length);
// console.log(users[1].kidneys[1].healthy);
// get the no. of kidneys....!
app.get("/", function (req, res) {
  let kidneys = users[0].kidneys;
  let healthy = 0;
  let numberOfKidneys = kidneys.length;
  for (let j = 0; j < numberOfKidneys; j++) {
    if (kidneys[j].healthy) {
      healthy = healthy + 1;
    }
  }
  let UnhealthyKidneys = numberOfKidneys - healthy;
  res.json({
    numberOfKidneys,
    healthy,
    UnhealthyKidneys,
  });
});
// addding or inserting an healthy kidneys...!
app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "done!",
  });
});
// updating all the kidneys to healthy.....!
app.put("/", function (req, res) {
  if (atLeastOneUnhealthyKidney(users[0].kidneys)) {
    let kidneys = users[0].kidneys;
    for (let i = 0; i < kidneys.length; i++) {
      kidneys[i].healthy = true;
    }
    res.json({
      msg: "Updated SuccessFully..!",
    });
  } else {
    res.json({
      msg: "there are no kidney to update..!",
    });
  }
});
// removing all the Unhealthy Kidneys.....
app.delete("/", function (req, res) {
  // you should return a 411
  if (atLeastOneUnhealthyKidney(users[0].kidneys)) {
    let newKidneys = [];
    let kidneys = users[0].kidneys;
    for (let i = 0; i < kidneys.length; i++) {
      if (kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({
      msg: "deleted Successfully..!",
    });
  } else {
    res.status(411);
    res.json({
      msg: "there is no bad kidney to delete...!",
    });
  }
});

const atLeastOneUnhealthyKidney = (kidneys) => {
  let istrue = false;
  for (let i = 0; i < kidneys.length; i++) {
    if (kidneys[i].healthy == false) {
      istrue = true;
      break;
    }
  }
  return istrue;
};
app.listen(3000);
