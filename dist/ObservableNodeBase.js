"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ObservableBase_1 = (0, tslib_1.__importDefault)(require("./ObservableBase"));
/**
 * Base class for creating observable chains.
 */
class ObservableNodeBase extends ObservableBase_1.default {
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
exports.default = ObservableNodeBase;
//# sourceMappingURL=ObservableNodeBase.js.map