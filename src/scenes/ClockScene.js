export class ClockScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ClockScene' });
    }

    preload() {
        // Hier laden wir später Grafiken
    }

    create() {
        // 1. Hauptboden
        this.matter.add.rectangle(640, 710, 1280, 20, { isStatic: true });

        // 2. Definition der Spalten-Mittelpunkte (X-Koordinaten)
        this.columns = {
            jahre: 120,
            monate: 400,
            tage: 540,
            stunden: 680,
            minuten: 820,
            sekunden: 1100
        };

        const wandBreite = 10;
        const wandHohe = 500;
        const wandY = 450;

        // Funktion für die Wände
        const createColumnWalls = (xCenter, width) => {
            const halbBreite = width / 2;
            this.matter.add.rectangle(xCenter - halbBreite, wandY, wandBreite, wandHohe, { isStatic: true });
            this.matter.add.rectangle(xCenter + halbBreite, wandY, wandBreite, wandHohe, { isStatic: true });
        };

        // Wände ziehen
        createColumnWalls(this.columns.monate, 90);
        createColumnWalls(this.columns.tage, 90);
        createColumnWalls(this.columns.stunden, 90);
        createColumnWalls(this.columns.minuten, 90);
        createColumnWalls(this.columns.sekunden, 90);

        // Kleiner Test-Block zum Start
        this.matter.add.rectangle(this.columns.sekunden, 100, 80, 40, { restitution: 0.1 });
    }

    update() {
        // Hier kommt später die Echtzeit-Überprüfung rein
    }
}