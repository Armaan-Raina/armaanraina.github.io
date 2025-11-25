// Header EEG Wave Animation - Simplified version to avoid errors
document.addEventListener('DOMContentLoaded', function() {
    const waveLayers = document.querySelectorAll('.wave-layer');

    // Base animation durations for different frequencies (sped up)
    const baseDurations = {
        'alpha-wave': 6,  // Alpha: 8-12 Hz (sped up)
        'beta-wave': 4.5, // Beta: 12-30 Hz (sped up)
        'theta-wave': 7.5, // Theta: 4-8 Hz (sped up)
        'delta-wave': 9,   // Delta: 0.5-4 Hz (sped up)
        'gamma-wave': 3    // Gamma: 30-100 Hz (sped up)
    };

    function updateWaveFrequencies() {
        try {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            // Calculate scroll percentage (0 to 1)
            const scrollPercent = Math.min(scrollTop / maxScroll, 1);

            waveLayers.forEach(layer => {
                const className = Array.from(layer.classList).find(cls => cls.includes('-wave'));
                if (className && baseDurations[className]) {
                    const baseDuration = baseDurations[className];

                    // Modify duration based on scroll position
                    // As you scroll down, waves get more active (faster)
                    const speedMultiplier = 0.7 + (scrollPercent * 1.0); // Range: 0.7x to 1.7x
                    const newDuration = baseDuration / speedMultiplier;

                    // Apply the new animation duration
                    layer.style.animationDuration = `${newDuration}s`;

                    // Keep consistent visibility - slight variation for dynamism
                    const opacity = 0.35 + (scrollPercent * 0.15); // Range: 0.35 to 0.5
                    layer.style.opacity = opacity;
                }
            });
        } catch (error) {
            console.warn('Wave animation error:', error);
        }
    }

    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateWaveFrequencies();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });

    // Initial call with error handling
    try {
        updateWaveFrequencies();
    } catch (error) {
        console.warn('Initial wave animation error:', error);
    }
});
