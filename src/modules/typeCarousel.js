async function writeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");

    let i = 0;

    while (i < letters.length) {
        await waitForMs(delay);
        eleRef.innerText += letters[i];
        i++;
    }
}

async function deleteSentence(eleRef, delay = 75) {
    const sentence = eleRef.innerHTML;
    const letters = sentence.split("");

    while (letters.length > 0) {
        await waitForMs(delay);
        letters.pop();
        eleRef.innerText = letters.join("");
    }
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createCarousel(carouselList, eleRef) {
    let i = 0;

    while(true) {
        eleRef.style.color = carouselList[i].color;

        await writeSentence(carouselList[i].text, eleRef);
        await waitForMs(2000);
        await deleteSentence(eleRef);
        await waitForMs(500);

        i++;
        if (i >= carouselList.length) i = 0;
    }
}

export { createCarousel };