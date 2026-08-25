export function renderZeitSpalte(container, maxBloecke, aktuellerVergangenheitsWert) {
    const topContainer = container.querySelector(".top-stalactites");
    const bottomContainer = container.querySelector(".bottom-stalagmites");

    const zukunftsBloeckeAnzahl = maxBloecke - aktuellerVergangenheitsWert - 1;
    const vergangenheitsBloeckeAnzahl = aktuellerVergangenheitsWert + 1;

    topContainer.style.flexGrow = zukunftsBloeckeAnzahl;
    bottomContainer.style.flexGrow = vergangenheitsBloeckeAnzahl;

    topContainer.style.display = zukunftsBloeckeAnzahl === 0 ? "none" : "flex";
    bottomContainer.style.display = vergangenheitsBloeckeAnzahl === 0 ? "none" : "flex";

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

let aktiverBalken = null;
let letzterSekundenWert = -1;

export function renderSekundenKaskade(container, aktuelleSekunde) {
    if (!aktiverBalken) {
        container.innerHTML = "";
        aktiverBalken = document.createElement("div");
        aktiverBalken.className = "seconds-progress";
        container.appendChild(aktiverBalken);
        
        const startProzent = (aktuelleSekunde / 60) * 100;
        aktiverBalken.style.height = `${startProzent}%`;
        letzterSekundenWert = aktuelleSekunde;
        return;
    }

    if (aktuelleSekunde !== letzterSekundenWert) {
        
        if (aktuelleSekunde === 0 && letzterSekundenWert === 59) {
            const ausbrechenderBalken = aktiverBalken;
            ausbrechenderBalken.classList.add("exiting");
            
            const neuerBalken = document.createElement("div");
            neuerBalken.className = "seconds-progress";
            neuerBalken.style.transition = "none"; 
            neuerBalken.style.height = "0%"; 
            container.appendChild(neuerBalken);

            requestAnimationFrame(() => {
                neuerBalken.style.transition = "height 1s linear, opacity 0.3s ease";
                neuerBalken.style.height = "0%"; 
            });

            setTimeout(() => {
                ausbrechenderBalken.remove();
            }, 1600);

            aktiverBalken = neuerBalken;

        } else {
            if (aktuelleSekunde === 59) {
                aktiverBalken.style.height = "100%";
            } else {
                const prozent = (aktuelleSekunde / 60) * 100;
                aktiverBalken.style.height = `${prozent}%`;
            }
        }

        letzterSekundenWert = aktuelleSekunde;
    }
}