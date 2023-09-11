"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoScene = void 0;
var message_box_1 = require("../message-box");
var DemoScene = /** @class */ (function (_super) {
    __extends(DemoScene, _super);
    function DemoScene() {
        var _this = _super.call(this, { key: "DemoScene" }) || this;
        _this.sceneSprite = [];
        // startシーンから開始
        _this.currentScene = 'start';
        _this.sceneCursor = [];
        // TODO プロダクトではシーン、パーツはオブジェクトに保持し、状態管理する
        // シーン -1:n- パーツ
        _this.initAllSceneCursor();
        return _this;
    }
    DemoScene.prototype.preload = function () {
        console.log(window.scenes);
        for (var _i = 0, _a = window.scenes['_assets']; _i < _a.length; _i++) {
            var assets = _a[_i];
            this.load.image(assets.split('.')[0], "./assets/" + assets);
            console.log("./assets/" + assets);
        }
    };
    DemoScene.prototype.create = function () {
        // 背景 main パーツ
        var partScript = window.scenes[this.currentScene]['main'];
        this.sceneSprite['main'] = this.add.sprite(0, 0, partScript['image']).setOrigin(0, 0);
        // 背景(main)以外のパーツ
        for (var partsName in window.scenes[this.currentScene]) {
            if (partsName === 'main')
                continue;
            var partScript_1 = window.scenes[this.currentScene][partsName];
            console.log('part', partsName);
            // image 指定があるときのみ作画
            if (typeof partScript_1['image'] !== 'undefined') {
                console.log('part_image', partsName);
                var partPosition = partScript_1['position'];
                this.sceneSprite[partsName] = this.add.sprite(partPosition[0], partPosition[1], partScript_1['image']).setOrigin(0, 0);
            }
        }
        this.msgBox = new message_box_1.MessageBox(this);
        this.msgBox.show(this.nextMessage('main'));
        this.input.on('pointerdown', this.pointerdown, this);
    };
    DemoScene.prototype.pointerdown = function (pointer) {
        var targetParts = this.getTargetParts(pointer);
        console.log('>>', targetParts);
        var message = this.nextMessage(targetParts);
        console.log(">", message);
        if (message === null) {
            this.msgBox.hide();
            return;
        }
        this.msgBox.show(message);
    };
    // パーツ(target)指定で次のアクション実行
    // @return 表示メッセージ
    DemoScene.prototype.nextMessage = function (target) {
        var sceneScript = window.scenes[this.currentScene][target]['script'];
        for (var cursor = this.sceneCursor[this.currentScene][target]; cursor < sceneScript.length; cursor++) {
            var line = sceneScript[cursor];
            // パーツ表示制御
            if (line[0] === 'IMAGE_HIDE') {
                this.sceneSprite[target].destroy();
            }
            // message
            if (line[0] === '') {
                this.sceneCursor[this.currentScene][target]++;
                return line[1];
            }
        }
        return null;
    };
    // クリック位置からパーツを特定
    DemoScene.prototype.getTargetParts = function (pointer) {
        var touchX = pointer.downX;
        var touchY = pointer.downY;
        console.log('x=' + touchX + ', y=' + touchY);
        for (var partsName in window.scenes[this.currentScene]) {
            var positons = window.scenes[this.currentScene][partsName]['position'];
            if (typeof positons === 'undefined')
                continue;
            if (pointer.x >= positons[0] &&
                pointer.y >= positons[1] &&
                pointer.x <= (positons[0] + positons[2]) &&
                pointer.y <= (positons[1] + positons[3])) {
                return partsName;
            }
        }
        return 'main';
    };
    // 全てのシーン内オブジェクトのカーソル位置初期化
    // TODO プロダクトではシーン、パーツをオブジェクトで管理。パーツの状態でアクティブやカーソル管理
    // DEMO 現在はカレントシーンのみ初期化
    DemoScene.prototype.initAllSceneCursor = function () {
        this.sceneCursor[this.currentScene] = [];
        for (var partsName in window.scenes[this.currentScene]) {
            this.sceneCursor[this.currentScene][partsName] = 0;
        }
    };
    return DemoScene;
}(Phaser.Scene));
exports.DemoScene = DemoScene;
