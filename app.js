import { writeSentence, deleteSentence, waitForMs, createCarousel } from "./modules/typeCarousel.js";

// Don't forget to remove the async once ugly code is removed
window.onload = async () => {
    const typeSentence = document.getElementById("type-sentence");
    const ellipses = document.getElementById("ellipses");

    const carouselText = [
        { text: "Nathan Baylon.", color: "#000000" },
        { text: "a software dev.", color: "#c21e56" },
        { text: "a problem solver.", color: "#6495ED" },
    ]

    createCarousel(carouselText, typeSentence);

    // Really ugly code but leaving this here temporarily
    while(true) {
        await writeSentence("...", ellipses, 200);
        await waitForMs(1000);
        await deleteSentence(ellipses, 200);
        await waitForMs(500);
    }
}
