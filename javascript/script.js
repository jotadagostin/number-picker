// Selecionando os elementos importantes
const form = document.getElementById("form-draw");
const resultDiv = document.querySelector(".container-result");
const formDiv = document.querySelector(".container-form"); // Agora também selecionando a div de formulário
const numbersQuantityInput = document.getElementById("numbers-quantity-1");
const fromInput = document.getElementById("numbers-quantity-2");
const toInput = document.getElementById("numbers-quantity-3");
const switchCheckbox = document.getElementById("switch");

// Função para sortear números
function drawNumbers() {
  const quantity = parseInt(numbersQuantityInput.value);
  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  if (quantity < 1 || from >= to) {
    alert("Please, insert a valid number.");
    return;
  }

  let numbers = [];
  let uniqueNumbers = new Set(); // Para evitar números repetidos

  while (numbers.length < quantity) {
    let randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;

    // Se a opção "Não repetir números" estiver marcada, verificamos a duplicidade
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

// Função para exibir os resultados
function displayResults(numbers) {
  // Esconde a div de formulário e mostra a div de resultados
  formDiv.style.display = "none"; // Esconde a div do formulário
  resultDiv.style.display = "flex"; // Mostra a div de resultados

  // Preenche a div de resultados com os números sorteados
  resultDiv.innerHTML = `
    <div class="container-result-titles">
      <h1>Resultado do sorteio</h1>
      <h2>${numbers.length} Números Sorteados</h2>
    </div>
    <div class="container-result-numbers">
      ${numbers.map((num) => `<span>${num}</span>`).join("")}
    </div>
    <button id="draw-again">
      <span>DRAW AGAIN</span>
      <img src="./assets/icons/play.svg" alt="seta apontando pro lado direito" />
    </button>
  `;

  // Adicionando evento no botão de novo sorteio
  const drawAgainButton = document.getElementById("draw-again");
  drawAgainButton.addEventListener("click", function () {
    resultDiv.style.display = "none"; // Esconde a div de resultados
    formDiv.style.display = "flex"; // Mostra a div de formulário novamente
    form.reset(); // Reseta o formulário
  });
}

// Adiciona o evento de envio do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Previne o envio do formulário
  drawNumbers(); // Chama a função para sortear os números
});
