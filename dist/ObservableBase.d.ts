/**
 * @packageDocumentation
 * @module observable-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
import { Action, Closure } from '@tsdotnet/common-interfaces';
import Disposable from '@tsdotnet/disposable/dist/Disposable';
import Observable from './Observable';
import Observer from './Observer';
import SubscribableBase from './SubscribableBase';
export default abstract class ObservableBase<T> extends SubscribableBase<Observer<T>> implements Observable<T> {
    subscribe(subscriber: Observer<T>): Disposable;
    subscribe(subscriber: Action<T>, onError?: Action<any>, onCompleted?: Closure): Disposable;
    protected _onNext(value: T): void;
    protected _onError(error: any): void;
    protected _onCompleted(): void;
}
