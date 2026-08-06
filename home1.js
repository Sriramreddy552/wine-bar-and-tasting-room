
const counters = document.querySelectorAll(".counter");

const speed = 80;

counters.forEach(counter => {

    const updateCount = () => {

        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";

        const count = +counter.innerText.replace("K", "");

        const increment = Math.ceil(target / speed);

        if (count < target) {

            counter.innerText = count + increment;

            setTimeout(updateCount, 25);

        } else {

            counter.innerText = target + suffix;

        }

    };

    updateCount();

});