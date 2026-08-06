const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove("active");
        });

        // Open the clicked item if it wasn't already open
        if (!isActive) {
            item.classList.add("active");
        }

    });

});
/*=========================
      DARK MODE
=========================*/

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme","dark");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme","light");

    }

});

/* Load Theme */

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark-mode");

    themeBtn.querySelector("i").classList.remove("fa-moon");
    themeBtn.querySelector("i").classList.add("fa-sun");

}

/*=========================
        RTL
=========================*/

const rtlBtn = document.getElementById("rtlToggle");

rtlBtn.addEventListener("click",()=>{

    document.body.classList.toggle("rtl");

    if(document.body.classList.contains("rtl")){

        document.documentElement.setAttribute("dir","rtl");

        localStorage.setItem("direction","rtl");

    }else{

        document.documentElement.setAttribute("dir","ltr");

        localStorage.setItem("direction","ltr");

    }

});

/* Load RTL */

if(localStorage.getItem("direction")==="rtl"){

    document.body.classList.add("rtl");

    document.documentElement.setAttribute("dir","rtl");

}



