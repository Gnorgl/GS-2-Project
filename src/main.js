document.addEventListener("DOMContentLoaded", () => {
    // DOM-Elemente greifen
    const colMonate = document.getElementById("col-monate");
    const colTage = document.getElementById("col-tage");
    const colStunden = document.getElementById("col-stunden");
    const colMinuten = document.getElementById("col-minuten");
    const colSekunden = document.getElementById("col-sekunden");

    // Initiales Update beim Laden der Seite
    updateClock();

    // Der unbestechliche Rhythmus: Jede Sekunde neu berechnen
    setInterval(updateClock, 1000);

    function updateClock() {
        const jetzt = new Date();
        
        // Aktuelle Zeitwerte holen
        const aktuelleSekunde = jetzt.getSeconds();
        const aktuelleMinute = jetzt.getMinutes();
        const aktuelleStunde = jetzt.getHours();
        const aktuellerTag = jetzt.getDate();
        const aktuellerMonat = jetzt.getMonth(); // 0 = Januar, 11 = Dezember
        
        // Maximale Tage im aktuellen Monat berechnen (wichtig fuer deinen dynamischen Kalender!)
        const tageImMonat = new Date(jetzt.getFullYear(), aktuellerMonat + 1, 0).getDate();

        // 1. RECHTS: Sekunden-Kaskade (Füllt sich bis 60, setzt dann zurück)
        renderSeconds(colSekunden, aktuelleSekunde);

        // 2. MITTE: Die Tropfsteine als Kalender-Gitter zeichnen
        renderColumn(colMinuten, 60, aktuelleMinute);
        renderColumn(colStunden, 24, aktuelleStunde);
        renderColumn(colTage, tageImMonat, aktuellerTag - 1); // -1 weil Tage bei 1 starten
        renderColumn(colMonate, 12, aktuellerMonat);
    }

    // Funktion, um die Tropfstein-Spalten (Blau vs. Orange) zu zeichnen
    function renderColumn(container, maxBlocks, currentPastValue) {
        // Um Flackern zu vermeiden, loeschen wir das Grid nur, wenn sich die Anzahl der Bloecke aendern muss
        if (container.children.length !== maxBlocks) {
            container.innerHTML = "";
            for (let i = maxBlocks - 1; i >= 0; i--) {
                const block = document.createElement("div");
                block.classList.add("time-block");
                
                // Kalender-Interaktion vorbereiten: Jeder Block weiss, welcher Index er ist
                block.addEventListener("click", () => {
                    alert(`Du hast Block ${i + 1} in der Spalte ${container.dataset.label} angeklickt! Hier koennen wir nun ein Event eintragen.`);
                });
                
                container.appendChild(block);
            }
        }

        // Farben aktualisieren (von oben nach unten: Vergangenheit = Orange, Zukunft = Blau)
        // Da flex-direction: column-reverse aktiv ist, gehen wir die Elemente von unten durch
        const blocks = container.children;
        for (let i = 0; i < maxBlocks; i++) {
            // Die Schleife läuft invers wegen column-reverse
            if (i < (maxBlocks - currentPastValue - 1)) {
                blocks[i].className = "time-block future"; // Blau (Zukunft)
            } else {
                blocks[i].className = "time-block past";   // Orange (Vergangenheit)
            }
        }
    }

    // Funktion fuer die Sekunden (Ein- und Ausblenden des Stapels)
    function renderSeconds(container, currentSeconds) {
        // Wenn Sekunden auf 0 zurueckspringen -> Spalte leeren
        if (currentSeconds === 0) {
            container.innerHTML = "";
            return;
        }

        // Nur neue Fliesen hinzufuegen, nicht jedes Mal alles neu zeichnen (schont die Performance)
        while (container.children.length < currentSeconds) {
            const tile = document.createElement("div");
            tile.classList.add("second-tile");
            container.appendChild(tile);
        }
    }
});