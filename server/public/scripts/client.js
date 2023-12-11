console.log("client.js is sourced!");

// onReady()
function onReady() {
  // display response.data on start/refresh
  handleGet();
}

// need to POST an object containing {numOne, NumTwo, and operator}
const inputs = {};

// buttons
// onclick, operators are assigned to inputs.operator
// tried placing operator button variables in handlePost(). They did
// not work because handlePost() is not called until #equals is clicked
const plus = document.getElementById("plus");
plus.addEventListener("click", () => {
  inputs.operator = "+";
});
const minus = document.getElementById("minus");
minus.addEventListener("click", () => {
  inputs.operator = "-";
});
const times = document.getElementById("times");
times.addEventListener("click", () => {
  inputs.operator = "*";
});
const divide = document.getElementById("divide");
divide.addEventListener("click", () => {
  inputs.operator = "/";
});
// clear button to reset form inputs
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  document.querySelector("form").reset();
});

// ! POST
function checkInputs(event) {
  event.preventDefault(event);
  console.log(document.getElementById("numOne").value);
  if (
    document.getElementById("numOne").value === "" ||
    document.getElementById("numTwo").value === ""
  ) {
    alert("Missing input(s)!");
  } else {
    handlePost();
  }
}

function handlePost() {
  //declare input variable and assign to input.value
  // assign input to {inputs.firstNumber} and make a Number
  const numOne = document.getElementById("numOne").value;
  inputs.firstNumber = Number(numOne);
  const numTwo = document.getElementById("numTwo").value;
  inputs.secondNumber = Number(numTwo);
  console.log("Inputs:", inputs);

  // POST {inputs} --- the calculations will occur on server.js
  axios({
    method: "POST",
    url: "/calculations",
    data: inputs,
  })
    .then((response) => {
      console.log("Success!", response.data);
      // call handleGet() to render new calculation
      handleGet();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function handleGet() {
  axios({
    method: "GET",
    url: "/calculations",
  })
    .then((response) => {
      // console.log("History:", response.data) // for testing
      // variable for rendering to #resultHistory
      const resultHistory = document.getElementById("resultHistory");
      // need to set resultHistory to empty string to prevent duplicates when appending
      resultHistory.innerHTML = "";
      // loop through response.data and render inputs/result to #resultHistory
      for (let getResults of response.data) {
        // console.log('response data:', response.data); // for testing
        resultHistory.innerHTML += `
            <li>
                ${getResults.firstNumber} 
                ${getResults.operator} 
                ${getResults.secondNumber} 
                = 
                ${getResults.result}
            </li>
            `;
      }
      // declare a variable recentResult and assign it to the last item of response.data
      let recentResult = response.data[response.data.length - 1];
      // need a variable for rendering to the #recentResult
      let displayRecent = document.getElementById("recentResult");
      // displayRecent.innerHTML = recentResult
      displayRecent.innerHTML = `<h3>Result: ${recentResult.result}</h3>`;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  // clear form
  document.querySelector("form").reset();
}

function handleDelete() {

    
  axios
    .delete("/calculations")
    .then((response) => {
      console.log("Resource deleted successfully:", response.data);
      handleGet();
    })
    .catch((error) => {
      console.error("Error deleting resource:", error);
    });
}

onReady();
