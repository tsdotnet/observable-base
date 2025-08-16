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
        define(["require", "exports", "tslib", "./ObservableBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const ObservableBase_1 = tslib_1.__importDefault(require("./ObservableBase"));
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
});
//# sourceMappingURL=ObservableNodeBase.js.map