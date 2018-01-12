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
    startID: number;
    plots: any[] = [];
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
        this.startID = Config.startID;
        for (let i = 0; i < 10; i++) {
            let rel = this.getPlot(this.startID);
            this.startID = rel.index;
            this.plots.push(rel.plot);
        }
        this.plots.filter(i => i.type !== 'text' && !i.load)
            .forEach(i => {
                if (i.type === 'image') {
                    this.game.load.image(i.url, `./resources/${i.url}`);
                } else if (i.type === 'bgm') {
                    this.game.load.audio(i.url, `./resources/${i.url}`);
                }
            });
        this.game.load.onFileComplete.add((a, key, isload, d, e) => {
            if (isload) {
                this.plots.filter(i => i.type !== 'text' && i.url === key)
                    .forEach(i => { i.load = true });
            }
        });

    }

    create() {
        console.log(this.plots);
        // this.nowScene = this.game.make.image(0, 0, '男主独白1', 100);
        // this.nextScene = this.game.make.image(0, 0, '男主独白2', 100);
        // this.nextScene.alpha = 0;
        // this.BGM = this.game.add.audio('独白', 0.2, true);
        // this.sceneGroup.add(this.nowScene);
        // this.sceneGroup.add(this.nextScene);
    }

    update() {
        // if (!this.menuStatus) {
        //     if (this.game.input.activePointer.isDown) {
        //         this.pointerDownHoldTime++;

        //     } else if (this.pointerDownHoldTime > 1 && this.pointerDownHoldTime < 60) {
        //         //按键一次
        //         this.pointerDownHoldTime = 0;
        //         this.tonNextScene();

        //     }

        //     if (this.pointerDownHoldTime >= 60) {
        //         //长按2秒呼出菜单
        //         console.log('呼出菜单');
        //         this.pointerDownHoldTime = 0;
        //         this.menuStatus = true;
        //         this.topMenu.show();
        //     }
        // }
        // if (this.nowScene.alpha < 1) {
        //     this.nowScene.alpha += 1 / 60;
        // }
    }
    
    _pvtpreload(){

    }

    tonNextScene() {
        if (this.preScene) {
            this.sceneGroup.remove(this.preScene);
        }
        this.preScene = this.nowScene;
        this.nowScene = null;
        this.nowScene = this.nextScene;

    }

    toNextPlot() {
      this.plots.push()
    }

    getPlot(index) {
        let plot;
        let str: String = this.scriptText.charAt(index);
        if (str === '#') {//图片资源
            index = index + 2;//去掉图片名称前面的‘ #“ ’符号 
            var imgStr = '';
            str = this.scriptText.charAt(index);
            while (str !== '"') {
                imgStr += str;
                str = this.scriptText.charAt(++index);
            }
            index = index + 3;//去掉图片后面面的‘ “, ’符号和代号2;
            plot = { type: 'image', url: `${imgStr}`, load: false };
        } else if (str === '$') {
            index = index + 2;
            var bgmStr = '';
            str = this.scriptText.charAt(index);
            while (str !== '"') {
                bgmStr += str;
                str = this.scriptText.charAt(++index);
            }
            index++;
            plot = { type: 'bgm', url: `${bgmStr}`, load: false };
        } else {
            var textStr = '';
            while (str !== '/') {
                textStr += str;
                str = this.scriptText.charAt(++index);
            }
            index++;
            plot = { type: 'text', contents: textStr.split('@') };
        }
        return { plot: plot, index: index }
    }


}