export const phaserConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    render: {
        transparent: true // Behält deine nahtlose Transparenz bei
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true // Lassen wir vorerst für die Wände an
        }
    }
};