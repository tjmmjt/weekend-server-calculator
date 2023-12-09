console.log('client.js is sourced!');

// onReady()
function onReady() {
    console.log("Weekend Challenge!!!")
    handleGet()
}

// need to POST an object containing {numOne, NumTwo, and operator}
const inputs = {}

// buttons
    // tried placing operator button variables in handlePost(). They did 
    // not work because handlePost() is not called until #equals is clicked
const plus = document.getElementById('plus')
plus.addEventListener('click', () => {inputs.operator = '+'})
const minus = document.getElementById('minus')
minus.addEventListener('click', () => {inputs.operator = '-'})
const times = document.getElementById('times')
times.addEventListener('click', () => {inputs.operator = '*'})
const divide = document.getElementById('divide')
divide.addEventListener('click', () => {inputs.operator = '/'})


function handlePost(event) {
    event.preventDefault()

    //declare input values and assign to incCalculations
    const numOne = document.getElementById('numOne').value
    inputs.firstNumber = Number(numOne)
    const numTwo = document.getElementById('numTwo').value
    inputs.secondNumber = Number(numTwo)
    inputs.result = ''
    console.log("Inputs:", inputs);


    axios({
        method: 'POST',
        url: '/calculations',
        data: inputs
    }) .then((response) => {
        console.log("Success!", response.data)
        handleGet()
    }) .catch((error) => {
        console.log("Error:", error);
    })
}

function handleGet() {

    axios({
        method: 'GET',
        url: '/calculations'
    }) .then((response) => {
        console.log("History:", response.data)
        const resultHistory = document.getElementById('resultHistory')
        resultHistory.innerHTML = ''
        for(let getResults of response.data){
            console.log('response data:', response.data);
            resultHistory.innerHTML += `
            <li>
                ${getResults.firstNumber} 
                ${getResults.operator} 
                ${getResults.secondNumber} 
                = 
                ${getResults.result}
            </li>
            `
        }
    }) .catch((error) => {
        console.log("Error:", error);
    })

}


