import { _decorator, Button, Component, Label, Node, ProgressBar } from 'cc';
import { bindActive, bindButton, bindInteractable, bindLabel, bindProgress } from 'db://assets/framework/shengjibanOne/MVVMBind';
import { MVVMView } from 'db://assets/framework/shengjibanOne/MVVMView';
import { GameState, MainVM } from './MainVM';
const { ccclass, property } = _decorator;

// MainPanel 里面有MainCom实例和Service
// MainView当成MainCom
// VM当成本地Model

@ccclass('MainView')
export class MainView extends MVVMView<MainVM> {

    ceshi: number = 100;
    
    @property(Label)
    @bindLabel('coin')
    coinLabel!: Label;

    @property(Button)
    @bindButton('onAddCoin')
    addCoinBtn!: Button;

    @property(Node)
    @bindActive('isLoading')
    loadingN!: Node;

    @property(ProgressBar)
    @bindProgress('progress')
    progress!: ProgressBar;

    @property(Button)
    @bindInteractable('canStart')
    startBtn!: Button;

    @property(Button)
    @bindButton('startGame')
    startBtnClick!: Button;

    protected start(): void {
        this.bind(new MainVM());

        this._vm.setProgress(0.5);
        // this._vm.finishLoading();

        this._vm.state.bind(state => {
            switch (state) {
                case GameState.Idle:
                    
                    break;
                case GameState.Playing:
                    
                    break;

                case GameState.Result:
                    break;
            }
        });

    }

}


