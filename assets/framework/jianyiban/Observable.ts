export type Listener<T> = (value: T) => void;

export class Observable<T> {
    
    private _value: T;
    private listener: Listener<T>[] = [];

    constructor(value: T) {
        this._value = value;
    }
    
    public get value(): T {
        return this._value;
    }
    
    public set value(v: T) {
        if (this._value === v) {
            return;
        }
        this._value = v;
        this.notify();
    }

    subscribe(listener: Listener<T>) {
        this.listener.push(listener);
        // 立即同步一次
        listener(this._value);
    }
    
    unsubscribe(listener: Listener<T>) {
        const i = this.listener.indexOf(listener);
        if (i >= 0) {
            this.listener.splice(i, 1);
        }
    }

    private notify() {
        for (const l of this.listener) {
            l(this._value);
        }
    }

}


