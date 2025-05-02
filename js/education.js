document.addEventListener("DOMContentLoaded",() => {
    let listArr = document.querySelectorAll(".sub-header div");

    listArr.forEach(function(listItem) {
        listItem.addEventListener("click", function() {
            listArr.forEach((l) => l.classList.remove("active-title"));

            this.classList.add("active-title");
        })
    })
})