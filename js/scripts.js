let numberOne;
let operator;
let lastSum;


listeners();
updateSlider();


//Listeners for buttons and keyboardinput.
function listeners(){
    let numberButtons = document.querySelectorAll(".number");
    let opButtons = document.querySelectorAll(".operators");
    let equalButton = document.querySelector(".equal");
    let clearButton = document.querySelector("#col1");
    let backSpaceButton = document.querySelector("#col2");

    numberButtons.forEach(button => button.addEventListener("click", e => numbers(e.target.innerText)));
    opButtons.forEach(button => button.addEventListener("click", e => op(e.target.innerText)));
    equalButton.addEventListener("click", eq);
    clearButton.addEventListener("click", clear);
    backSpaceButton.addEventListener("click", backspace);

    window.addEventListener("keyup",keyboardListeners)
}


//Keyboardlisteners
function keyboardListeners(e){
    console.log(e.key);
    const allowedOperators = ["/", "*", "-", "+"];
    const allowedNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    if (allowedNumbers.includes(e.key)){
        numbers(e.key);
    } else if (allowedOperators.includes(e.key)){
        op(e.key);
    } else if (e.key === "Enter"){
        eq();
    } else if (e.key === "Backspace"){
        backspace();
    } else if (e.key === "Delete"){
        clear();
    }
}


//Numbercontroller
function numbers(number){
    let currOp = document.querySelector(".currOp");
    if(lastSum && currOp.textContent === lastSum.toString()){
        clear();
    }
    if (number === "." && currOp.textContent.includes(".")){ //Does not allow multiple dots.
        return;
    }
    currOp.textContent+=number;
}


//Operatorcontroller
function op(op){
    let operators = ["/", "*", "-", "+"];
    let currOp = document.querySelector(".currOp");
    let prevOp = document.querySelector(".prevOp");

    if (operators.includes(prevOp.textContent.slice(-1))){
        operator = op;
        prevOp.textContent = prevOp.textContent.slice(0,-1) + operator;
    } else if (lastSum){
            operator = op;
            numberOne = parseFloat(currOp.textContent); 
            prevOp.textContent = lastSum;
            currOp.textContent = "";
            prevOp.textContent+=(op);
        } else {
                operator = op;
                numberOne = parseFloat(currOp.textContent); 
                prevOp.textContent+=(currOp.textContent);
                currOp.textContent = "";
                prevOp.textContent+=(op);
        }
}

//Equal, backspace and clear function.
function eq() {
    let currOp = document.querySelector(".currOp");
    let prevOp = document.querySelector(".prevOp");
    if (!operator){ // If there is not operator selected, its not possible to use equalfunction.
        return;
    }
    let numberTwo = parseFloat(currOp.textContent);
    let sum = operate(operator, numberOne, numberTwo);
    prevOp.textContent+=(`${currOp.textContent}=`)
    currOp.textContent = sum;
    lastSum = sum;
    operator = "";
}

function backspace(){
    let currOp = document.querySelector(".currOp");
    if (currOp.textContent.length > 0){
        if (!lastSum || currOp.textContent !== lastSum.toString()){
            const newString = currOp.textContent.slice(0,-1);
            currOp.textContent = newString;
        }
    }
}

function clear(){
    let currOp = document.querySelector(".currOp");
    let prevOp = document.querySelector(".prevOp");
    currOp.textContent="";
    prevOp.textContent="";
    operator="";
    lastSum="";
}




//Operator mainmenu
function operate(operator, numberOne, numberTwo){
    let sum;
    switch (operator){
        case "+":
            sum=add(numberOne,numberTwo);
            break;
        case "-":
            sum=subtract(numberOne,numberTwo);
            break;
        case "*":
            sum=multiply(numberOne,numberTwo);
             break;
        case "/":
            if (numberTwo === 0){
                clear();
                return "CANT DIVIDE BY ZERO";
            }
            sum=divide(numberOne,numberTwo);
            break;
    }
    return round(sum);
}

//Operators
function add(numberOne, numberTwo){
    return numberOne+numberTwo;
}

function subtract(numberOne, numberTwo){
    return numberOne-numberTwo;
}

function multiply(numberOne, numberTwo){
    return numberOne*numberTwo;
}

function divide(numberOne, numberTwo){
    return parseFloat(numberOne/numberTwo);
}


//Helpfunction for round. Change allowed number of decimals to allow more.
function round(sum){
    let slider = document.getElementById("gridSizeSlider");
    const allowedNumberOfDecimals = parseInt(slider.value);
    if (!sum.toString().includes(".")){
        return sum;
    }
    const tempArray = sum.toString().split(".");
    const numOfDecimals = tempArray[1].length;
    console.log(numOfDecimals)
    if (numOfDecimals>allowedNumberOfDecimals){
        sum = (Math.round(sum*10)/10).toFixed(allowedNumberOfDecimals);
    }
    return sum;
}

//Decimalselection
function updateSlider(){
    let slider = document.getElementById("gridSizeSlider");
    let output = document.getElementById("gridSizeSliderV");
    output.innerHTML = `Number of decimals: ${slider.value}`;
    slider.addEventListener("change", () => {
        output.innerHTML = `Number of decimals: ${slider.value}`;
        clear();
    });
}