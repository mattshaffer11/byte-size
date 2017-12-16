const binaryInput = document.getElementById('binary');
const decimalInput = document.getElementById('decimal');
const hexInput = document.getElementById('hex');
let currentValue = Number(10);

const clearInputs = () => {
  binaryInput.value = '';
  decimalInput.value = '';
  hexInput.value = '';
}

const updateInputs = () => {
  binaryInput.value = currentValue.toString(2);
  decimalInput.value = currentValue.toString(10);
  hexInput.value = currentValue.toString(16).toUpperCase();
}

const onInputChange = (base) => ({ target }) => {
  const cleanedValue = target.value.trim();
  const result = parseInt(cleanedValue, base);

  if (!cleanedValue.length) {
    clearInputs();
  } else if (!isNaN(result)) {
    currentValue = Number(result);
    updateInputs();
  }
}

binaryInput.addEventListener('input', onInputChange(2))
decimalInput.addEventListener('input', onInputChange(10))
hexInput.addEventListener('input', onInputChange(16))

document.getElementById('year').textContent = (new Date()).getFullYear();
updateInputs();
