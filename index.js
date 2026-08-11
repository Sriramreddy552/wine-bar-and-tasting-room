

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

    const regionCards = document.querySelectorAll(".region-card");

    regionCards.forEach(card => {
        card.addEventListener("click", () => {
            if (window.innerWidth <= 1024) {
                regionCards.forEach(other => {
                    if (other !== card) other.classList.remove("mobile-active");
                });
                card.classList.toggle("mobile-active");
            }
        });
    });

    const animateElements = document.querySelectorAll(
        ".region-card, .flight-card, .pairing-card, .exp-feature, .event-item-row, .vault-feature-card, .club-benefit"
    );

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
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
            el.style.transform = "translateY(24px)";
            el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
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
