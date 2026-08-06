/*==================================
        FAQ ACCORDION
==================================*/
 
const faqItems = document.querySelectorAll(".faq-item");
 
faqItems.forEach(item => {
 
    const question = item.querySelector(".faq-question");
 
    question.addEventListener("click", () => {
 
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
 
            if(otherItem !== item){
 
                otherItem.classList.remove("active");
 
                const otherAnswer = otherItem.querySelector(".faq-answer");
                otherAnswer.style.maxHeight = null;
 
            }
 
        });
 
        // Toggle current FAQ
        item.classList.toggle("active");
 
        const answer = item.querySelector(".faq-answer");
 
        if(item.classList.contains("active")){
 
            answer.style.maxHeight = answer.scrollHeight + "px";
 
        }else{
 
            answer.style.maxHeight = null;
 
        }
 
    });
 
});
 
 
/*==================================
        FAQ SCROLL ANIMATION
==================================*/
 
const observer = new IntersectionObserver((entries)=>{
 
    entries.forEach(entry=>{
 
        if(entry.isIntersecting){
 
            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";
 
        }
 
    });
 
},{
    threshold:0.2
});
 
faqItems.forEach((item,index)=>{
 
    item.style.opacity="0";
    item.style.transform="translateY(50px)";
    item.style.transition=`all .6s ease ${index * 0.15}s`;
 
    observer.observe(item);
 
});