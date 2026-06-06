export function getAktuelleZeitdaten() {
    const jetzt = new Date();
    const aktuellerMonat = jetzt.getMonth();
    const aktuellesJahr = jetzt.getFullYear();

    //berechnung der tage im aktuellen Monat
    const tageImMonat = new Date(aktuellesJahr, aktuellerMonat + 1, 0).getDate();

    return {
        jahr: aktuellesJahr,
        monat: aktuellerMonat,
        tag: jetzt.getDate() - 1, // -1 für 0-basierte Indexierung im Grid
        stunde: jetzt.getHours(),
        minute: jetzt.getMinutes(),
        sekunde: jetzt.getSeconds(),
        tageImMonat: tageImMonat
    };
}