


let expression = '0';
let num1 = null;
let num2 = null;
let operator1 = null;
let operator2 = null;

function clickButton(){
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.className === 'number'){
                clickNumber(button)
            }
            if (button.id === 'decimal'){
                clickDecimal(button)
            }
            if (button.id === 'clear'){
                clear()
            }
            if (button.id === 'del'){
                remove()
            }
            if (button.id === 'plusMinus'){
                changeSign()
            }
            if (button.className === 'operators'){
                clickOperator(button)
            }
            if (button.id === 'equal'){
                clickEqualSign()
            }
        })
    });
}

clickButton()

function clickNumber(button){
    
    if (expression === '0'){
        expression = button.textContent;
    }else if ( expression === '-0'){
        return;
    }else {
        expression += button.textContent;
    }
    updateDisplay()
    removeError()
}

function clickDecimal(button){
    if(expression === '-'){
       return;
    }else if(expression.includes('.') === true){
        return;
    }else {
        expression += button.textContent;
    }
    updateDisplay()
}

function updateDisplay(){
    let display = document.querySelector('#result');
    display.textContent = expression;
}

function clear(){
    expression = '0';
    num1 = null;
    num2 = null;
    operator1 = null;
    operator2 = null;
    updateDisplay()
}

function remove(){
    removeError()
    if(expression.length === 1){
        expression = '0';
    }else if(expression === '0'){
        return;
    }else {
        expression = expression.slice(0, -1);
    }
    updateDisplay()
    
}

function changeSign(){
    if(expression === '0'){
        return expression;
    }else if(expression.charAt(0) === '-'){
        expression = expression.slice(1);
        
    }else{
        expression = '-' + expression; 
    }
    updateDisplay()
}

function removeError(){
    if(expression === '' || expression === 'Error'){
        clear()
    }
}

function clickOperator(button){

    removeError()
    
    if(num1 === null){
        num1 = expression;
        num2 = null;
        expression = '';
    }else
    if(num1 !== null){
        num2 = expression;
        operator2 = button.textContent;

        operate(num1, operator1, num2);

        if(num1 === '0' && num2 === '0' && operator1 === '/'){
            expression = 'Error';
            updateDisplay();
            num1 = null;
            num2 = null;
            operator1 = null;
            operator2 = null;
        }
        else
         {
            num1 = expression;
            num2 = null;
            operator1 = operator2;
            operator2 = null;
            expression = '';
        }  
    } 

    if(operator1 === null) {
        expression = '';
        operator1 = button.textContent;
    }
}

function clickEqualSign(){

    if (num1 !== null){
        num2 = expression;
        operate(num1, operator1, num2)
        num1 = null;
        operator1 = null;
    }else return
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(num1, operator1, num2){
    if(num1 === '0' && num2 === '0' && operator1 === '/'){
        expression = 'Error';
        updateDisplay();
        num1 = null;
        num2 = null;
        operator1 = null;
        operator2 = null;
    }

    if (operator1 === '+'){
        expression = add(+num1, +num2);
    }
    if(operator1 === '-'){
        expression = subtract(num1, num2);
    }
    if(operator1 === '*'){
        expression = multiply(num1, num2);
    }
    if(operator1 === '/'){
       expression = divide(num1, num2);
    }
    expression = expression.toString();
    updateDisplay();
}
