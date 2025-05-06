const form = document.getElementById("form-draw");
const resultDiv = document.querySelector(".container-result");
const formDiv = document.querySelector(".container-form");

const numbersQuantityInput = document.getElementById("numbers-quantity-1");
const fromInput = document.getElementById("numbers-quantity-2");
const toInput = document.getElementById("numbers-quantity-3");
const switchCheckbox = document.getElementById("switch");

const numbersContainer = document.querySelector(".container-result-numbers");
const resultSubtitle = document.getElementById("result-subtitle");
const drawAgainButton = document.getElementById("draw-again");

drawAgainButton.addEventListener("click", resetPage);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  drawNumbers();
});

function drawNumbers() {
  const quantity = parseInt(numbersQuantityInput.value);
  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  if (quantity < 1 || from >= to) {
    alert("Please, insert a valid number.");
    return;
  }

  let numbers = [];
  let uniqueNumbers = new Set();

  while (numbers.length < quantity) {
    let randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
    if (switchCheckbox.checked) {
      if (!uniqueNumbers.has(randomNumber)) {
        uniqueNumbers.add(randomNumber);
        numbers.push(randomNumber);
      }
    } else {
      numbers.push(randomNumber);
    }
  }

  displayResults(numbers);
}

function displayResults(numbers) {
  formDiv.style.display = "none";
  resultDiv.style.display = "flex";

  numbersContainer.innerHTML = numbers
    .map((num) => `<span class="number">${num}</span>`)
    .join("");
  resultSubtitle.textContent = `${numbers.length} Numbers Drawn`;

  setTimeout(() => {
    document
      .querySelectorAll(".container-result-numbers span")
      .forEach((span) => span.classList.add("show-number"));
  }, 1000);
}

function resetPage() {
  resultDiv.style.display = "none";
  formDiv.style.display = "flex";
  numbersContainer.innerHTML = "";
  resultSubtitle.textContent = "";
  form.reset();
}
