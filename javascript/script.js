//select the draw form:
const form = document.getElementById("form-draw");

//select the divisions of interface:
const resultDiv = document.querySelector(".container-result");
const formDiv = document.querySelector(".container-form");

//fields of user enter:
const numbersQuantityInput = document.getElementById("numbers-quantity-1"); // how many numbers draw
const fromInput = document.getElementById("numbers-quantity-2"); // min amount
const toInput = document.getElementById("numbers-quantity-3"); // max amount
const switchCheckbox = document.getElementById("switch"); // Checkbox: allowed repetions?

//Elements to show the result:

const numbersContainer = document.querySelector(".container-result-numbers");
const resultSubtitle = document.getElementById("result-subtitle");
const drawAgainButton = document.getElementById("draw-again");

//when click in "draw again" reset the page:

drawAgainButton.addEventListener("click", resetPage);

//When the form is sent, execut the draw:
form.addEventListener("submit", function (event) {
  event.preventDefault(); // //block the standart behavio(reload the page)
  drawNumbers(); //call the function draw number
});

//main function: draw the numbers:

function drawNumbers() {
  const quantity = parseInt(numbersQuantityInput.value); // Convert the enter number
  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  // Validate: block the invalid amounts
  if (quantity < 1 || from >= to) {
    alert("Please, insert a valid number.");
    return;
  }

  let numbers = []; // Final list random numbers
  let uniqueNumbers = new Set(); // to set that there is no repeat

  // Loop to draw the numbers
  while (numbers.length < quantity) {
    let randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;

    if (switchCheckbox.checked) {
      // if repeat is not allowed, add is still does not exist
      if (!uniqueNumbers.has(randomNumber)) {
        uniqueNumbers.add(randomNumber);
        numbers.push(randomNumber);
      }
    } else {
      // if it can repeat, just add directly
      numbers.push(randomNumber);
    }
  }

  // Show the result in the scream
  displayResults(numbers);
}

//function to show the results:
function displayResults(numbers) {
  formDiv.style.display = "none"; //hide the form
  resultDiv.style.display = "flex"; //show the result

  //add the numbers to the HTML:
  numbersContainer.innerHTML = numbers
    .map((num) => `<span class="number">${num}</span>`)
    .join("");

  //show the subtitle of the quantity drawed:
  resultSubtitle.textContent = `${numbers.length} Numbers Draw`;

  //after 1 second, add the class to animate the numbers
  setTimeout(() => {
    document
      .querySelectorAll(".container-result-numbers span")
      .forEach((span) => span.classList.add("show-number"));
  }, 1000);
}

//function to reset the page:
function resetPage() {
  resultDiv.style.display = "none"; //hide the results
  formDiv.style.display = "flex"; //show the form again
  numbersContainer.innerHTML = ""; //clear the last numbers
  resultSubtitle.textContent = ""; //clear the subtitle
  form.reset(); //reset all the forms
}
