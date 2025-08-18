import { ArgumentException } from '@tsdotnet/exceptions';
import SubscribableBase from './SubscribableBase.js';

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
            throw new ArgumentException('subscriber', 'Registering onError or onComplete in addition to an observer is not supported.');
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

export { ObservableBase as default };
//# sourceMappingURL=ObservableBase.js.map
