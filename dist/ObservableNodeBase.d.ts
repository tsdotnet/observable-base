/**
 * @packageDocumentation
 * @module observable-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
import Observer from './Observer';
import ObservableBase from './ObservableBase';
/**
 * Base class for creating observable chains.
 */
export default class ObservableNodeBase<T> extends ObservableBase<T> implements Observer<T> {
    onNext(value: T): void;
    onError(error: any): void;
    onCompleted(): void;
}
