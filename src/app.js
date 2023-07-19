import { createCarousel } from "./modules/typeCarousel.js";

window.onload = () => {
    const typeSentence = document.getElementById("type-sentence");

    const carouselText = [
        { text: "Nathan Baylon.", color: "black" },
        { text: "a software developer.", color: "red" },
        { text: "a content creator.", color: "blue" },
        { text: "a boyfriend.", color: "green" },
    ]

    createCarousel(carouselText, typeSentence);
}