/**
 * @packageDocumentation
 * @module observable-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {ExtendedIterable} from '@tsdotnet/collection-base';
import {DisposableBase} from '@tsdotnet/disposable';
import Disposable from '@tsdotnet/disposable/dist/Disposable';
import dispose from '@tsdotnet/disposable/dist/dispose';
import OrderedRegistry from '@tsdotnet/ordered-registry';
import Subscription from './Subscription';

const NAME = 'SubscribableBase';

/**
 * Base class for implementing any subscribable class that expects `Disposable` for releasing subscriptions.
 */
export default class SubscribableBase<TSubscriber>
	extends DisposableBase
{
	private __subscriptions: OrderedRegistry<TSubscriber, Subscription<TSubscriber>> | undefined;

	constructor ()
	{
		super(NAME);
	}

	// It is possible that the same observer could call subscribe more than once and therefore we need to retain a single instance of the subscriber.

	/**
	 * Accepts `TSubscriber` (observer) and returns a `Subscription` that can be disposed of.
	 * The dispose method is scope independent and can be called out of context and still cancel the subscription.
	 * @param {TSubscriber} subscriber
	 * @return {Disposable}
	 */
	subscribe (subscriber: TSubscriber): Disposable
	{
		const _ = this;
		_.throwIfDisposed();

		let s = this.__subscriptions?.get(subscriber);
		if(s) return s; // Ensure only one instance of the existing subscription exists.

		let _s = _.__subscriptions;
		if(!_s) _.__subscriptions = _s
			= new OrderedRegistry<TSubscriber, Subscription<TSubscriber>>();

		s = new Subscription(_, subscriber);
		_s.add(subscriber, s);

		return s;
	}

	/**
	 * Unsubscribes the `TSubscriber` (observer).
	 * @param {TSubscriber} subscriber
	 */
	unsubscribe (subscriber: TSubscriber): void
	{
		this.__subscriptions?.remove(subscriber)?.dispose();
	}

	/**
	 * Cancels (disposes) all subscriptions.
	 */
	unsubscribeAll (): void
	{
		this._unsubscribeAll();
	}

	protected _getSubscribers (): ExtendedIterable<TSubscriber> | undefined
	{
		return this.__subscriptions?.map(node => node?.value.subscriber);
	}

	protected _unsubscribeAll (): undefined
	protected _unsubscribeAll (returnSubscribers: false): undefined
	protected _unsubscribeAll (returnSubscribers: true): TSubscriber[] | undefined
	protected _unsubscribeAll (returnSubscribers: boolean): TSubscriber[] | undefined
	protected _unsubscribeAll (returnSubscribers: boolean = false): TSubscriber[] | undefined
	{
		const _ = this;
		const _s = _.__subscriptions;
		if(!_s) return undefined;
		const s = _s.map(n => n.value).toArray();
		const u = returnSubscribers ? s.map(o => o!.subscriber) : undefined;
		_s.clear(); // Reset...

		dispose.these.unsafe(s);
		return u;
	}

	protected _onDispose (): void
	{
		super._onDispose();
		this._unsubscribeAll();
		const s = this.__subscriptions;
		this.__subscriptions = undefined;
		s?.dispose();
	}
}
