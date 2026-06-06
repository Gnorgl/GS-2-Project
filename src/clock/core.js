export function getAktuelleZeitdaten() {
    const jetzt = new Date(); //System uhr wird genutzt
    const aktuellerMonat = jetzt.getMonth(); //fängt bei 0 an, deswegen unten + 1
    const aktuellesJahr = jetzt.getFullYear();

    //berechnung der tage im aktuellen Monat
    const tageImMonat = new Date(aktuellesJahr, aktuellerMonat + 1, 0).getDate(); 
    //neues date objekt, tag wird 0, was als letzter tag des vorherigen monats zählt, dann wird aktueller tag geholt

    return {
        jahr: aktuellesJahr,
        monat: aktuellerMonat,
        tag: jetzt.getDate() - 1, // -1 für 0-basierte Indexierung im Grid, damit erstes element erster tag ist.
        stunde: jetzt.getHours(),
        minute: jetzt.getMinutes(),
        sekunde: jetzt.getSeconds(),
        tageImMonat: tageImMonat
    };
}