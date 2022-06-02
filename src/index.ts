const KEY = 'streak'; // for storing in localStorage

export type StreakCounter = {
	storage: Storage;
	startDate: string;
	lastLogin: string;
	count: number;
};

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US');
}

export function dateInt(dateString: string): number {
	return parseInt(dateString.split('/')[1]);
}

export function dailyStreak(storage: Storage): StreakCounter {
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

export function initCounter(storage: Storage) {
	const today = new Date();

	const streak = {
		storage: storage,
		startDate: formatDate(today),
		lastLogin: formatDate(today),
		count: 0,
	};

	storage.setItem(KEY, JSON.stringify(streak));

	return streak;
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

export function incrementCounter(storage: Storage) {
	try {
		const streak = JSON.parse(storage.getItem(KEY) || '');
		const today = formatDate(new Date());
		const dateDifference = dateInt(today) - dateInt(streak.lastLogin);

		if (dateDifference === 1) {
			streak.count += 1;
			storage.setItem(KEY, JSON.stringify(streak));
		} else if (dateDifference === 1) {
			console.warn('Streak already incremented today');
		}
	} catch (error) {
		console.error('No streak to increment');
	}
}

export function resetCounter(storage: Storage) {
	try {
		const streak = JSON.parse(storage.getItem(KEY) || '');
		const today = formatDate(new Date());
		const dateDifference = dateInt(today) - dateInt(streak.lastLogin);

		if (dateDifference > 1) {
			const newStreak = initCounter(storage);
			storage.setItem(KEY, JSON.stringify(newStreak));
		}
	} catch (error) {
		console.error('No streak to reset, maybe you want to initialise a new one?');
	}
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
