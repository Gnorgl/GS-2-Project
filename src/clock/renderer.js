export function renderZeitSpalte(container, maxBloecke, aktuellerVergangenheitsWert) {
    const topContainer = container.querySelector(".top-stalactites");
    const bottomContainer = container.querySelector(".bottom-stalagmites");

    const zukunftsBloeckeAnzahl = maxBloecke - aktuellerVergangenheitsWert - 1;
    const vergangenheitsBloeckeAnzahl = aktuellerVergangenheitsWert + 1;

    // Setzt die elastische Masse der beiden Hauptbalken
    topContainer.style.flexGrow = zukunftsBloeckeAnzahl;
    bottomContainer.style.flexGrow = vergangenheitsBloeckeAnzahl;

    // Blendet leere Container sauber aus
    topContainer.style.display = zukunftsBloeckeAnzahl === 0 ? "none" : "flex";
    bottomContainer.style.display = vergangenheitsBloeckeAnzahl === 0 ? "none" : "flex";

    // Dynamischer Abgleich der inneren Segmente für den Hover-Zustand
    if (topContainer.children.length > zukunftsBloeckeAnzahl) {
        while (topContainer.children.length > zukunftsBloeckeAnzahl) {
            topContainer.lastElementChild?.remove();
        }
    } else if (topContainer.children.length < zukunftsBloeckeAnzahl) {
        while (topContainer.children.length < zukunftsBloeckeAnzahl) {
            const block = document.createElement("div");
            block.className = "time-block future";
            topContainer.appendChild(block);
        }
    }

    if (bottomContainer.children.length < vergangenheitsBloeckeAnzahl) {
        while (bottomContainer.children.length < vergangenheitsBloeckeAnzahl) {
            const block = document.createElement("div");
            block.className = "time-block past";
            bottomContainer.appendChild(block);
        }
    } else if (bottomContainer.children.length > vergangenheitsBloeckeAnzahl) {
        while (bottomContainer.children.length > vergangenheitsBloeckeAnzahl) {
            bottomContainer.lastElementChild?.remove();
        }
    }
}

export function renderSekundenKaskade(container, aktuelleSekunde) {
    let progressIndicator = container.querySelector(".seconds-progress");
    
    if (!progressIndicator) {
        container.innerHTML = "";
        progressIndicator = document.createElement("div");
        progressIndicator.className = "seconds-progress";
        container.appendChild(progressIndicator);
    }

    const prozent = (aktuelleSekunde / 60) * 100;

    if (aktuelleSekunde === 0) {
        progressIndicator.style.transition = "none";
        progressIndicator.style.height = "0%";
        progressIndicator.offsetHeight; 
        progressIndicator.style.transition = "height 1s linear";
    } else {
        progressIndicator.style.height = `${prozent}%`;
    }
}