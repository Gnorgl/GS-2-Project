export function renderZeitSpalte(container, maxBloecke, aktuellerVergangenheitsWert) {
    const topContainer = container.querySelector(".top-stalactites");
    const bottomContainer = container.querySelector(".bottom-stalagmites");

    const zukunftsBloeckeAnzahl = maxBloecke - aktuellerVergangenheitsWert - 1;
    const vergangenheitsBloeckeAnzahl = aktuellerVergangenheitsWert + 1;

    // 1. INITIALER AUFBAU (Beim Laden der Seite)
    if (topContainer.children.length === 0 && bottomContainer.children.length === 0) {
        // Zukunft (oben)
        for (let i = 0; i < zukunftsBloeckeAnzahl; i++) {
            const block = document.createElement("div");
            block.className = "time-block future";
            topContainer.appendChild(block);
        }
        
        // Vergangenheit (unten)
        for (let i = 0; i < vergangenheitsBloeckeAnzahl; i++) {
            const block = document.createElement("div");
            block.className = "time-block past";
            block.dataset.index = i;
            bottomContainer.appendChild(block);
        }
        return;
    }

    // 2. DYNAMISCHER WECHSEL (Wenn ein Block herunterfällt)
    if (topContainer.children.length > zukunftsBloeckeAnzahl) {
        const fallenderBlock = topContainer.lastElementChild;
        if (fallenderBlock) {
            fallenderBlock.remove();
        }

        const neuerPastBlock = document.createElement("div");
        neuerPastBlock.className = "time-block past just-fell";
        neuerPastBlock.dataset.index = bottomContainer.children.length;
        
        bottomContainer.appendChild(neuerPastBlock);

        setTimeout(() => {
            neuerPastBlock.classList.remove("just-fell");
        }, 500);
    }
}

export function renderSekundenKaskade(container, aktuelleSekunde) {
    if (aktuelleSekunde === 0) {
        container.innerHTML = "";
        return;
    }

    const vorhandeneKacheln = container.children.length;

    if (vorhandeneKacheln < aktuelleSekunde) {
        while (container.children.length < aktuelleSekunde) {
            const kachel = document.createElement("div");
            kachel.classList.add("second-tile");
            container.appendChild(kachel);
        }
    } else if (vorhandeneKacheln > aktuelleSekunde) {
        container.innerHTML = "";
        for (let i = 0; i < aktuelleSekunde; i++) {
            const kachel = document.createElement("div");
            kachel.classList.add("second-tile");
            container.appendChild(kachel);
        }
    }
}