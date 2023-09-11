import { MessageBox } from "../message-box";

declare var window: any;

export class DemoScene extends Phaser.Scene
{
    private sceneSprite = [];
    // startシーンから開始
    private currentScene = 'start';
    private sceneCursor = [];
    private msgBox;

    constructor() {
        super({key: "DemoScene"});

        // TODO プロダクトではシーン、パーツはオブジェクトに保持し、状態管理する
        // シーン -1:n- パーツ
        this.initAllSceneCursor();
    }

    preload(): void {
        console.log(window.scenes);

        for (let assets of window.scenes['_assets']) {
            this.load.image(assets.split('.')[0], "./assets/"+assets);
            console.log("./assets/"+assets);
        }
    }

    create(): void
    {
        // 背景 main パーツ
        let partScript = window.scenes[this.currentScene]['main'];
        this.sceneSprite['main'] = this.add.sprite(0, 0, partScript['image']).setOrigin(0, 0);

        // 背景(main)以外のパーツ
        for (let partsName in window.scenes[this.currentScene]) {
            if (partsName === 'main') continue;

            let partScript = window.scenes[this.currentScene][partsName];
            console.log('part', partsName);
            // image 指定があるときのみ作画
            if (typeof partScript['image'] !== 'undefined') {
                console.log('part_image', partsName);
                let partPosition = partScript['position'];
                this.sceneSprite[partsName] = this.add.sprite(partPosition[0], partPosition[1], partScript['image']).setOrigin(0, 0);
            }
        }

        this.msgBox = new MessageBox(this);
        this.msgBox.show(this.nextAction('main'));

        this.input.on('pointerdown', this.pointerdown, this);
    }

    pointerdown(pointer): void
    {
        let targetParts = this.getTargetParts(pointer);
        console.log('>>', targetParts);

        let message = this.nextAction(targetParts);
        console.log(">", message);
        if (message === null) {
            this.msgBox.hide();
            return;
        }
        this.msgBox.show(message);
    }

    // パーツ(target)指定で次のアクション実行
    // @return 表示メッセージ
    nextAction(target: string): string|null
    {
        let sceneScript = window.scenes[this.currentScene][target]['script'];
        for (let cursor = this.sceneCursor[this.currentScene][target]; cursor < sceneScript.length; cursor++) {
            let line = sceneScript[cursor];
            // パーツ表示制御
            if (line[1] === 'IMAGE_HIDE') {
                this.sceneSprite[target].destroy();
            }
            // message
            if (line[1] === '') {
                this.sceneCursor[this.currentScene][target]++;
                return line[2];
            }
        }

        return null;
    }

    // クリック位置からパーツを特定
    getTargetParts(pointer): string
    {
        let touchX = pointer.downX;
        let touchY = pointer.downY;
        console.log('x=' + touchX + ', y=' + touchY);

        for (let partsName in window.scenes[this.currentScene]) {
            let positons = window.scenes[this.currentScene][partsName]['position'];
            if (typeof positons === 'undefined') continue;

            if (
                pointer.x >= positons[0] &&
                pointer.y >= positons[1] &&
                pointer.x <= (positons[0] + positons[2]) &&
                pointer.y <= (positons[1] + positons[3])
            ) {
                return partsName;
            }
        }

        return 'main';
    }

    // 全てのシーン内オブジェクトのカーソル位置初期化
    // TODO プロダクトではシーン、パーツをオブジェクトで管理。パーツの状態でアクティブやカーソル管理
    // DEMO 現在はカレントシーンのみ初期化
    initAllSceneCursor(): void
    {
    this.sceneCursor[this.currentScene] = [];
    for (let partsName in window.scenes[this.currentScene]) {
            this.sceneCursor[this.currentScene][partsName] = 0;
        }
    }
}
