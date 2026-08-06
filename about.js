/*==================================
        WINE FACTS COUNTER
==================================*/
 
const counters = document.querySelectorAll(".fact-item h2");
 
const counterObserver = new IntersectionObserver((entries, observer) => {
 
    entries.forEach(entry => {
 
        if(entry.isIntersecting){
 
            const counter = entry.target;
 
            const text = counter.innerText;
 
            const target = parseInt(text.replace(/\D/g,""));
 
            const suffix = text.replace(/[0-9]/g,"");
 
            let count = 0;
 
            const speed = target / 80;
 
            const updateCounter = () => {
 
                if(count < target){
 
                    count += speed;
 
                    counter.innerText = Math.ceil(count) + suffix;
 
                    requestAnimationFrame(updateCounter);
 
                }else{
 
                    counter.innerText = target + suffix;
 
                }
 
            };
 
            updateCounter();
 
            observer.unobserve(counter);
 
        }
 
    });
 
},{
    threshold:0.5
});
 
counters.forEach(counter => {
 
    counterObserver.observe(counter);
 
});     
 const darkBtn = document.querySelector(".dark-mode-btn");

darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

});

window.onload=()=>{

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark-mode");

    }

}