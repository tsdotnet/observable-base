/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
import ObservableBase from './ObservableBase.js';
import type Observer from './Observer.js';
export default class ObservableNodeBase<T> extends ObservableBase<T> implements Observer<T> {
    onNext(value: T): void;
    onError(error: unknown): void;
    onCompleted(): void;
}
