document.addEventListener("DOMContentLoaded", function () {
 
    const faqItems = document.querySelectorAll(".faq-item");
 
    faqItems.forEach(function (item) {
 
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-question strong");
 
        question.addEventListener("click", function () {
 
            const alreadyOpen = item.classList.contains("active");
 
 
            /* CLOSE ALL FAQS */
 
            faqItems.forEach(function (faq) {
 
                faq.classList.remove("active");
 
                const faqIcon =
                    faq.querySelector(".faq-question strong");
 
                if (faqIcon) {
                    faqIcon.textContent = "+";
                }
 
            });
 
 
            /* OPEN CLICKED FAQ */
 
            if (!alreadyOpen) {
 
                item.classList.add("active");
 
                icon.textContent = "−";
 
            }
 
        });
 
    });
 
});