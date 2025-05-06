// Goal-Details js

document.addEventListener('DOMContentLoaded', function() {
    // Modal trigger setup
    const viewButtons = document.querySelectorAll('.view-goal-details');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const goalCard = this.closest('.goal-card');
            const goalTitle = goalCard.querySelector('h3').textContent;
            const goalCategory = goalCard.querySelector('p').textContent;
            
            document.querySelector('#goalDetailsModal .goal-title').textContent = goalTitle;
            document.querySelector('#goalDetailsModal .goal-category').textContent = goalCategory;

            const modal = new bootstrap.Modal(document.getElementById('goalDetailsModal'));
            modal.show();
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById('savingsHistoryChart').getContext('2d');

    // Create the bar chart
    var savingsHistoryChart = new Chart(ctx, {
        type: 'bar', // Type of chart (bar)
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'], 
            datasets: [{
                data: [2000, 3000, 2500, 3500, 4000, 3000, 4500, 2000, 1400, 4500, 2200, 4400], // Example savings data
                backgroundColor: '#7886C7', 
                barThickness: 30,
                borderRadius: 7
                
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false  // Hide the legend (optional)
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false 
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#7886C7'
                    },
                    grid: {
                        display: false 
                    }
                },
            }
        }
    });
});




//Add savings js
// Handle Add Savings Modal
document.addEventListener('DOMContentLoaded', function() {
    const savingsForm = document.getElementById('savingsForm');
    
    if (savingsForm) {
      savingsForm.addEventListener('Save', function(e) {
        e.preventDefault();
        
        const amount = parseFloat(document.querySelector('.savings-input').value);
        if (isNaN(amount) || amount <= 0) {
          alert('Please enter a valid amount');
          return;
        }
        
        // Here you would typically send the data to your backend
        console.log('Saving amount:', amount);
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addSavingsModal'));
        modal.hide();
        
        // Show success message (optional)
        alert(`Successfully saved RM ${amount.toFixed(2)}`);
      });
    }
  });


// Delete Goal Confirmation
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-goal');
    const confirmDeleteBtn = document.querySelector('.btn-confirm-delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const goalCard = this.closest('.goal-card');
            const goalTitle = goalCard.querySelector('h3').textContent;
            
            // You could display the goal title in the modal if needed
            // document.querySelector('.delete-title').textContent = `Delete ${goalTitle}`;
        });
    });
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            // Add your delete logic here
            console.log('Goal deleted');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteGoalModal'));
            modal.hide();
            
            // Optional: Show success message or redirect
            alert('Goal successfully deleted');
        });
    }
});


//Reminder Modal
document.addEventListener('DOMContentLoaded', function() {
    // Trigger first modal
    const remindMeBtn = document.getElementById('remindMeButton');
    
    if (remindMeBtn) {
        remindMeBtn.addEventListener('click', function() {
            const reminderModal = new bootstrap.Modal(document.getElementById('reminderModal'));
            reminderModal.show();
        });
    }
    
    // Handle confirmation
    const confirmReminder = document.getElementById('confirmReminder');
    
    if (confirmReminder) {
        confirmReminder.addEventListener('click', function() {
            // Close first modal
            const reminderModal = bootstrap.Modal.getInstance(document.getElementById('reminderModal'));
            reminderModal.hide();
            
            // Show success modal after a slight delay
            setTimeout(() => {
                const successModal = new bootstrap.Modal(document.getElementById('reminderSuccessModal'));
                successModal.show();
            }, 300);
            
            // Here you would typically send the data to your backend
            // to set up the email reminders
        });
    }
});


// Edit Goal Details Modal
// When the user modifies the saving duration
document.getElementById('editDuration').addEventListener('change', updateDurationDisplay);

function updateDurationDisplay() {
    const endDate = new Date(document.getElementById('editDuration').value);
    
    if (startDate) {
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        document.getElementById('editDurationDisplay').textContent = 
            `Duration: ${years} years ${months} months`;
    }
}