// Seleciona o formulário de sorteio
const form = document.getElementById("form-draw");

// Seleciona as divisões da interface
const resultDiv = document.querySelector(".container-result");
const formDiv = document.querySelector(".container-form");

// Campos de entrada do usuário
const numbersQuantityInput = document.getElementById("numbers-quantity-1"); // Quantos números sortear
const fromInput = document.getElementById("numbers-quantity-2"); // Valor mínimo
const toInput = document.getElementById("numbers-quantity-3"); // Valor máximo
const switchCheckbox = document.getElementById("switch"); // Checkbox: permitir repetições?

// Elementos para mostrar os resultados
const numbersContainer = document.querySelector(".container-result-numbers");
const resultSubtitle = document.getElementById("result-subtitle");
const drawAgainButton = document.getElementById("draw-again");

// Quando clicar em "SORTEAR NOVAMENTE", reseta a página
drawAgainButton.addEventListener("click", resetPage);

// Quando o formulário for enviado, executa o sorteio
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o comportamento padrão (recarregar a página)
  drawNumbers(); // Chama a função para sortear os números
});

// Função principal: sorteia os números
function drawNumbers() {
  const quantity = parseInt(numbersQuantityInput.value); // Converte entrada para número
  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  // Validação: impede valores inválidos
  if (quantity < 1 || from >= to) {
    alert("Please, insert a valid number.");
    return;
  }

  let numbers = []; // Lista final dos números sorteados
  let uniqueNumbers = new Set(); // Para garantir que não haja repetições

  // Loop para sortear os números
  while (numbers.length < quantity) {
    let randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;

    if (switchCheckbox.checked) {
      // Se não permitir repetição, adiciona só se ainda não existir
      if (!uniqueNumbers.has(randomNumber)) {
        uniqueNumbers.add(randomNumber);
        numbers.push(randomNumber);
      }
    } else {
      // Se puder repetir, só adiciona direto
      numbers.push(randomNumber);
    }
  }

  // Exibe os resultados na tela
  displayResults(numbers);
}

// Função para exibir os resultados
function displayResults(numbers) {
  formDiv.style.display = "none"; // Esconde o formulário
  resultDiv.style.display = "flex"; // Mostra o resultado

  // Adiciona os números ao HTML
  numbersContainer.innerHTML = numbers
    .map((num) => `<span class="number">${num}</span>`)
    .join("");

  // Mostra o subtítulo com a quantidade sorteada
  resultSubtitle.textContent = `${numbers.length} Numbers Drawn`;

  // Após 1 segundo, adiciona classe para animar os números
  setTimeout(() => {
    document
      .querySelectorAll(".container-result-numbers span")
      .forEach((span) => span.classList.add("show-number"));
  }, 1000);
}

// Função para reiniciar a página
function resetPage() {
  resultDiv.style.display = "none"; // Esconde os resultados
  formDiv.style.display = "flex"; // Mostra o formulário novamente
  numbersContainer.innerHTML = ""; // Limpa os números antigos
  resultSubtitle.textContent = ""; // Limpa o subtítulo
  form.reset(); // Reseta todos os campos
}
