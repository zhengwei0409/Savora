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


document.getElementById("confirmreset").addEventListener("click", function (event) {
    event.preventDefault();

    const resetModalEl = document.getElementById("resetCompletionModal");
    const resetModal = bootstrap.Modal.getInstance(resetModalEl); // Get the modal instance
    resetModal.hide();
});

document.getElementById("forgot-password").addEventListener("click", function () {
    const forgetModal = new bootstrap.Modal(document.getElementById("forgetCompletionModal"));
    forgetModal.show();
});

document.getElementById("verify-btn").addEventListener("click", function () {
    const forgetModalEl = document.getElementById("forgetCompletionModal");
    const forgetModal = bootstrap.Modal.getInstance(forgetModalEl); // Get the modal instance
    forgetModal.hide();

    const resetModal = new bootstrap.Modal(document.getElementById("resetCompletionModal"));
    resetModal.show();
});
