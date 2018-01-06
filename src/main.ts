import 'p2';
import 'pixi';
import 'phaser';

//导入场景文件
import Boot from './states/boot';
import Preload from './states/preload';
import Login from './states/login';
import Play from './states/play';

window.onload = () => {
    //创建游戏容器
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');

    //添加场景至game对象
    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('login', Login);
    game.state.add('play', Play);

    //跳转至引导场景
    game.state.start('boot');
}