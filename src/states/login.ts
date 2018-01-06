import TopMenu from '../public/topmenu';
import * as scriptText from '../../resources/scripts/data.txt';
/**
 * 主菜单场景
 * 
 * @export
 * @class Login
 * @extends {Phaser.State}
 */
export default class Login extends Phaser.State {


    topMenugrop: Phaser.Group;
    bgGroup: Phaser.Group;
    menuGroup: Phaser.Group;
    BGM: Phaser.Sound;
    bg: Phaser.Image;
    AlphaLose: number = 1;
    menuBtns: Phaser.Text[];

    constructor() {
        super();
       
    }

    preload() {
        this.bgGroup = this.game.add.group();
        this.menuGroup = this.game.add.group();
        this.topMenugrop = this.game.add.group();
        //顶部菜单
        let topMenu = new TopMenu(this.game);
        this.topMenugrop.add(topMenu.sprite);
    }

    create() {
        let world = this.game.world;
        //背景
        let loginImg = this.bg = this.game.make.image(0, 0, 'login', 100)
        loginImg.width = world.width;
        loginImg.height = world.height;
        this.bgGroup.add(loginImg);
        // 主菜单
        let style = {
            font: '30px Arial',
            fill: 'black',
            align: 'left'
        }
        let menuBtns = [
            { text: '开始游戏', x: world.centerX - 100, y: world.height / 3 * 1.1, style: style, onClick: this.startGame },
            { text: '继续游戏', x: world.centerX - 100, y: world.height / 3 * 1.1 + 30 * 2, style: style, onClick: this.loadGame },
            { text: '结束游戏', x: world.centerX - 100, y: world.height / 3 * 1.1 + 30 * 4, style: style, onClick: this.endGame }
        ];
        this.menuBtns = menuBtns.map((o: any) => {
            let btn = this.game.make.text(o.x, o.y, o.text, o.style);
            btn.inputEnabled = true;
            btn.events.onInputOver.add(mouserOver, this);
            btn.events.onInputOut.add(mouserOut, this);
            btn.events.onInputDown.add(o.onClick, this);
            this.menuGroup.add(btn);
            return btn;
        });
        // 背景音乐
        this.BGM = this.game.add.audio('login', 0.2, true);
        this.BGM.play();
    }
    update() {
        this.bg.alpha *= this.AlphaLose;
        this.BGM.volume *= this.AlphaLose;
    }

    startGame() {
        console.log('start');
        this.AlphaLose = 0.98;
        this.menuBtns.forEach(btn => {
            btn.inputEnabled = false;
        });
        setTimeout(() => {
            this.BGM.destroy();
            this.game.state.start('play');
        }, 2000);
    }

    loadGame() {
        console.log('load');
    }

    endGame() {
        console.log('close');
        // window.close();
    }


}

function mouserOver(font: Phaser.Text, state?: Login) {
    font.fill = '#CF0';
}

function mouserOut(font: Phaser.Text, state?: Login) {
    font.fill = 'black';
}