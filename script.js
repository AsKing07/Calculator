// Sélection des éléments et des boutons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".digit, .operation, .clear, .decimal, .equals, .signe, .pourcentage");

// Variables pour le suivi des données
let currentInput = "";
let currentOperation = null;
let firstOperand = null;
let result = "";

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
  display.textContent = result;
}

// Gestion des événements pour chaque bouton
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    // Gestion du bouton égal
    if (value === "=") 
    {
      if (currentOperation && firstOperand !== null) 
      {
        // Effectuer l'opération sur les opérandes et mettre à jour le résultat
        currentInput = operate(firstOperand, currentInput, currentOperation);
        firstOperand = null;
        currentOperation = null;
        result = currentInput;
        updateDisplay();
      }
    } 

    // Gestion du bouton "C" (Clear)
    else if (value === "C") 
    {
      // Réinitialisation complète des données et de l'affichage
      currentInput = "";
      currentOperation = null;
      firstOperand = null;
      result = "";
      updateDisplay();
    } 

    // Gestion du bouton décimal
    else if (value === ".") 
    {
      if (!currentInput.includes(".")) // Check if current input is already a decimal
      {
        currentInput += ".";
        result = currentInput;
        updateDisplay();
      }
    } 

    // Gestion des opérations (+, -, *, /)
    else if (value === "+" || value === "-" || value === "*" || value === "/") 
    {
      if (currentOperation && firstOperand !== null) 
      {
        // Effectuer l'opération sur les opérandes, mettre à jour le résultat et réinitialiser
        currentInput = operate(firstOperand, currentInput, currentOperation);
        firstOperand = currentInput;
        currentOperation = value;
        result = currentInput;
        updateDisplay();
        currentInput = "";
      } 
      else 
      {
        // Mémoriser le premier opérande et l'opération en attente
        firstOperand = currentInput;
        currentOperation = value;
        currentInput = "";
        result = currentInput;
        updateDisplay();
      }
    } 

    // Gestion des boutons "±" et "%"
    else if (value === "(+/-)") 
    {
      result = (parseFloat(result) * -1).toString();
      currentInput = result;
      updateDisplay();
    } 
    
    else if (value === "%") 
    {
      result = (parseFloat(result) / 100).toString();
      currentInput = result;
      updateDisplay();
    } 

    // Gestion des chiffres
    else 
    {
      if (currentInput.length < 8) 
      {
        if (currentInput === "0") 
        {
          currentInput = value;
          result = currentInput;
        } 
        else 
        {
          currentInput += value;
          result = currentInput;
        }
        updateDisplay();
      }
    }
  });
});

// Fonction pour effectuer les opérations
function operate(a, b, operator) 
{
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) 
  {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "*":
      return (a * b).toString();
    case "/":
      if (b !== 0) 
      {
        return (a / b).toString();
      } 
      else 
      {
        return "ERR";
      }
    default:
      return "ERR";
  }
}

// Initialiser l'affichage
updateDisplay();
