/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { DisposableBase, dispose } from '@tsdotnet/disposable';
import OrderedRegistry from '@tsdotnet/ordered-registry';
import Subscription from './Subscription';
const NAME = 'SubscribableBase';
/**
 * Base class for implementing any subscribable class that expects `Disposable` for releasing subscriptions.
 */
export default class SubscribableBase extends DisposableBase {
    __subscriptions;
    constructor() {
        super(NAME);
    }
    // It is possible that the same observer could call subscribe more than once and therefore we need to retain a single instance of the subscriber.
    /**
     * Accepts `TSubscriber` (observer) and returns a `Subscription` that can be disposed of.
     * The dispose method is scope independent and can be called out of context and still cancel the subscription.
     * @param {TSubscriber} subscriber
     * @return {Disposable}
     */
    subscribe(subscriber) {
        this.throwIfDisposed();
        let s = this.__subscriptions?.get(subscriber);
        if (s)
            return s; // Ensure only one instance of the existing subscription exists.
        let _s = this.__subscriptions;
        if (!_s)
            this.__subscriptions = _s
                = new OrderedRegistry();
        s = new Subscription(this, subscriber);
        _s.add(subscriber, s);
        return s;
    }
    /**
     * Unsubscribes the `TSubscriber` (observer).
     * @param {TSubscriber} subscriber
     */
    unsubscribe(subscriber) {
        this.__subscriptions?.remove(subscriber)?.dispose();
    }
    /**
     * Cancels (disposes) all subscriptions.
     */
    unsubscribeAll() {
        this._unsubscribeAll();
    }
    _getSubscribers() {
        return this.__subscriptions?.map(node => node?.value.subscriber);
    }
    _unsubscribeAll(returnSubscribers = false) {
        const _s = this.__subscriptions;
        if (!_s)
            return undefined;
        const s = _s.map(n => n.value).toArray();
        const u = returnSubscribers ? s.map(o => o.subscriber) : undefined;
        _s.clear(); // Reset...
        dispose.these.unsafe(s);
        return u;
    }
    _onDispose() {
        super._onDispose();
        this._unsubscribeAll();
        const s = this.__subscriptions;
        this.__subscriptions = undefined;
        s?.dispose();
    }
}
//# sourceMappingURL=SubscribableBase.js.map