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
    // Initialisierung beim ersten Laden der Uhr
    if (!aktiverBalken) {
        container.innerHTML = "";
        aktiverBalken = document.createElement("div");
        aktiverBalken.className = "seconds-progress";
        container.appendChild(aktiverBalken);
        
        // Sofort richtig positionieren, damit es beim Start nicht ruckelt
        const startProzent = 100 - ((aktuelleSekunde / 60) * 100);
        aktiverBalken.style.transform = `translateY(${startProzent}%)`;
        letzterSekundenWert = aktuelleSekunde;
        return;
    }

    // Nur agieren, wenn sich die Sekunde wirklich verändert hat
    if (aktuelleSekunde !== letzterSekundenWert) {
        
        // MINUTENWECHSEL-EFFEKT (Von Sekunde 59 auf 0)
        if (aktuelleSekunde === 0 && letzterSekundenWert === 59) {
            // 1. Der alte Balken schießt auf 0% translateY (also randvoll gegossen)
            aktiverBalken.style.transform = "translateY(0%)";
            
            // 2. Wir markieren ihn, damit er nach oben hin ausbricht
            const ausbrechenderBalken = aktiverBalken;
            ausbrechenderBalken.classList.add("exiting");
            
            // Befehl zum nach oben Rausschießen (Aus dem Container nach oben weg)
            setTimeout(() => {
                ausbrechenderBalken.style.transform = "translateY(-100%)";
            }, 50);

            // 3. Einen neuen, frischen Balken unten im Gehäuse gebären
            const neuerBalken = document.createElement("div");
            neuerBalken.className = "seconds-progress";
            neuerBalken.style.transition = "none"; // Keine Animation beim Spawnen ganz unten
            neuerBalken.style.transform = "translateY(100%)"; 
            container.appendChild(neuerBalken);

            // Ein Frame warten, damit der Browser die Startposition unten kapiert
            requestAnimationFrame(() => {
                neuerBalken.style.transition = "transform 1s linear, opacity 0.5s ease";
                // Der neue Balken übernimmt sofort den Tick für die Sekunde 0
                neuerBalken.style.transform = "translateY(100%)"; 
            });

            // Alten Balken nach der Ausfliegs-Animation komplett aus dem DOM löschen
            setTimeout(() => {
                ausbrechenderBalken.remove();
            }, 1300);

            // Den Fokus auf das neue Element umschalten
            aktiverBalken = neuerBalken;

        } else {
            // REGULÄRER FLUSS (Sekunden 1 bis 59)
            // Wenn der Balken gerade frisch übernommen hat (nach Sekunde 0), 
            // animiert er nun geschmeidig hoch.
            const prozent = 100 - ((aktuelleSekunde / 60) * 100);
            aktiverBalken.style.transform = `translateY(${prozent}%)`;
        }

        letzterSekundenWert = aktuelleSekunde;
    }
}