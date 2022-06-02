import { StreakCounter } from './types';
import { getCounter, incrementCounter, initCounter, resetCounter } from './lib';

export function getDailyStreak(): StreakCounter | null {
	let storage = localStorage;
	let streak = getCounter(storage);

	if (streak) {
		const incremented = incrementCounter(storage);
		if (incremented) {
			return streak;
		} else {
			resetCounter(storage);
		}
	} else {
		initCounter(storage);
	}

	return getCounter(storage);
}
