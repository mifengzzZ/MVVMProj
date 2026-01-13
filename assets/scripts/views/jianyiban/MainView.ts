import { _decorator, Button, Component, Label, Node } from 'cc';
import { MainViewModel } from './MainViewModel';
const { ccclass, property } = _decorator;

@ccclass('MainView')
export class MainView extends Component {
    
    @property(Label)
    coinLb!: Label;

    @property(Label)
    levelLb!: Label;

    @property(Button)
    addCoinBtn!: Button;

    private _vm!: MainViewModel;

    start() {
        this._vm = new MainViewModel();

        // ====== 数据绑定 ======
        this._vm.coin.subscribe(v => {
            this.coinLb.string = `金币：${v}`;
        });
        this._vm.level.subscribe(v => {
            this.levelLb.string = `关卡：${v}`;
        });
        this._vm.isButtonEnabled.subscribe(v => {
            this.addCoinBtn.interactable = v;
        });

        // ====== 事件绑定 ======
        this.addCoinBtn.node.on(Button.EventType.CLICK, () => {
            this._vm.onClickAddCoin();
        });

    }

    update(deltaTime: number) {
        
    }
}


