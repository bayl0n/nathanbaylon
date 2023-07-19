import { createCarousel } from "./modules/typeCarousel.js";

window.onload = () => {
    const typeSentence = document.getElementById("type-sentence");

    const carouselText = [
        { text: "Nathan Baylon.", color: "#000000" },
        { text: "a software developer.", color: "#c21e56" },
        { text: "a content creator.", color: "#6495ED" },
    ]

    createCarousel(carouselText, typeSentence);
}