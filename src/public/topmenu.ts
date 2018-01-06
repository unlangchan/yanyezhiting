import CONFIG from './config';
import { Sprite } from 'phaser-ce';

export default class TopMenu {

    sprite: Phaser.Sprite;
    onFocus: boolean = false;

    constructor(public game: Phaser.Game) {
        let world = game.world;
        //创建顶部菜单
        let menuBg = this.game.make.bitmapData(world.width, 40);
        menuBg.fill(255, 255, 255, 1);
        let topMenu = this.sprite = this.game.make.sprite(0, 0, menuBg);
        topMenu.alpha = 0;
        topMenu.inputEnabled = true;
        topMenu.events.onInputOver.add(() => {
            this.show();
        }, this);
        topMenu.events.onInputOut.add(() => {
            this.hide();
        }, this);

        // let btnTypes = ['画面']
        let btnTypes = ['画面', '表现形式', '文字速度', '音量', '自动阅读', '版本信息', '退出']
        //画面
        let startX = 0;
        let btn = new BtnOne(this.game, this, '画面', startX);
        startX += btn.width;
        let childs = [{ text: '全屏', selected: false, sort: 0 }, { text: '窗口', selected: true, sort: 1 }];
        btn.childBtns = childs.map(i => {
            let btn2 = new BtnTwo(this.game, btn, i.text, 30 * 2 + 20, i.sort, i.selected);
            return btn2;
        });

        //表现形式
        btn = new BtnOne(this.game, this, '表现形式', startX);
        startX += btn.width;
        childs = [{ text: '单行', selected: false, sort: 0 }, { text: '整页', selected: true, sort: 1 }];
        btn.childBtns = childs.map(i => {
            let btn2 = new BtnTwo(this.game, btn, i.text, 30 * 3 + 20, i.sort, i.selected);
            return btn2;
        });

        //文字速度
        btn = new BtnOne(this.game, this, '文字速度', startX);
        startX += btn.width;
        childs = [
            { text: '慢速', selected: false, sort: 0 },
            { text: '正常', selected: true, sort: 1 },
            { text: '高速', selected: false, sort: 2 }
        ];
        btn.childBtns = childs.map(i => {
            let btn2 = new BtnTwo(this.game, btn, i.text, 30 * 3 + 20, i.sort, i.selected);
            return btn2;
        });

        //音量
        //自动阅读
        btn = new BtnOne(this.game, this, '自动阅读', startX);
        startX += btn.width;
        childs = [{ text: '开启', selected: false, sort: 0 }, { text: '关闭', selected: true, sort: 1 }];
        btn.childBtns = childs.map(i => {
            let btn2 = new BtnTwo(this.game, btn, i.text, 30 * 3 + 20, i.sort, i.selected);
            return btn2;
        });
        
    }


    show() {
        this.sprite.alpha = 1;
    }
    hide() {
        this.sprite.alpha = 0;
    }
}

class BtnOne {

    btn: Phaser.BitmapData;
    sprite: Phaser.Sprite;
    width: number;
    childBtns: BtnTwo[];
    constructor(public game: Phaser.Game, public parent: TopMenu, public text: string, startX: number) {
        let w = this.width = text.length * 20 + 20;
        let btn = this.btn = this.game.make.bitmapData(w, 40);
        this.resetBtnStyle();

        let btnSprite = this.sprite = this.game.make.sprite(startX, 0, btn);
        parent.sprite.addChild(btnSprite);
        btnSprite.inputEnabled = true;
        btnSprite.events.onInputOver.add(() => { this.focus() }, this);
        btnSprite.events.onInputOut.add(() => { this.blur() }, this);
        btnSprite.events.onInputDown.add(() => {
            if (parent.onFocus = !parent.onFocus) {
                this.focus()
            } else {
                this.blur();
            }
        }, this)
    }
    resetBtnStyle() {
        this.btn.ctx.fillStyle = 'black';
        this.btn.ctx.font = '20px Arial';
        this.btn.ctx.fillText(this.text, 10, 28);
    }

    focus() {
        this.parent.show();
        this.btn.clear();
        this.btn.fill(160, 190, 201, 1);
        this.resetBtnStyle();
        if (this.parent.onFocus) {
            this.childBtns.forEach(i => {
                i.show();
            });
        }
    }

    blur() {
        this.parent.hide();
        this.btn.clear();
        this.resetBtnStyle();
        this.childBtns.forEach(i => {
            i.hide();
        })
    }
}

class BtnTwo {

    btn: Phaser.BitmapData;
    sprite: Phaser.Sprite;

    constructor(
        public game: Phaser.Game,
        public parent: BtnOne,
        public text: string,
        public width: number,
        public sort: number,
        public selected: boolean
    ) {
        let btn = this.btn = this.game.make.bitmapData(width, 30);
        let btnSprite = this.sprite = this.game.make.sprite(10, 38 + sort * 30, btn);
        btnSprite.visible = false;
        parent.sprite.addChild(btnSprite);
        if (selected) {
            this.check();
        } else {
            this.uncheck();
        }

    }

    check() {
        this.btn.clear();
        this.btn.fill(215, 215, 216, 1);
        this.btn.ctx.fillStyle = '#808080';
        this.btn.ctx.font = '15px Arial';
        this.btn.ctx.fillText(this.text, 25, 20);
        this.sprite.inputEnabled = false;
        this.sprite.events.onInputDown.removeAll();
        this.sprite.events.onInputOver.removeAll();
        this.sprite.events.onInputOut.removeAll();
    }

    uncheck() {
        this.btn.clear();
        this.btn.fill(242, 238, 237, 1);
        this.resetBtnStyle();
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputOver.add(() => { this.focus() }, this);
        this.sprite.events.onInputOut.add(() => { this.blur() }, this);

    }

    resetBtnStyle() {
        this.btn.ctx.fillStyle = 'black';
        this.btn.ctx.font = '15px Arial';
        this.btn.ctx.fillText(this.text, 25, 20);
    }

    show() {
        this.sprite.visible = true;
    }
    hide() {
        this.sprite.visible = false;
    }

    focus() {
        this.parent.focus();
        this.btn.clear();
        this.btn.fill(130, 178, 219, 1);
        this.resetBtnStyle();
    }

    blur() {
        this.parent.blur();
        this.btn.clear();
        this.btn.fill(242, 238, 237, 1);
        this.resetBtnStyle();
    }
}