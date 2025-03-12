// Quiz Confirmation and Toast Functionality

// Toast message functionality
function showToast(type, title, message, duration = 5000) {
    const toast = document.getElementById('message-toast');
    const toastIcon = toast.querySelector('.toast-icon i');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    const progressBar = toast.querySelector('.toast-progress-bar');
    
    // Set icon based on type
    toastIcon.className = '';
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-times-circle';
    } else if (type === 'warning') {
        toastIcon.className = 'fas fa-exclamation-circle';
    } else if (type === 'info') {
        toastIcon.className = 'fas fa-info-circle';
    }
    
    // Set content
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Set type class
    toast.className = 'message-toast';
    toast.classList.add(type);
    
    // Reset animation
    progressBar.style.animation = 'none';
    void progressBar.offsetWidth; // Trigger reflow
    progressBar.style.animation = `progress ${duration/1000}s linear forwards`;
    
    // Show toast
    toast.classList.add('active');
    
    // Auto hide after duration
    const hideTimeout = setTimeout(() => {
        hideToast();
    }, duration);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideToast();
    });
    
    function hideToast() {
        toast.classList.remove('active');
    }
}

// Confirmation modal functionality
function setupConfirmationModals() {
    // Submit Test Confirmation
    const submitTestBtn = document.getElementById('submit-test');
    const submitConfirmation = document.getElementById('submit-confirmation');
    const submitClose = document.getElementById('submit-close');
    const submitCancel = document.getElementById('submit-cancel');
    const submitConfirm = document.getElementById('submit-confirm');
    
    if (submitTestBtn && submitConfirmation) {
        // Show confirmation
        submitTestBtn.addEventListener('click', () => {
            submitConfirmation.classList.add('active');
            submitConfirmation.querySelector('.confirmation-modal').classList.add('pulse');
            
            // Remove pulse animation after it completes
            setTimeout(() => {
                submitConfirmation.querySelector('.confirmation-modal').classList.remove('pulse');
            }, 500);
        });
        
        // Close confirmation
        submitClose.addEventListener('click', () => {
            submitConfirmation.classList.remove('active');
        });
        
        submitCancel.addEventListener('click', () => {
            submitConfirmation.classList.remove('active');
        });
        
        // Confirm submission
        submitConfirm.addEventListener('click', () => {
            submitConfirmation.classList.remove('active');
            
            // Show success toast
            showToast('success', 'Test Submitted', 'Your test has been submitted successfully!');
            
            // Call the original submit function
            submitTest();
        });
    }
    
    // End Test Confirmation
    const endTestBtn = document.getElementById('end-test-btn');
    const endConfirmation = document.getElementById('end-confirmation');
    const endClose = document.getElementById('end-close');
    const endCancel = document.getElementById('end-cancel');
    const endConfirm = document.getElementById('end-confirm');
    
    if (endTestBtn && endConfirmation) {
        // Show confirmation
        endTestBtn.addEventListener('click', () => {
            endConfirmation.classList.add('active');
            endConfirmation.querySelector('.confirmation-modal').classList.add('pulse');
            
            // Remove pulse animation after it completes
            setTimeout(() => {
                endConfirmation.querySelector('.confirmation-modal').classList.remove('pulse');
            }, 500);
        });
        
        // Close confirmation
        endClose.addEventListener('click', () => {
            endConfirmation.classList.remove('active');
        });
        
        endCancel.addEventListener('click', () => {
            endConfirmation.classList.remove('active');
        });
        
        // Confirm end test
        endConfirm.addEventListener('click', () => {
            endConfirmation.classList.remove('active');
            
            // Show info toast
            showToast('info', 'Test Ended', 'Your test has been ended and submitted.');
            
            // Call the original submit function
            submitTest();
        });
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('confirmation-overlay')) {
            e.target.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupConfirmationModals();
});
