/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@tsdotnet/exceptions", "./SubscribableBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const exceptions_1 = require("@tsdotnet/exceptions");
    const SubscribableBase_1 = tslib_1.__importDefault(require("./SubscribableBase"));
    // Can be used as a base class, mixin, or simply reference on how to implement the pattern.
    class ObservableBase extends SubscribableBase_1.default {
        subscribe(subscriber, onError, onCompleted) {
            if (typeof subscriber == 'function') {
                return super.subscribe({
                    onNext: subscriber,
                    onError: onError,
                    onCompleted: onCompleted
                });
            }
            if (onError || onCompleted)
                throw new exceptions_1.ArgumentException('subscriber', 'Registering onError or onComplete in addition to an observer is not supported.');
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
    exports.default = ObservableBase;
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
                // Don't let one error prevent others from receiving information.
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
});
//# sourceMappingURL=ObservableBase.js.map