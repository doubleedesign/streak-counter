import { StreakCounter } from './types';
import { getCounter, incrementCounter, initCounter, resetCounter } from './lib';

export function getDailyStreak(storage: Storage): StreakCounter {
	let streak = getCounter(storage);

	if (streak) {
		try {
			incrementCounter(storage);
		} catch {
			resetCounter(storage);
		}
	} else {
		streak = initCounter(storage);
	}

	return streak;
}
