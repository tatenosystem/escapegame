import "phaser";
import { DemoScene } from "./scenes/demo-scene";

const config: Phaser.Types.Core.GameConfig = {
    title: "demo",
    version: "0.0.1",
    width: 800,
    height: 600,
    parent:"game",
    type: Phaser.AUTO,
    scene: [DemoScene]
};

export class Game extends Phaser.Game{
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

// windowイベントで、ロードされたらゲーム開始
window.addEventListener("load", () => {
    var game = new Game(config);
});
