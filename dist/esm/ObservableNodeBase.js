/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
import ObservableBase from './ObservableBase';
/**
 * Base class for creating observable chains.
 */
export default class ObservableNodeBase extends ObservableBase {
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
//# sourceMappingURL=ObservableNodeBase.js.map