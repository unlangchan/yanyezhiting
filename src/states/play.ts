import TopMenu from '../public/topmenu';
import Config from '../public/config';
import * as scriptText from '../../resources/scripts/data.txt';

/**
 * 剧情场景
 * 
 * @export
 * @class Play
 * @extends {Phaser.State}
 */
export default class Play extends Phaser.State {

    topMenugrop: Phaser.Group;
    sceneGroup: Phaser.Group;
    plotGroup: Phaser.Group;
    topMenu: TopMenu;

    BGM: Phaser.Sound;
    nextBGM: Phaser.Sound;
    preScene: Phaser.Image;
    nowScene: Phaser.Image;
    nextScene: Phaser.Image;
    pointerDownHoldTime: number = 0;
    menuStatus: boolean = false;
    scriptText: string;

    _loader: Phaser.Loader;
    constructor() {
        super();

    }

    preload() {
        this.sceneGroup = this.game.add.group();
        this.plotGroup = this.game.add.group();
        this.topMenugrop = this.game.add.group();
        //顶部菜单
        let topMenu = this.topMenu = new TopMenu(this.game);

        this.topMenugrop.add(topMenu.sprite);
        this._loader = new Phaser.Loader(this.game);
        this.scriptText = scriptText;
        this.game.load.image('男主独白1', 'resources/男主独白1.jpg');
        this.game.load.image('男主独白2', 'resources/男主独白2.jpg');
        this.game.load.image('男主独白3', 'resources/男主独白3.jpg');
        this.game.load.audio('独白', 'resources/独白.ogg');
        this._loader.onFileComplete.add(function () {
            console.log(arguments)
        }, this);
        
    }

    create() {
        this.play(Config.startID);

        this.nowScene = this.game.make.image(0, 0, '男主独白1', 100);
        this.nextScene = this.game.make.image(0, 0, '男主独白2', 100);
        this.nextScene.alpha = 0;
        this.BGM = this.game.add.audio('独白', 0.2, true);
        this.sceneGroup.add(this.nowScene);
        this.sceneGroup.add(this.nextScene);
    }

    update() {
        if (!this.menuStatus) {
            if (this.game.input.activePointer.isDown) {
                this.pointerDownHoldTime++;

            } else if (this.pointerDownHoldTime > 1 && this.pointerDownHoldTime < 60) {
                //按键一次
                this.pointerDownHoldTime = 0;
                this.tonNextScene();

            }

            if (this.pointerDownHoldTime >= 60) {
                //长按2秒呼出菜单
                console.log('呼出菜单');
                this.pointerDownHoldTime = 0;
                this.menuStatus = true;
                this.topMenu.show();
            }
        }
        if (this.nowScene.alpha < 1) {
            this.nowScene.alpha += 1 / 60;
        }
    }

    tonNextScene() {
        if (this.preScene) {
            this.sceneGroup.remove(this.preScene);
        }
        this.preScene = this.nowScene;
        this.nowScene = null;
        this.nowScene = this.nextScene;

    }

    play(index) {
        let str: String = this.scriptText.charAt(index);
        if (str === "#") {//图片资源
            index = index + 2;//去掉图片名称前面的‘ #“ ’符号 
            var imgStr = '';
            str = this.scriptText.charAt(index);
            while (str !== '"') {
                imgStr += str;
                str = this.scriptText.charAt(++index);
            }
            index = index + 3;//去掉图片后面面的‘ “, ’符号和代号2;

        }
        console.log(imgStr)
        this._loader.image(imgStr, `resources/${imgStr}`);
        this._loader.start();
    }


}
