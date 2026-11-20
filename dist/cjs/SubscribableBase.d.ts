/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ExtendedIterable } from '@tsdotnet/collection-base';
import { type Disposable, DisposableBase } from '@tsdotnet/disposable';
export default class SubscribableBase<TSubscriber> extends DisposableBase {
    private __subscriptions;
    constructor();
    subscribe(subscriber: TSubscriber): Disposable;
    unsubscribe(subscriber: TSubscriber): void;
    unsubscribeAll(): void;
    protected _getSubscribers(): ExtendedIterable<TSubscriber> | undefined;
    protected _unsubscribeAll(): undefined;
    protected _unsubscribeAll(returnSubscribers: false): undefined;
    protected _unsubscribeAll(returnSubscribers: true): TSubscriber[] | undefined;
    protected _unsubscribeAll(returnSubscribers: boolean): TSubscriber[] | undefined;
    protected _onDispose(): void;
}
