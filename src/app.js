const typeSentence = document.getElementById("type-sentence");

async function writeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");

    let i = 0;

    while (i < letters.length) {
        await waitForMs(delay);
        eleRef.innerText += letters[i];
        i++;
    }
}

async function deleteSentence(eleRef, delay = 100) {
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

const carouselText = [
    { text: "Nathan Baylon.", color: "black" },
    { text: "a software developer.", color: "red" },
    { text: "a content creator.", color: "blue" },
    { text: "a boyfriend.", color: "green" },
]

async function carousel(carouselList, eleRef) {
    let i = 0;

    while(true) {
        eleRef.style.color = carouselList[i].color;

        await writeSentence(carouselList[i].text, eleRef);
        await waitForMs(1500);
        await deleteSentence(eleRef);
        await waitForMs(500);

        i++;
        if (i >= carouselList.length) i = 0;
    }
}

carousel(carouselText, typeSentence)