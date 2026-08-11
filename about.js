document.addEventListener("DOMContentLoaded", () => {
 
    const counters = document.querySelectorAll(".counter");
 
    const numbersSection = document.querySelector(".vinora-numbers");
 
    if (!counters.length || !numbersSection) return;
 
 
    const startCounter = (counter) => {
 
        const target = Number(counter.dataset.target);
 
        const suffix = counter.dataset.suffix || "";
 
        const duration = 1800;
 
        const startTime = performance.now();
 
 
        const updateCounter = (currentTime) => {
 
            const elapsed = currentTime - startTime;
 
            const progress = Math.min(elapsed / duration, 1);
 
 
            // Smooth ease-out effect
            const easeOut = 1 - Math.pow(1 - progress, 3);
 
 
            const currentValue = Math.floor(
                easeOut * target
            );
 
 
            counter.textContent =
                currentValue + suffix;
 
 
            if (progress < 1) {
 
                requestAnimationFrame(updateCounter);
 
            } else {
 
                counter.textContent =
                    target + suffix;
 
            }
 
        };
 
 
        requestAnimationFrame(updateCounter);
 
    };
 
 
    const observer = new IntersectionObserver(
 
        (entries, observer) => {
 
            entries.forEach(entry => {
 
                if (entry.isIntersecting) {
 
                    counters.forEach(counter => {
 
                        startCounter(counter);
 
                    });
 
 
                    observer.unobserve(numbersSection);
 
                }
 
            });
 
        },
 
        {
            threshold: 0.3
        }
 
    );
 
 
    observer.observe(numbersSection);
 
});
 
 
 