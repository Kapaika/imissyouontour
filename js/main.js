// Handle iOS fullscreen and status bar
document.addEventListener('DOMContentLoaded', function() {
    // Fix for iOS height issue with status bar
    const setHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    // Set the height on initial load
    setHeight();
    
    // Update the height whenever the window is resized
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);
    
    // Force full screen on iOS when possible
    if (navigator.standalone) {
        document.documentElement.classList.add('ios-standalone');
    }
    
    // Check concert dates and apply past-event class
    checkPastConcerts();
    
    // Add ticket icons to all tour dates
    addTicketIcons();
    
    // Ensure proper scroll behavior
    enableSmoothScrolling();
});

// Function to enable smooth scrolling and prevent nested scroll issues
function enableSmoothScrolling() {
    // Add smooth scrolling to the body
    document.body.style.scrollBehavior = 'smooth';
    
    // Prevent any non-body elements from capturing scroll
    document.querySelectorAll('.tour-list, .content-box, .content-container').forEach(el => {
        el.addEventListener('wheel', (e) => {
            if (el.scrollHeight <= el.clientHeight) {
                e.preventDefault();
            }
        });
    });
    
    // For iOS touch events, ensure main scrolling works properly
    document.addEventListener('touchmove', function(e) {
        // If we're on a scrollable element that's reached its scroll limit, allow body to scroll
        const target = e.target.closest('.tour-list, .content-box, .content-container');
        if (target && (target.scrollHeight <= target.clientHeight)) {
            e.stopPropagation();
        }
    }, { passive: false });
}

// Function to check if concert dates have passed
function checkPastConcerts() {
    // Get all tour dates
    const tourDates = document.querySelectorAll('.tour-date');
    
    // Current date - using the actual current date
    const currentDate = new Date();
    const currentYear = 2025; // Hard-coded for this specific project
    
    // Get today's date at the beginning of day (00:00:00)
    const todayStart = new Date(currentDate);
    todayStart.setHours(0, 0, 0, 0);
    
    // Process each tour date
    tourDates.forEach(tourDate => {
        // Get the date text (format: DD.MM)
        const dateElement = tourDate.querySelector('.date');
        if (dateElement) {
            const dateText = dateElement.textContent.trim();
            const [day, month] = dateText.split('.').map(Number);
            
            // Create a Date object for the concert date
            // Note: Months in JS are 0-based (0 = January)
            const concertDate = new Date(currentYear, month - 1, day);
            concertDate.setHours(0, 0, 0, 0); // Start of the concert day
            
            // Compare with today's start - if concert date is before today, it's past
            // If it's today or future, keep it active
            if (concertDate < todayStart) {
                tourDate.classList.add('past-event');
            } else {
                // Make sure we don't have a past-event class on future concerts
                tourDate.classList.remove('past-event');
            }
            
            // For debugging
            console.log(`Concert: ${dateText}, Date: ${concertDate.toLocaleDateString()}, Today: ${todayStart.toLocaleDateString()}, Status: ${concertDate < todayStart ? 'Past' : 'Active'}`);
        }
    });
}

// Function to add ticket icons to all tour dates
function addTicketIcons() {
    const tourDates = document.querySelectorAll('.tour-date');
    
    tourDates.forEach(tourDate => {
        const ticketIcon = document.createElement('div');
        ticketIcon.className = 'ticket-icon';
        tourDate.appendChild(ticketIcon);
    });
}