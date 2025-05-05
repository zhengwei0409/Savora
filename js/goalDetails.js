document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-goal-details');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const goalCard = this.closest('.goal-card');
            const goalTitle = goalCard.querySelector('h3').textContent;
            const goalCategory = goalCard.querySelector('p').textContent;
            
            document.querySelector('#goalDetailsModal .goal-title').textContent = goalTitle;
            document.querySelector('#goalDetailsModal .goal-category').textContent = goalCategory;
            
            // Initialize modal (not normally needed but ensures it works)
            const modal = new bootstrap.Modal(document.getElementById('goalDetailsModal'));
            modal.show();
        });
    });
});

