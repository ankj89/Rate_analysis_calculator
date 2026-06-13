function switchPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => page.classList.remove("active-page"));

    document
        .getElementById(pageId)
        .classList.add("active-page");

    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => btn.classList.remove("active"));

    document
        .querySelector(`[data-page="${pageId}"]`)
        .classList.add("active");
}
