document.addEventListener("DOMContentLoaded", ()=> {
    let linkArr = document.querySelectorAll("nav a");

    linkArr.forEach(link => {
        link.addEventListener("click", function() {
            linkArr.forEach(l => {l.classList.remove("active")} );

            this.classList.add("active");
        });
    });
});