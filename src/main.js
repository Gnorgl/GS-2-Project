import { getAktuelleZeitdaten } from './clock/core.js';
import { renderZeitSpalte, renderSekundenKaskade } from './clock/renderer.js';

document.addEventListener("DOMContentLoaded", () => {
    // DOM-Elemente aus der index.html greifen
    const colMonate = document.getElementById("col-monate");
    const colTage = document.getElementById("col-tage");
    const colStunden = document.getElementById("col-stunden");
    const colMinuten = document.getElementById("col-minuten");
    const colSekunden = document.getElementById("col-sekunden");

    // Die Herzschlag-Funktion der Uhr
    function tick() {
        // 1. Daten holen
        const zeitdaten = getAktuelleZeitdaten();

        // 2. Ansicht aktualisieren
        renderSekundenKaskade(colSekunden, zeitdaten.sekunde);
        renderZeitSpalte(colMinuten, 60, zeitdaten.minute);
        renderZeitSpalte(colStunden, 24, zeitdaten.stunde);
        renderZeitSpalte(colTage, zeitdaten.tageImMonat, zeitdaten.tag);
        renderZeitSpalte(colMonate, 12, zeitdaten.monat);
    }

    // Sofort beim Laden einmal ausführen und dann jede Sekunde (1000ms) wiederholen
    tick();
    setInterval(tick, 1000);
});