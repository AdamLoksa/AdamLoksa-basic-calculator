//variables for result tracking
let currentOperation = '';
let operationResult = '';
let lastOperationResult = 0;
let equalStatus = 0;


//calculator selectors
const outputResult = document.querySelector('.output-result');
const outputOperation = document.querySelector('.output-operation');
const calculatorKeys = document.querySelector('#calculator__keys');


//event listener
calculatorKeys.addEventListener('click', (e) => {
   const key = e.target;
   const action = key.dataset.action;
   const keyContent = key.textContent;

   if (!action) {
      if (equalStatus === 1){
            clearCalculator();
      }
      
      addCharToOperation(keyContent);
      operationResult = calculate(currentOperation);
      displayOperation();
   } 
   else {
      processAction(action);
   }
})





//non numerical inputs
function processAction(action) {
   if (currentOperation === ''){
      return;
   }

   switch(action) {
      case 'clear':
         clearCalculator();
         return; 
      
      case 'equal':
         lastOperationResult = operationResult;
         currentOperation = operationResult + '';
         operationResult = '';
         displayOperation();
         equalStatus = 1;
         break;

      case 'multiply':
         addCharToOperation('*');
         break;

      case 'divide':
         addCharToOperation('/');
         break;

      case 'add':
         addCharToOperation('+');
         break;

      case 'subtract':
         addCharToOperation('-');
         break;

      case 'percentage':
         addCharToOperation('%');
         break;

      case 'factorial':
         calculateFactorial();
         break;
         
   }
   // displayOperation();
}


//display functions
function addCharToOperation(char) {
   if (currentOperation.length - 1 > 13) {
      alert('You reached maximum input length.')
      return;
   }

   const lastIndexIsOperand = (/[*+%/!\-]/).test(currentOperation.slice(-1));
   const charIsNum = (/[0-9]/.test(char));

   if (lastIndexIsOperand && !charIsNum){
      currentOperation = currentOperation.slice(0,-1);
   } 

   currentOperation += char;
   equalStatus = 0;
   displayOperation();
}

function displayOperation() {
   outputResult.textContent = operationResult;
   outputOperation.textContent = currentOperation;
}


// Input handling
function validateNumInput() {
   if (currentOperantion.length - 1 > 13) {

   }
}

// CLEAR function
function clearCalculator() {
   currentOperation = '';
   operationResult = '';
   lastOperationResult = 0;

   displayOperation();
}


// MATH functions
function calculateFactorial() {
   operationResult = calculate(currentOperation);

   if (operationResult === 0){
      currentOperation = '0!';
      operationResult = 1;
   } 
   else {
      let result = 1;
      for (let i = 1; i <= operationResult; i++) {
         result *= i;
      }

      currentOperation = operationResult + '!';
      operationResult = result;
   }
   displayOperation();
}

// ** Basic MATH parser START ** //
function calculate(expression) {
   const result = parseAdditionExpressions(expression, '+');
   return result;
}

// parse ' + ' operations
function parseAdditionExpressions(expression) {
   const numbersStr = expression.split("+");
   const numbers = numbersStr.map(str => parseSubtractionExpressions(str));
   const initValue = 0.0;
   const result = numbers.reduce((acc, operand) => acc + operand, initValue);
   return result;
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
   const numbers = numbersStr.map(str => parseInt(str));
   const initValue = numbers[0];
   const result = numbers.slice(1).reduce((acc, operand) => acc / operand, initValue);
   return result;
}
// ** Basic MATH parser END ** //





