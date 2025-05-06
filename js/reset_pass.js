const inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach((input, idx) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1 && idx < inputs.length - 1) {
      inputs[idx + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && input.value === '' && idx > 0) {
      inputs[idx - 1].focus();
    }
  });
});

document.querySelector('.close-btn').addEventListener('click',function(event){
    event.preventDefault();
    window.location.replace('');
});