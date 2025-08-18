/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import type { DisposableAware } from '@tsdotnet/disposable';
import type Subscribable from './Subscribable';
export default class Subscription<T> implements DisposableAware {
    private _subscribable;
    private _subscriber;
    constructor(_subscribable: Subscribable<T>, _subscriber: T);
    get subscriber(): T;
    get wasDisposed(): boolean;
    dispose: () => void;
}
