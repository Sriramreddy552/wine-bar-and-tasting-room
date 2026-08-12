// ==============================
// Load Navbar
// ==============================

fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((data) => {

        document.getElementById("navbar").innerHTML = data;

        initializeNavbar();

    })
    .catch((error) => {
        console.error("Navbar failed to load:", error);
    });


// ==============================
// Load Footer
// ==============================

fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {

        document.getElementById("footer").innerHTML = data;

        initializeBackToTop();

    })
    .catch((error) => {
        console.error("Footer failed to load:", error);
    });


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


    // Check required navbar elements

    if (!themeToggle || !rtlToggle || !menuToggle || !navLinks) {

        console.error("Navbar elements not found.");

        return;
    }


    // ==============================
    // Initialize Functions
    // ==============================

    setActiveNavLink();

    setupTheme(themeToggle);

    setupRTL(rtlToggle);

    setupMobileMenu(
        menuToggle,
        navLinks,
        mobileLogin,
        dropdowns
    );

    setupMobileDropdowns(dropdowns);

}


// ==============================
// Active Nav Link
// ==============================

function setActiveNavLink() {

    /*
        Get the current page.

        Example:

        /pages/index.html
        → index.html

        /pages/about.html
        → about.html

        /pages/contact.html
        → contact.html
    */

    let currentPage =
        window.location.pathname.split("/").pop();


    // If URL ends with /
    // consider it index.html

    if (currentPage === "") {

        currentPage = "index.html";

    }


    console.log("Current Page:", currentPage);


    // ==============================
    // Get All Navbar Links
    // ==============================

    const allNavLinks =
        document.querySelectorAll(".nav-links a");


    // ==============================
    // Remove ALL Active Classes
    // ==============================

    allNavLinks.forEach((link) => {

        link.classList.remove("active");

        link.removeAttribute("aria-current");

    });


    // ==============================
    // Check Each Link
    // ==============================

    allNavLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        // Ignore empty links
        // and javascript links

        if (
            !href ||
            href === "#" ||
            href.startsWith("javascript:")
        ) {

            return;

        }


        // ==============================
        // Convert Link To Full URL
        // ==============================

        const url =
            new URL(
                href,
                window.location.href
            );


        // Get filename

        let linkPage =
            url.pathname.split("/").pop();


        // Empty pathname = index.html

        if (linkPage === "") {

            linkPage = "index.html";

        }


        console.log(
            "Navbar Link:",
            link.textContent.trim(),
            "→",
            linkPage
        );


        // ==============================
        // Match Current Page
        // ==============================

        if (linkPage === currentPage) {

            // Add active class

            link.classList.add("active");

            // Accessibility

            link.setAttribute(
                "aria-current",
                "page"
            );


            // ==============================
            // Dropdown Parent
            // ==============================

            const dropdown =
                link.closest(".dropdown");


            if (dropdown) {

                const parentLink =
                    dropdown.querySelector(
                        ":scope > a"
                    );


                if (parentLink) {

                    parentLink.classList.add(
                        "active"
                    );

                }

            }

        }

    });

}


// ==============================
// Theme Toggle
// ==============================

function setupTheme(themeToggle) {

    // Load saved theme

    const savedTheme =
        localStorage.getItem("vinoraTheme");


    // Apply saved dark mode

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    // Update icon

    updateThemeIcons();


    // Toggle theme

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            // Check current mode

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            // Save theme

            localStorage.setItem(
                "vinoraTheme",
                isDark ? "dark" : "light"
            );


            // Update icon

            updateThemeIcons();

        }
    );

}


// ==============================
// Update Theme Icon
// ==============================

function updateThemeIcons() {

    const themeToggle =
        document.getElementById("themeToggle");


    if (!themeToggle) {

        return;

    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    if (isDark) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Light Mode"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Dark Mode"
        );

    }

}


// ==============================
// RTL Toggle
// ==============================

function setupRTL(rtlToggle) {

    rtlToggle.addEventListener(
        "click",
        () => {

            const isRTL =
                document.documentElement.dir === "rtl";


            // Toggle direction

            document.documentElement.dir =
                isRTL ? "ltr" : "rtl";


            // Save RTL setting

            localStorage.setItem(
                "vinoraDirection",
                isRTL ? "ltr" : "rtl"
            );

        }
    );


    // ==============================
    // Load Saved Direction
    // ==============================

    const savedDirection =
        localStorage.getItem(
            "vinoraDirection"
        );


    if (savedDirection) {

        document.documentElement.dir =
            savedDirection;

    }

}


// ==============================
// Mobile Menu
// ==============================

function setupMobileMenu(
    menuToggle,
    navLinks,
    mobileLogin,
    dropdowns
) {

    menuToggle.addEventListener(
        "click",
        () => {

            // Toggle menu

            const isActive =
                navLinks.classList.toggle(
                    "active"
                );


            // Toggle mobile login

            if (mobileLogin) {

                mobileLogin.classList.toggle(
                    "active",
                    isActive
                );

            }


            // Toggle menu icon

            menuToggle.innerHTML =
                isActive

                    ? '<i class="fa-solid fa-xmark"></i>'

                    : '<i class="fa-solid fa-bars"></i>';

        }
    );


    // ==============================
    // Resize Handler
    // ==============================

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 1024) {

                // Close mobile menu

                navLinks.classList.remove(
                    "active"
                );


                // Close mobile login

                if (mobileLogin) {

                    mobileLogin.classList.remove(
                        "active"
                    );

                }


                // Close dropdowns

                dropdowns.forEach(
                    (dropdown) => {

                        dropdown.classList.remove(
                            "active"
                        );

                    }
                );


                // Reset menu icon

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }
    );

}


// ==============================
// Mobile Dropdowns
// ==============================

function setupMobileDropdowns(dropdowns) {

    dropdowns.forEach(
        (dropdown) => {

            const topLink =
                dropdown.querySelector(
                    ":scope > a"
                );


            if (!topLink) {

                return;

            }


            topLink.addEventListener(
                "click",
                (e) => {

                    if (window.innerWidth <= 1024) {

                        e.preventDefault();


                        // Close other dropdowns

                        dropdowns.forEach(
                            (item) => {

                                if (
                                    item !== dropdown
                                ) {

                                    item.classList.remove(
                                        "active"
                                    );

                                }

                            }
                        );


                        // Toggle current dropdown

                        dropdown.classList.toggle(
                            "active"
                        );

                    }

                }
            );

        }
    );

}


// ==============================
// Back To Top
// ==============================

function initializeBackToTop() {

    const topBtn =
        document.querySelector(".top-btn");


    if (!topBtn) {

        return;

    }


    topBtn.addEventListener(
        "click",
        (e) => {

            e.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}