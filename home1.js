

document.addEventListener("DOMContentLoaded", () => {

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 92;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const animateElements = document.querySelectorAll(
        ".cellar-pillar-item, .pairing-h2-card, .reason-item, .sommelier-editorial-card, .ritual-step-item, .press-card"
    );

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            observer.observe(el);
        });
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (localStorage.getItem("direction") === "rtl") {
        document.documentElement.setAttribute("dir", "rtl");
    }
});