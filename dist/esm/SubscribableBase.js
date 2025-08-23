import { DisposableBase, dispose } from '@tsdotnet/disposable';
import OrderedRegistry from '@tsdotnet/ordered-registry';
import Subscription from './Subscription.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class SubscribableBase extends DisposableBase {
    __subscriptions;
    constructor() {
        super();
    }
    subscribe(subscriber) {
        this.assertIsAlive();
        let s = this.__subscriptions?.get(subscriber);
        if (s)
            return s;
        let _s = this.__subscriptions;
        if (!_s)
            this.__subscriptions = _s
                = new OrderedRegistry();
        s = new Subscription(this, subscriber);
        _s.add(subscriber, s);
        return s;
    }
    unsubscribe(subscriber) {
        this.__subscriptions?.remove(subscriber)?.dispose();
    }
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
        _s.clear();
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

export { SubscribableBase as default };
//# sourceMappingURL=SubscribableBase.js.map
