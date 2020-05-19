/**
 * @packageDocumentation
 * @module observable-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { DisposableBase } from '@tsdotnet/disposable';
import dispose from '@tsdotnet/disposable/dist/dispose';
import OrderedRegistry from '@tsdotnet/ordered-registry';
import Subscription from './Subscription';
const NAME = 'SubscribableBase';
/**
 * Base class for implementing any subscribable class that expects `Disposable` for releasing subscriptions.
 */
export default class SubscribableBase extends DisposableBase {
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
        var _a;
        const _ = this;
        _.throwIfDisposed();
        let s = (_a = this.__subscriptions) === null || _a === void 0 ? void 0 : _a.get(subscriber);
        if (s)
            return s; // Ensure only one instance of the existing subscription exists.
        let _s = _.__subscriptions;
        if (!_s)
            _.__subscriptions = _s
                = new OrderedRegistry();
        s = new Subscription(_, subscriber);
        _s.add(subscriber, s);
        return s;
    }
    /**
     * Unsubscribes the `TSubscriber` (observer).
     * @param {TSubscriber} subscriber
     */
    unsubscribe(subscriber) {
        var _a, _b;
        (_b = (_a = this.__subscriptions) === null || _a === void 0 ? void 0 : _a.remove(subscriber)) === null || _b === void 0 ? void 0 : _b.dispose();
    }
    /**
     * Cancels (disposes) all subscriptions.
     */
    unsubscribeAll() {
        this._unsubscribeAll();
    }
    _getSubscribers() {
        var _a;
        return (_a = this.__subscriptions) === null || _a === void 0 ? void 0 : _a.map(node => node === null || node === void 0 ? void 0 : node.value.subscriber);
    }
    _unsubscribeAll(returnSubscribers = false) {
        const _ = this;
        const _s = _.__subscriptions;
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
        s === null || s === void 0 ? void 0 : s.dispose();
    }
}
//# sourceMappingURL=SubscribableBase.js.map