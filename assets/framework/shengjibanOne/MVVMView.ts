import { _decorator, Button, Component, Label } from 'cc';
import { MVVMObservable, UnBindFn } from './MVVMObservable';
import { MVVMBindingInfo, MVVM_BINDINGS_KEY } from './MVVMBind';

export abstract class MVVMView<VM> extends Component {
    
    protected _vm!: VM;
    private unbinds: UnBindFn[] = [];

    bind(vm: VM) {
        this._vm = vm;
        this.autoBind();
    }

    private autoBind() {
        // 返回指定对象的原型（即其构造函数的 prototype 属性）
        // this：指向当前的 MVVMView 实例对象
        // proto：存储当前实例的原型对象引用
        const proto = Object.getPrototypeOf(this);
        const binds: MVVMBindingInfo[] = proto[MVVM_BINDINGS_KEY] || [];
        binds.forEach(info => {
            switch (info.type) {
                case 'label':
                    this.bindLabel(info);
                    break;
                case 'button':
                    this.bindButton(info);
                    break;
                case 'active':
                    this.bindActive(info);
                    break;
                case 'progressBar':
                    this.bindProgress(info);
                    break;
                case 'interactable':
                    this.bindInteractable(info);
                    break;
            }
        });
    }

    private bindLabel(info: MVVMBindingInfo) {
        const label = (this as any)[info.viewKey] as Label;
        const observable = (this._vm as any)[info.vmKey] as MVVMObservable<any>;

        if (!label || !observable) {
            return;
        }

        const unbind = observable.bind(v => {
            label.string = String(v);
        });

        this.unbinds.push(unbind);
    }

    private bindButton(info: MVVMBindingInfo) {
        const btn = (this as any)[info.viewKey] as Button;
        const method = (this._vm as any)[info.vmMethod!];

        if (!btn || !method) {
            return;
        }

        const handler = method.bind(this._vm);
        btn.node.on(Button.EventType.CLICK, handler);

        this.unbinds.push(() => {
            btn.node.off(Button.EventType.CLICK, handler);
        });
    }

    private bindActive(info: MVVMBindingInfo) {
        const node = (this as any)[info.viewKey];
        const obs = (this._vm as any)[info.vmKey];

        this.unbinds.push(
            obs.bind((v: boolean) => {
                node.active = v;
            })
        );
    }

    private bindProgress(info: MVVMBindingInfo) {
        const bar = (this as any)[info.viewKey];
        const obs = (this._vm as any)[info.vmKey];

        this.unbinds.push(
            obs.bind((v: number) => {
                bar.progress = v;
            })
        );
    }

    private bindInteractable(info: MVVMBindingInfo) {
        const btn = (this as any)[info.viewKey];
        const obs = (this._vm as any)[info.vmKey];

        this.unbinds.push(
            obs.bind((v: boolean) => {
                btn.interactable = v;
            })
        );
    }

    protected onDestroy(): void {
        this.unbinds.forEach(fn => fn());
        this.unbinds.length = 0;
    }

}


