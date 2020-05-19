/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import DisposableAware from '@tsdotnet/disposable/dist/DisposableAware';
import Subscribable from './Subscribable';
/**
 * A registration that can be disposed in order to cancel publishing to a subscriber.
 */
export default class Subscription<T> implements DisposableAware {
    private _subscribable;
    private _subscriber;
    constructor(_subscribable: Subscribable<T>, _subscriber: T);
    /**
     * The subscribing entity.
     * @return {T}
     */
    get subscriber(): T;
    /**
     * Returns true if already disposed.
     * @return {boolean}
     */
    get wasDisposed(): boolean;
    /**
     * Cancels a subscription.
     */
    dispose: () => void;
}
