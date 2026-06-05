const config = {
    type: Phaser.AUTO,
    width: 1280, //für HD
    height: 720,
    parent: 'game-container',
    backgroundColor: '#0a0e14',
    physics: {
        default: 'matter', //physik-engine aus phaser
        matter: {
            gravity: { y: 1}, //für die schwerkraft
            debug: true //linien anzeigen für physik
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//Spielstart mit Konfigurationen

const game = new Phaser.Game(config);

function preload() {
    //später für bilder und so
}

function create() {
    //test für physik:

    //Boden:
    this.matter.add.rectangle(640, 700, 1280, 40, { isStatic: true });

    //Text:
    this.add.text(640, 100, 'Chronos-Mori läuft!', {
        fontSize: '32px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    //test-block
    let testBlock = this.matter.add.rectangle(640, 200, 80, 40); //(  X,   Y, Breite, Höhe )

    //elastisch bisschen
    testBlock.restitution = 2;

}

function update() {

}
