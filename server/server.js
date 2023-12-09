const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []

// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log("Request for calculations was made:")
  // send [calculations] on GET request
  res.send(calculations)
})

// POST /calculations
app.post('/calculations', (req, res) => {
  console.log("Request for calculations was made:")
  // console.log("Calculations before:", calculations); // for testing
  // console.log("req.body before:", req.body) // for testing
  
  let numOne = req.body.firstNumber
  let numTwo = req.body.secondNumber
  let operator = req.body.operator
  

  // if operator is plus, add numOne & numTwo
  if(operator === '+'){
    req.body.result = numOne + numTwo
    // console.log("REQ BODY", req.body)
    // console.log("IN PLUS:", operator)
  } else if(operator === '-'){
    req.body.result = numOne - numTwo
    // console.log("REQ BODY", req.body)
    // console.log("IN MINUS:", operator)
  } else if(operator === '*'){
    req.body.result = numOne * numTwo
    // console.log("REQ BODY", req.body)
    // console.log("IN TIMES:", operator)
  } else if(operator === '/'){
    req.body.result = numOne / numTwo
    // console.log("REQ BODY", req.body)
    // console.log("IN DIVIDE:", operator)
  }

  // console.log("RESULT:", req.body.result); // for testing

  // push calculated req.body to [calculations]
  calculations.push(req.body)
  // console.log("Calculations after:", calculations); // for testing
  res.sendStatus(201)
})



// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
