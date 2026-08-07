// ==============================
// Load Navbar
// ==============================
fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        initializeNavbar();
    })
    .catch((error) => console.error("Navbar failed to load:", error));

// ==============================
// Load Footer
// ==============================
fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("footer").innerHTML = data;
        initializeBackToTop();
        updateThemeIcons();
    })
    .catch((error) => console.error("Footer failed to load:", error));

// ==============================
// Navbar Functions
// ==============================
function initializeNavbar() {

    const themeToggle = document.getElementById("themeToggle");
    const rtlToggle = document.getElementById("rtlToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");
    const mobileLogin = document.querySelector(".mobile-login");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (!themeToggle || !rtlToggle || !menuToggle || !navLinks) {
        console.error("Navbar elements not found.");
        return;
    }

    setActiveNavLink();

    setupTheme(themeToggle);
    setupRTL(rtlToggle);
    setupMobileMenu(menuToggle, navLinks, mobileLogin, dropdowns);
    setupMobileDropdowns(dropdowns);
}

// ==============================
// Active Nav Link (Fixed)
// ==============================
function setActiveNavLink() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((link) => {

        const linkPage =
            new URL(link.href, window.location.origin)
                .pathname
                .split("/")
                .pop() || "index.html";

        // Remove previous active state
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {

        const linkPage =
            new URL(link.href, window.location.origin)
                .pathname
                .split("/")
                .pop() || "index.html";

        if (linkPage === currentPage) {

            link.classList.add("active");
            link.setAttribute("aria-current", "page");

            // Highlight parent dropdown if needed
            const dropdown = link.closest(".dropdown");

            if (dropdown) {

                const parentLink = dropdown.querySelector(":scope > a");

                if (parentLink) {
                    parentLink.classList.add("active");
                }
            }
        }
    });

}

// ==============================
// Theme Toggle
// ==============================
function setupTheme(themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");
        updateThemeIcons();

    });

}

function updateThemeIcons() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

}

// ==============================
// RTL Toggle
// ==============================
function setupRTL(rtlToggle) {

    rtlToggle.addEventListener("click", () => {

        document.documentElement.dir =
            document.documentElement.dir === "rtl"
                ? "ltr"
                : "rtl";

    });

}

// ==============================
// Mobile Menu
// ==============================
function setupMobileMenu(menuToggle, navLinks, mobileLogin, dropdowns) {

    menuToggle.addEventListener("click", () => {

        const isActive = navLinks.classList.toggle("active");

        if (mobileLogin) {
            mobileLogin.classList.toggle("active", isActive);
        }

        menuToggle.innerHTML = isActive
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {

            navLinks.classList.remove("active");

            if (mobileLogin) {
                mobileLogin.classList.remove("active");
            }

            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active");
            });

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

}

// ==============================
// Mobile Dropdowns
// ==============================
function setupMobileDropdowns(dropdowns) {

    dropdowns.forEach((dropdown) => {

        const topLink = dropdown.querySelector(":scope > a");

        if (!topLink) return;

        topLink.addEventListener("click", (e) => {

            if (window.innerWidth <= 1024) {

                e.preventDefault();

                dropdowns.forEach((item) => {

                    if (item !== dropdown) {
                        item.classList.remove("active");
                    }

                });

                dropdown.classList.toggle("active");

            }

        });

    });

}

// ==============================
// Back To Top
// ==============================
function initializeBackToTop() {

    const topBtn = document.querySelector(".top-btn");

    if (!topBtn) return;

    topBtn.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}