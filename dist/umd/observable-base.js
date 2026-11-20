(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/exceptions'), require('@tsdotnet/disposable'), require('@tsdotnet/ordered-registry')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/exceptions', '@tsdotnet/disposable', '@tsdotnet/ordered-registry'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.observableBase = global.tsdotnet.observableBase || {}), global.tsdotnet.exceptions, global.tsdotnet.disposable, global.tsdotnet.orderedRegistry));
})(this, (function (exports, exceptions, disposable, OrderedRegistry) { 'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var OrderedRegistry__default = /*#__PURE__*/_interopDefault(OrderedRegistry);

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class Subscription {
        _subscribable;
        _subscriber;
        constructor(_subscribable, _subscriber) {
            this._subscribable = _subscribable;
            this._subscriber = _subscriber;
            if (!_subscribable || !_subscriber)
                throw 'Subscribable and subscriber cannot be null.';
        }
        get subscriber() {
            return this._subscriber;
        }
        get wasDisposed() {
            return !this._subscribable || !this._subscriber;
        }
        dispose = () => {
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
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class SubscribableBase extends disposable.DisposableBase {
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
                    = new OrderedRegistry__default.default();
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
            disposable.dispose.these.unsafe(s);
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

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
     */
    class ObservableBase extends SubscribableBase {
        subscribe(subscriber, onError, onCompleted) {
            if (typeof subscriber == 'function') {
                return super.subscribe({
                    onNext: subscriber,
                    onError: onError,
                    onCompleted: onCompleted
                });
            }
            if (onError || onCompleted)
                throw new exceptions.ArgumentException('subscriber', 'Registering onError or onComplete in addition to an observer is not supported.');
            return super.subscribe(subscriber);
        }
        _onNext(value) {
            processAction(this._getSubscribers()?.toArray(), s => { if (s.onNext)
                s.onNext(value); });
        }
        _onError(error) {
            processAction(this._getSubscribers()?.toArray(), s => { if (s.onError)
                s.onError(error); });
        }
        _onCompleted() {
            processAction(this._unsubscribeAll(true), s => { if (s.onCompleted)
                s.onCompleted(); });
        }
    }
    const OBSERVER_ERROR_MESSAGE = 'One or more observers had errors when attempting to pass information.';
    function processAction(observers, handler) {
        if (!observers)
            return;
        let observersErrors = null;
        for (const s of observers) {
            try {
                handler(s);
            }
            catch (ex) {
                observersErrors = observersErrors || [];
                observersErrors.push({ observer: s, ex: ex });
            }
        }
        observers.length = 0;
        if (observersErrors && observersErrors.length) {
            if (console && console.error)
                console.error(OBSERVER_ERROR_MESSAGE, observersErrors);
            else
                throw {
                    message: OBSERVER_ERROR_MESSAGE,
                    errors: observersErrors
                };
        }
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
     */
    class ObservableNodeBase extends ObservableBase {
        onNext(value) {
            this._onNext(value);
        }
        onError(error) {
            this._onError(error);
        }
        onCompleted() {
            this._onCompleted();
        }
    }

    exports.ObservableBase = ObservableBase;
    exports.ObservableNodeBase = ObservableNodeBase;
    exports.SubscribableBase = SubscribableBase;

}));
//# sourceMappingURL=observable-base.js.map
