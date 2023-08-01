import { writeSentence, deleteSentence, waitForMs, createCarousel } from "./modules/typeCarousel.js";

// Don't forget to remove the async once ugly code is removed
window.onload = async () => {

    const preloader = document.querySelector(".preloader");
    const mainContent = document.querySelector(".main-content");
    const loadTimeOffset = 2000;

    setTimeout(() => {
        preloader.style.opacity = "0";
        mainContent.style.display = "block";
    }, loadTimeOffset);

    setTimeout(() => {
        preloader.style.display = "none";
    }, loadTimeOffset + 500);


    const typeSentence = document.getElementById("type-sentence");
    const ellipses = document.getElementById("ellipses");

    const carouselText = [
        { text: "Nathan Baylon.", color: "#000000" },
        { text: "a software developer.", color: "#C21E56" },
        { text: "a problem solver.", color: "#6495ED" },
    ]

    setTimeout(() => {
        createCarousel(carouselText, typeSentence);
    }, loadTimeOffset + 1000);

    // Really ugly code but leaving this here temporarily
    while(true) {
        await writeSentence("...", ellipses, 200);
        await waitForMs(1000);
        await deleteSentence(ellipses, 200);
        await waitForMs(500);
    }
}
