/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */

import {Action, Closure} from '@tsdotnet/common-interfaces';
import Disposable from '@tsdotnet/disposable/dist/Disposable';
import ArgumentException from '@tsdotnet/exceptions/dist/ArgumentException';
import Observable from './Observable';
import Observer from './Observer';
import SubscribableBase from './SubscribableBase';

// Can be used as a base class, mixin, or simply reference on how to implement the pattern.

export default abstract class ObservableBase<T>
	extends SubscribableBase<Observer<T>>
	implements Observable<T>
{

	subscribe (subscriber: Observer<T>): Disposable;

	subscribe (
		subscriber: Action<T>,
		onError?: Action<any>,
		onCompleted?: Closure): Disposable;

	subscribe (
		subscriber: Observer<T> | Action<T>,
		onError?: Action<any>,
		onCompleted?: Closure): Disposable
	{
		if(typeof subscriber=='function')
		{
			return super.subscribe({
				onNext: subscriber,
				onError: onError,
				onCompleted: onCompleted
			});
		}
		if(onError || onCompleted)
			throw new ArgumentException('subscriber', 'Registering onError or onComplete in addition to an observer is not supported.');

		return super.subscribe(subscriber);
	}

	protected _onNext (value: T): void
	{
		processAction(
			this._getSubscribers()?.toArray(),
			s => { s.onNext && s.onNext(value); }
		);
	}

	protected _onError (error: unknown): void
	{
		processAction(
			this._getSubscribers()?.toArray(),
			s => { s.onError && s.onError(error); }
		);
	}

	protected _onCompleted (): void
	{
		processAction(
			this._unsubscribeAll(true),
			s => { s.onCompleted && s.onCompleted(); }
		);
	}
}

const OBSERVER_ERROR_MESSAGE: string = 'One or more observers had errors when attempting to pass information.';

function processAction<T> (
	observers: Observer<T>[] | undefined,
	handler: (s: Observer<T>) => void): void
{
	if(!observers) return;
	let observersErrors: { observer: Observer<T>; ex: any }[] | null = null;

	for(const s of observers)
	{
		try
		{
			handler(s);
		}
		catch(ex)
		{
			observersErrors = observersErrors || [];
			// Don't let one error prevent others from receiving information.
			observersErrors.push({observer: s, ex: ex});
		}
	}

	observers.length = 0;

	if(observersErrors && observersErrors.length)
	{
		if(console && console.error)
			console.error(OBSERVER_ERROR_MESSAGE, observersErrors);
		else throw {
			message: OBSERVER_ERROR_MESSAGE,
			errors: observersErrors
		};
	}

}
