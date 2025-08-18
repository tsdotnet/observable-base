import ObservableBase from './ObservableBase.js';

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

export { ObservableNodeBase as default };
//# sourceMappingURL=ObservableNodeBase.js.map
