/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ExtendedIterable } from '@tsdotnet/collection-base';
import { DisposableBase } from '@tsdotnet/disposable';
import Disposable from '@tsdotnet/disposable/dist/Disposable';
/**
 * Base class for implementing any subscribable class that expects `Disposable` for releasing subscriptions.
 */
export default class SubscribableBase<TSubscriber> extends DisposableBase {
    private __subscriptions;
    constructor();
    /**
     * Accepts `TSubscriber` (observer) and returns a `Subscription` that can be disposed of.
     * The dispose method is scope independent and can be called out of context and still cancel the subscription.
     * @param {TSubscriber} subscriber
     * @return {Disposable}
     */
    subscribe(subscriber: TSubscriber): Disposable;
    /**
     * Unsubscribes the `TSubscriber` (observer).
     * @param {TSubscriber} subscriber
     */
    unsubscribe(subscriber: TSubscriber): void;
    /**
     * Cancels (disposes) all subscriptions.
     */
    unsubscribeAll(): void;
    protected _getSubscribers(): ExtendedIterable<TSubscriber> | undefined;
    protected _unsubscribeAll(): undefined;
    protected _unsubscribeAll(returnSubscribers: false): undefined;
    protected _unsubscribeAll(returnSubscribers: true): TSubscriber[] | undefined;
    protected _unsubscribeAll(returnSubscribers: boolean): TSubscriber[] | undefined;
    protected _onDispose(): void;
}
