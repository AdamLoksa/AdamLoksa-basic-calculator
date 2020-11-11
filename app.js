//variables for result tracking
let currentOperation = '';
let operationResult = 0;
let lastOperationResult = 0;


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
   switch(action) {
      case 'clear':
         clearCalculator();
         return; 
      
      case 'equal':
         lastOperationResult = operationResult;
         currentOperation = operationResult + '';
         operationResult = '';
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

      case 'decimal':
         alert('To be added')
         // addCharToOperation('.');
         break;

      case 'percentage':
         addCharToOperation('%');
         break;

      case 'factorial':
         calculateFactorial();
         break;
   }
   displayOperation();
}


//display functions
function addCharToOperation(char) {
   const lastIndexIsOperand = (/[*+%/!\-]/).test(currentOperation.slice(-1));
   const charIsNum = (/[0-9]/.test(char));

   if (lastIndexIsOperand && !charIsNum){
      currentOperation = currentOperation.slice(0,-1);
   } 

   currentOperation += char;
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
   return parseAdditionExpressions(expression, '+');
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





