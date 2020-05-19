/*!
* @author electricessence / https://github.com/electricessence/
* @license MIT
* Reference:
*   http://referencesource.microsoft.com/#mscorlib/system/IObservable.cs
*   https://msdn.microsoft.com/en-us/library/dd990377.aspx
*/


import Observer from './Observer';
import Subscribable from './Subscribable';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Observable<T> extends Subscribable<Observer<T>>
{

}
