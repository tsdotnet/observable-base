/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */

import {Action, Closure} from '@tsdotnet/common-interfaces';

export default interface Observer<T>
{
	// onNext is optional because an observer may only care about onCompleted.
	onNext?: Action<T>;
	onError?: Action<any>;
	onCompleted?: Closure;
// eslint-disable-next-line semi
}
