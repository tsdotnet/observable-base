/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import Disposable from '@tsdotnet/disposable/dist/Disposable';

export default interface Subscribable<TSubscriber>
	extends Disposable
{
	subscribe (observer: TSubscriber): Disposable;

	unsubscribe (observer: TSubscriber): void;
}
