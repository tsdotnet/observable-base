"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Subscription {
    constructor(_subscribable, _subscriber) {
        this._subscribable = _subscribable;
        this._subscriber = _subscriber;
        this.dispose = () => {
            const subscriber = this.subscriber;
            const subscribable = this._subscribable;
            this._subscribable = null;
            try {
                if (subscriber && subscribable) {
                    subscribable.unsubscribe(subscriber);
                }
            }
            finally {
                this._subscriber = null;
            }
        };
        if (!_subscribable || !_subscriber)
            throw 'Subscribable and subscriber cannot be null.';
    }
    get subscriber() {
        return this._subscriber;
    }
    get wasDisposed() {
        return !this._subscribable || !this._subscriber;
    }
}
exports.default = Subscription;
//# sourceMappingURL=Subscription.js.map