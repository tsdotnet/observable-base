/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Reference: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */

import {Action, Closure} from '@tsdotnet/common-interfaces';

export default interface Observer<T>
{
	// onNext is optional because an observer may only care about onCompleted.
	onNext?: Action<T> | Closure | undefined;
	onError?: Action<any> | Closure | undefined;
	onCompleted?: Closure | undefined;
// eslint-disable-next-line semi
}
