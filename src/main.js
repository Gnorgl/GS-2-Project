import { phaserConfig } from './config/phaserConfig.js';
import { ClockScene } from './scenes/ClockScene.js';

// Wir fügen die Szene der Konfiguration hinzu
const finalConfig = {
    ...phaserConfig,
    scene: [ClockScene]
};

// Spiel starten
const game = new Phaser.Game(finalConfig);