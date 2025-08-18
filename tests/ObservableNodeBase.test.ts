import { describe, it, expect } from 'vitest';
import ObservableNodeBase from '../src/ObservableNodeBase';

describe('ObservableNodeBase', () => {

	it('should receive signals only when subscribed', () => {
		const ERR = 'err';
		const o = new ObservableNodeBase<number>();

		let completed = false;
		let count = 0;
		
		const s1 = o.subscribe(
			v => {
				expect(completed).toBe(false);
				expect(v).toBe(1);
			},
			err => {
				expect(completed).toBe(false);
				expect(err).toBe(ERR);
			}
		);
		
		o.subscribe({
			onNext: v => {
				expect(completed).toBe(false);
				expect(v).toBe(count);
			},
			onCompleted: () => {
				completed = true;
			}
		});

		o.onNext(++count);
		o.onError(ERR);

		s1.dispose();

		expect(completed).toBe(false);
		o.onCompleted();
		expect(completed).toBe(true);

		o.onNext(++count);
		o.onError(ERR);

		o.dispose();

		expect(() => {
			o.subscribe(() => {
				expect.unreachable('Should not be called after disposal');
			});
		}).toThrow();

		expect(() => {
			o.onNext(0);
		}).not.toThrow();
	});

	it('should handle multiple subscribers', () => {
		const o = new ObservableNodeBase<string>();
		const results: string[] = [];
		
		const sub1 = o.subscribe(value => results.push(`sub1: ${value}`));
		const sub2 = o.subscribe(value => results.push(`sub2: ${value}`));
		
		o.onNext('test1');
		o.onNext('test2');
		
		expect(results).toEqual([
			'sub1: test1',
			'sub2: test1',
			'sub1: test2',
			'sub2: test2'
		]);
		
		sub1.dispose();
		sub2.dispose();
	});
	
	it('should handle error propagation', () => {
		const o = new ObservableNodeBase<number>();
		const errors: unknown[] = [];
		
		o.subscribe({
			onNext: () => {},
			onError: err => errors.push(err)
		});
		
		const testError = new Error('Test error');
		o.onError(testError);
		
		expect(errors).toContain(testError);
	});
	
	it('should handle completion', () => {
		const o = new ObservableNodeBase<boolean>();
		let completed = false;
		
		o.subscribe({
			onNext: () => {},
			onCompleted: () => { completed = true; }
		});
		
		o.onCompleted();
		expect(completed).toBe(true);
	});
	
	it('should unsubscribe all subscribers on completion', () => {
		const o = new ObservableNodeBase<number>();
		let nextCallCount = 0;
		
		o.subscribe(value => { nextCallCount++; });
		o.subscribe(value => { nextCallCount++; });
		
		o.onNext(1);
		expect(nextCallCount).toBe(2);
		
		o.onCompleted();
		
		// After completion, no more values should be received
		o.onNext(2);
		expect(nextCallCount).toBe(2); // Should still be 2
	});

});
