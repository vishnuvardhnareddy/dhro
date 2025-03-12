// Profile Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    const dropdownExamName = document.getElementById('dropdown-exam-name');
    const testTitle = document.getElementById('test-title');
    
    // Update exam name in dropdown to match the current test
    if (testTitle && dropdownExamName) {
        dropdownExamName.textContent = testTitle.textContent;
    }
    
    // Toggle dropdown when profile icon is clicked
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target) && e.target !== profileIcon) {
                profileDropdown.classList.remove('active');
            }
        });
    }
    
    // Update profile info when test starts
    document.addEventListener('testStarted', function(e) {
        if (dropdownExamName && e.detail && e.detail.testTitle) {
            dropdownExamName.textContent = e.detail.testTitle;
        }
    });
});
