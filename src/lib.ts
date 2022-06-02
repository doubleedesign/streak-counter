import { StreakCounter } from './types';
import { dateAsInteger, formatDate } from './utils';

const KEY = 'streak'; // for storing in localStorage

export function initCounter(storage: Storage) {
	const today = new Date();

	const streak = {
		storage: storage,
		startDate: formatDate(today),
		lastLogin: formatDate(today),
		count: 1,
	};

	storage.setItem(KEY, JSON.stringify(streak));
}

export function getCounter(storage: Storage): StreakCounter | null {
	const data = storage.getItem(KEY);

	try {
		// @ts-ignore
		const streak = JSON.parse(data);

		if (streak === '') {
			return null;
		}

		return streak;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function incrementCounter(storage: Storage): boolean {
	try {
		const streak = JSON.parse(storage.getItem(KEY) || '');
		const today = formatDate(new Date());
		const dateDifference = dateAsInteger(today) - dateAsInteger(streak.lastLogin);

		if (dateDifference === 1) {
			streak.count += 1;
			storage.setItem(KEY, JSON.stringify(streak));
			return true;
		} else if (dateDifference === 1) {
			console.warn('Streak already incremented today');
			return false;
		}
	} catch (error) {
		console.error('No streak to increment');
		return false;
	}

	return false;
}

export function overrideStreak(storage: Storage, overrides: Partial<StreakCounter>) {
	const streak = getCounter(storage);

	if (streak) {
		const newStreak = {
			...streak,
			...overrides,
		};

		storage.setItem(KEY, JSON.stringify(newStreak));
	} else {
		console.error('No streak to override');
	}
}
