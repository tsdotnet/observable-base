"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const disposable_1 = require("@tsdotnet/disposable");
const ordered_registry_1 = tslib_1.__importDefault(require("@tsdotnet/ordered-registry"));
const Subscription_1 = tslib_1.__importDefault(require("./Subscription"));
const NAME = 'SubscribableBase';
class SubscribableBase extends disposable_1.DisposableBase {
    constructor() {
        super(NAME);
    }
    subscribe(subscriber) {
        var _a;
        this.throwIfDisposed();
        let s = (_a = this.__subscriptions) === null || _a === void 0 ? void 0 : _a.get(subscriber);
        if (s)
            return s;
        let _s = this.__subscriptions;
        if (!_s)
            this.__subscriptions = _s
                = new ordered_registry_1.default();
        s = new Subscription_1.default(this, subscriber);
        _s.add(subscriber, s);
        return s;
    }
    unsubscribe(subscriber) {
        var _a, _b;
        (_b = (_a = this.__subscriptions) === null || _a === void 0 ? void 0 : _a.remove(subscriber)) === null || _b === void 0 ? void 0 : _b.dispose();
    }
    unsubscribeAll() {
        this._unsubscribeAll();
    }
    _getSubscribers() {
        var _a;
        return (_a = this.__subscriptions) === null || _a === void 0 ? void 0 : _a.map(node => node === null || node === void 0 ? void 0 : node.value.subscriber);
    }
    _unsubscribeAll(returnSubscribers = false) {
        const _s = this.__subscriptions;
        if (!_s)
            return undefined;
        const s = _s.map(n => n.value).toArray();
        const u = returnSubscribers ? s.map(o => o.subscriber) : undefined;
        _s.clear();
        disposable_1.dispose.these.unsafe(s);
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
exports.default = SubscribableBase;
//# sourceMappingURL=SubscribableBase.js.map