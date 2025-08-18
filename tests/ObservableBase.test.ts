import { describe, it, expect, vi } from 'vitest';
import ObservableBase from '../src/ObservableBase';

// Concrete implementation for testing
class TestObservable<T> extends ObservableBase<T> {
	triggerNext(value: T): void {
		this._onNext(value);
	}
	
	triggerError(error: unknown): void {
		this._onError(error);
	}
	
	triggerCompleted(): void {
		this._onCompleted();
	}
}

describe('ObservableBase', () => {
	it('should support function-based subscriptions', () => {
		const observable = new TestObservable<number>();
		const values: number[] = [];
		
		const subscription = observable.subscribe(value => {
			values.push(value);
		});
		
		observable.triggerNext(1);
		observable.triggerNext(2);
		
		expect(values).toEqual([1, 2]);
		
		subscription.dispose();
	});
	
	it('should support observer object subscriptions', () => {
		const observable = new TestObservable<string>();
		const values: string[] = [];
		const errors: unknown[] = [];
		let completed = false;
		
		const subscription = observable.subscribe({
			onNext: value => values.push(value),
			onError: error => errors.push(error),
			onCompleted: () => { completed = true; }
		});
		
		observable.triggerNext('hello');
		observable.triggerNext('world');
		
		const testError = new Error('test error');
		observable.triggerError(testError);
		
		observable.triggerCompleted();
		
		expect(values).toEqual(['hello', 'world']);
		expect(errors).toContain(testError);
		expect(completed).toBe(true);
		
		subscription.dispose();
	});
	
	it('should support mixed subscription parameters', () => {
		const observable = new TestObservable<boolean>();
		const values: boolean[] = [];
		const errors: unknown[] = [];
		
		const subscription = observable.subscribe(
			value => values.push(value),
			error => errors.push(error)
		);
		
		observable.triggerNext(true);
		observable.triggerNext(false);
		
		const testError = new Error('mixed subscription error');
		observable.triggerError(testError);
		
		expect(values).toEqual([true, false]);
		expect(errors).toContain(testError);
		
		subscription.dispose();
	});
	
	it('should throw when registering onError/onComplete with observer object', () => {
		const observable = new TestObservable<number>();
		
		expect(() => {
			observable.subscribe(
				{ onNext: () => {} },
				() => {} // This should cause an error
			);
		}).toThrow('Registering onError or onComplete in addition to an observer is not supported');
	});
	
	it('should handle multiple subscribers', () => {
		const observable = new TestObservable<number>();
		const subscriber1Values: number[] = [];
		const subscriber2Values: number[] = [];
		
		const sub1 = observable.subscribe(value => subscriber1Values.push(value));
		const sub2 = observable.subscribe(value => subscriber2Values.push(value * 2));
		
		observable.triggerNext(5);
		observable.triggerNext(10);
		
		expect(subscriber1Values).toEqual([5, 10]);
		expect(subscriber2Values).toEqual([10, 20]);
		
		sub1.dispose();
		sub2.dispose();
	});
	
	it('should stop notifying after unsubscription', () => {
		const observable = new TestObservable<string>();
		const values: string[] = [];
		
		const subscription = observable.subscribe(value => values.push(value));
		
		observable.triggerNext('before');
		subscription.dispose();
		observable.triggerNext('after');
		
		expect(values).toEqual(['before']);
	});
	
	it('should unsubscribe all on completion', () => {
		const observable = new TestObservable<number>();
		const values: number[] = [];
		
		observable.subscribe(value => values.push(value));
		observable.subscribe(value => values.push(value * 2));
		
		observable.triggerNext(3);
		expect(values).toEqual([3, 6]);
		
		observable.triggerCompleted();
		
		// After completion, no more notifications should be sent
		observable.triggerNext(4);
		expect(values).toEqual([3, 6]); // Should not include 4 or 8
	});
	
	it('should handle disposal properly', () => {
		const observable = new TestObservable<number>();
		let subscribeCallCount = 0;
		
		observable.subscribe(() => { subscribeCallCount++; });
		observable.triggerNext(1);
		expect(subscribeCallCount).toBe(1);
		
		observable.dispose();
		
		expect(() => {
			observable.subscribe(() => {});
		}).toThrow();
		
		// Should not crash when triggering events after disposal
		expect(() => {
			observable.triggerNext(2);
		}).not.toThrow();
		
		expect(subscribeCallCount).toBe(1); // Should not have increased
	});
	
	it('should handle errors in subscriber callbacks', () => {
		const observable = new TestObservable<number>();
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		
		// Subscriber that throws
		observable.subscribe(() => {
			throw new Error('Subscriber error');
		});
		
		// Should not crash the observable
		expect(() => {
			observable.triggerNext(1);
		}).not.toThrow();
		
		consoleSpy.mockRestore();
	});
});
