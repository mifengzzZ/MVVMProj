import { Observable } from 'db://assets/framework/jianyiban/Observable';

export class MainViewModel {
    // ====== UI状态 ======
    coin = new Observable<number>(0);
    level = new Observable<number>(1);
    isButtonEnabled = new Observable<boolean>(true);

    // ====== 行为 ======
    onClickAddCoin() {
        this.coin.value += 10;
    }

    onClickNextLevel() {
        this.level.value++;
    }

}


