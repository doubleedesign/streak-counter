import { StreakCounter } from './types';
import { getCounter, incrementCounter, initCounter } from './lib';
import { dateAsInteger, formatDate } from './utils';

export function getDailyStreak(): StreakCounter | null {
	let storage = localStorage;
	let streak = getCounter(storage);
	const today = formatDate(new Date());

	if (streak) {
		const dateDifference = dateAsInteger(today) - dateAsInteger(streak.lastLogin);

		if (dateDifference > 1) {
			incrementCounter(storage);
		} else {
			initCounter(storage);
		}
	} else {
		initCounter(storage);
	}

	return getCounter(storage);
}
