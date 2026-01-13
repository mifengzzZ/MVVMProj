import { MVVMObservable } from "db://assets/framework/shengjibanOne/MVVMObservable";

export enum GameState {
    Idle,
    Playing,
    Result
}

export class MainVM {
    coin = new MVVMObservable(0);

    state = new MVVMObservable<GameState>(GameState.Idle);

    /** 是否正在加载 */
    isLoading = new MVVMObservable<boolean>(true);

    /** 游戏进度 0~1 */
    progress = new MVVMObservable<number>(0);

    /** 开始按钮是否可点击 */
    canStart = new MVVMObservable<boolean>(false);

    onAddCoin() {
        this.coin.value += 10;
    }

    startGame() {
        if (!this.canStart.value) {
            return;
        }
        console.log("Game Start");
    }

    finishLoading() {
        this.isLoading.value = false;
        this.canStart.value = true;
    }

    setProgress(p: number) {
        this.progress.value = Math.min(1, Math.max(0, p));
        if (this.progress.value >= 1) {
            this.canStart.value = false;
        }
    }

}


