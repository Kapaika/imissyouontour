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
});