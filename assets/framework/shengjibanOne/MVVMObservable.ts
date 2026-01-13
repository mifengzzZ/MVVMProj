export type UnBindFn = () => void;

export class MVVMObservable<T> {
    
    private _value: T;
    private listeners = new Set<(v: T) => void>();

    constructor(v: T) {
        this._value = v;
    }

    public get value(): T {
        return this._value;
    }
    
    public set value(v: T) {
        if (this._value === v) {
            return;
        }
        this._value = v;
        this.listeners.forEach(fn => fn(v));
    }

    bind(fn: (v: T) => void): UnBindFn {
        this.listeners.add(fn);
        fn(this._value);
        return () => {
            this.listeners.delete(fn);
        };
    }

    clear() {
        this.listeners.clear();
    }

}


