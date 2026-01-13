
export const MVVM_BINDINGS_KEY = Symbol('MVVM_Bindings');

export type MVVMBindingInfo = {
    type:
        | 'label' | 'button' | 'progressBar'
        | 'active'| 'interactable';
    /** Observable */
    vmKey?: string;
    /** UI 字段 */
    viewKey?: string;
    /** VM 方法 */
    vmMethod?: string;
}

function pushBinding(target: any, info: MVVMBindingInfo) {
    if (!target[MVVM_BINDINGS_KEY]) {
        target[MVVM_BINDINGS_KEY] = [];
    }
    target[MVVM_BINDINGS_KEY].push(info);
    // console.warn("添加绑定", target);
}

// @bindLabel('coin')     // <-- 在这里触发装饰器
// coinLabel: Label;      // 编译器自动提取 'coinLabel' 作为 propertyKey
export function bindLabel(vmKey: string) {
    // console.warn("bindLabel : ", vmKey);
    // 一次性设置：
        // 装饰器只需要在类定义时执行一次
        // 所有实例共享相同的绑定配置

    // 继承支持：
        // 子类原型继承父类的绑定信息
        // 同时可以添加自己的绑定配置

    // 存储绑定信息
        // 在原型上存储绑定配置 [MVVM_BINDINGS_KEY]
        // 运行时通过 Object.getPrototypeOf(instance) 访问
    
    // target 是 MVVMView 的子类原型，这样装饰器才能在类定义阶段就把绑定信息存储到原型上，供后续的所有实例使用。
    return function (target: any, propertyKey: string) {
        // console.warn("target : ", target);
        // console.warn("propertyKey : ", propertyKey);
        pushBinding(target, {
            type: 'label',
            vmKey,
            viewKey: propertyKey
        });
    };
}

export function bindButton(vmMethod: string) {
    return function (target: any, propertyKey: string) {
        pushBinding(target, {
            type: 'button',
            viewKey: propertyKey,
            vmMethod: vmMethod
        });
    }
}

export function bindActive(vmKey: string) {
    return function (target: any, propertyKey: string) {
        pushBinding(target, {
            type: 'active',
            vmKey,
            viewKey: propertyKey
        });
    }
}

export function bindProgress(vmKey: string) {
    return function (target: any, propertyKey: string) {
        pushBinding(target, {
            type: 'progressBar',
            vmKey,
            viewKey: propertyKey
        });
    };
}

export function bindInteractable(vmKey: string) {
    return function (target: any, propertyKey: string) {
        pushBinding(target, {
            type: 'interactable',
            vmKey,
            viewKey: propertyKey
        });
    };
}