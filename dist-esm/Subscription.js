/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * A registration that can be disposed in order to cancel publishing to a subscriber.
 */
export default class Subscription {
    constructor(_subscribable, _subscriber) {
        this._subscribable = _subscribable;
        this._subscriber = _subscriber;
        /**
         * Cancels a subscription.
         */
        this.dispose = () => {
            const subscriber = this.subscriber;
            const subscribable = this._subscribable;
            // Release this reference.  It will prevent potential unwanted recursion.
            this._subscribable = null;
            try {
                if (subscriber && subscribable) {
                    subscribable.unsubscribe(subscriber);
                }
            }
            finally {
                // Keep this reference until the end so it might be identified.
                this._subscriber = null;
            }
        };
        if (!_subscribable || !_subscriber)
            throw 'Subscribable and subscriber cannot be null.';
    }
    /**
     * The subscribing entity.
     * @return {T}
     */
    get subscriber() {
        return this._subscriber;
    }
    /*
     In the case where we could possibly have the following happen:

     var u = observable.subscribe(observer);

     ...

     u.dispose(); // Should only be allowed to unsubscribe once and then it's useless.

     // Resubscribing creates a new instance.
     var x = observable.subscribe(observer);

     u.dispose(); // Calling this again should do nothing and 'x' should still work.
     */
    /**
     * Returns true if already disposed.
     * @return {boolean}
     */
    get wasDisposed() {
        return !this._subscribable || !this._subscriber;
    }
}
//# sourceMappingURL=Subscription.js.map