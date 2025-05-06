// Show modal on page load
document.addEventListener('DOMContentLoaded', function() {
    var profileModal = new bootstrap.Modal(document.getElementById('profileCompletionModal'));
    profileModal.show();
});


function calculateDuration() {
    var selectedDate = document.getElementById('duration').value;
    if (!selectedDate) return; 
    
    var endDate = new Date(selectedDate);
    var startDate = new Date(); 
    
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    
    // Adjust for negative months (if the selected month is earlier than the current month)
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById('durationDisplay').textContent = `Duration: ${years} years ${months} months`;
}

document.getElementById('duration').addEventListener('input', calculateDuration);
