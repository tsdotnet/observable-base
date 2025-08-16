/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import { type Disposable } from '@tsdotnet/disposable';

export default interface Subscribable<TSubscriber>
	extends Disposable
{
	subscribe (observer: TSubscriber): Disposable;

	unsubscribe (observer: TSubscriber): void;
// eslint-disable-next-line semi
}
