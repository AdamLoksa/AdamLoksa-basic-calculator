// Key animation not added


// Variable is changed after pressing equal to 'true'
let equalStatus = 'false';

//calculator selectors
const outputResult = document.querySelector('.output-result');
const outputOperation = document.querySelector('.output-operation');
const calculatorKeys = document.querySelector('#calculator__keys');


//event listeners
calculatorKeys.addEventListener('click', (e) => {
   const key = e.target;
   const action = key.dataset.action;
   const keyContent = key.textContent;

   computeCalculation(action, keyContent);
})


window.addEventListener('keydown', (e) => {
   const action = /[*+%/!.=\-]/;
   const number = /[0-9]/;
   const keyContent = e.key;


   if ( action.test(keyContent) || keyContent === 'Backspace' || keyContent === 'Enter') {
      computeCalculation(keyContent, '');
   } 
   else if ( (number.test(keyContent)) ) {
      computeCalculation('', keyContent);
   }

   return;
})

// process Input
function computeCalculation(action, keyContent) {
   let operation = outputOperation.textContent; 
   let result = outputResult.textContent;

   if (!action) {
      if (equalStatus === 'true') {
         operation = '';
         equalStatus = 'false';
      }
      processNumber(keyContent, operation);
   }
   else {
      equalStatus = 'false';
      processAction(action, operation, result);
   }

   return;
}


// inputs
function processNumber(number, operation){
   let currentOperation = addCharToOperation(number, operation);

   let result = calculate(currentOperation);
   displayOperation(currentOperation, result);
   return;
}

function processAction(action, operation, result) {
   if (operation === ''){
      return;
   }

   let currentOperation = operation;
   let operationResult = result;

   switch(action) {
      case 'clear':
         currentOperation = '';
         operationResult = '';
         break; 
      
      case '=':
      case 'Enter':
         // currentOperation = calculate(operation);
         currentOperation = result;
         operationResult = '';
         equalStatus = 'true';
         break;

      case '*':
         currentOperation = addCharToOperation('*', operation);
         break;

      case '/':
         currentOperation = addCharToOperation('/', operation);
         break;

      case '+':
         currentOperation = addCharToOperation('+', operation);
         break;

      case '-':
         currentOperation = addCharToOperation('-', operation);
         break;

      case '%':
         currentOperation = addCharToOperation('%', operation);
         break;
      
      case 'factorial':
      case '!':
         operationResult = calculate(operation);
         currentOperation = operationResult + '!';
         operationResult = calculateFactorial(operationResult);
         break;

      case '.':
         currentOperation = addCharToOperation('.', operation);
         break;

      case 'Backspace':
         currentOperation = backSpace(operation);
         operationResult = calculate(currentOperation);
   }

   displayOperation(currentOperation, operationResult);
   return;
}


//String
function addCharToOperation(char, operation) {
   let currentOperation = operation;
   
   if (currentOperation.length - 1 > 13) {
      alert('You reached maximum input length.')
      return 'Press AC to continue';
   }

   const lastIndexIsOperand = (/[*+%/!.\-]/).test(currentOperation.slice(-1));
   const charIsNum = (/[0-9]/.test(char));

   if (lastIndexIsOperand && !charIsNum){
      currentOperation = currentOperation.slice(0,-1);
   } 

   currentOperation += char;
   return currentOperation;
}


// Display
function displayOperation(operation, result) {
   if (operation.length > 15) {
      outputOperation.style.fontSize = "2rem";
      outputOperation.style['padding-top'] = "2rem";
   } else {
      outputOperation.style.fontSize = "3rem";
      outputOperation.style['padding-top'] = "1rem";
   }
   
   if (result !== 'Not a Number') {
      outputResult.textContent = result;
   } 
   
   outputOperation.textContent = operation;
   return;
}

function backSpace(operation) {
   return operation.slice(0,-1);
}


// MATH functions
function calculateFactorial(operation) {
   if (operation === 0){
      return '1';
   } else {
      let result = 1;
      for (let i = 1; i <= operation; i++) {
         result *= i;
      }
      
      return result;
   }
}

// ** Basic MATH parser START ** //
function calculate(expression) {
   const result = parseAdditionExpressions(expression, '+');

   if (isFinite(result)) {
      return result;
   }
   else {
      return 'Not a Number';
   }
}

function strip(number) {
   let x = 1000000000;
   return (Math.round(number * x)) / x;
}


// parse ' + ' operations
function parseAdditionExpressions(expression) {
   const numbersStr = expression.split("+");
   const numbers = numbersStr.map(str => parseSubtractionExpressions(str));
   const initValue = 0.0;
   const result = numbers.reduce((acc, operand) => acc + operand, initValue);
   return strip(result);
}

// parse ' - ' operations
function parseSubtractionExpressions(expression) {
   const numbersStr = expression.split('-');
   const numbers = numbersStr.map(str => parsePercentageExpressions(str));
   const initValue = numbers[0];
   const result = numbers.slice(1).reduce((acc, operand) => acc - operand, initValue);
   return result;
}

// parse ' % ' operations
function parsePercentageExpressions(expression) {
   const numbersStr = expression.split('%');
   const numbers = numbersStr.map(str => parseMultiplicationExpressions(str));
   const initValue = numbers[0];
   const result = numbers.slice(1).reduce((acc, operand) => acc * operand / 100, initValue);
   return result;
}

// parse ' * ' operations
function parseMultiplicationExpressions(expression) {
   const numbersStr = expression.split('*');
   const numbers = numbersStr.map(str => parseDivisionExpressions(str));
   const initValue = 1.0;
   const result = numbers.reduce((acc, operand) => acc * operand, initValue);
   return result;
}

// parse ' / ' operations
function parseDivisionExpressions(expression) {
   const numbersStr = expression.split('/');
   // float was not working properly
   const numbers = numbersStr.map(str => +str); 
   const initValue = numbers[0];
   const result = numbers.slice(1).reduce((acc, operand) => acc / operand, initValue);
   return result;
}
// ** Basic MATH parser END ** //





