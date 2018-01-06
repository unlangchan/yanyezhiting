/**
 * 预加载场景
 * 
 * @export
 * @class Preload
 * @extends {Phaser.State}
 */
export default class Preload extends Phaser.State {
    constructor() {
        super();
    }

    preload() {

        //添加进度条,并将其设为进度条精灵
        var preloadSprite = this.game.add.sprite(10, this.game.height / 2, 'loading');
        this.game.load.setPreloadSprite(preloadSprite);

        //加载系统资源
        this.game.load.image('login', 'resources/system/login.jpg');
        this.game.load.audio('login', 'resources/system/login.ogg');
    }

    create() {
        //跳转至主菜单
        // this.game.state.start('login');
        this.game.state.start('play');
    }
}
