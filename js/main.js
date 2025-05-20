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
});

// Function to check if concert dates have passed
function checkPastConcerts() {
    // Get all tour dates
    const tourDates = document.querySelectorAll('.tour-date');
    
    // Current date - using the provided date (May 20, 2025)
    const currentDate = new Date();
    const currentYear = 2025; // Hard-coded for this specific project
    
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
            
            // If the concert date is before or equal to today, mark as past event
            if (concertDate < currentDate) {
                tourDate.classList.add('past-event');
            } else {
                // Make sure we don't have a past-event class on future concerts
                tourDate.classList.remove('past-event');
            }
            
            // For debugging
            console.log(`Concert: ${dateText}, ${concertDate < currentDate ? 'Past' : 'Upcoming'}`);
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