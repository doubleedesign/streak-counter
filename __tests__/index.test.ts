import { JSDOM } from 'jsdom';
import { getCounter, incrementCounter, initCounter, overrideStreak } from '../src/lib';
import { formatDate } from '../src/utils';
import { StreakCounter } from '../src/types';

describe('Initialise new counter', () => {
	let mockLocalStorage: Storage;

	beforeEach(() => {
		const mockJSDom = new JSDOM('', { url: 'https://localhost' });
		mockLocalStorage = mockJSDom.window.localStorage;
	});

	it('should store a new streak in localStorage', () => {
		const key = 'streak';
		initCounter(mockLocalStorage);

		const streakAsString = mockLocalStorage.getItem(key);
		expect(streakAsString).not.toBeNull();
	});

	afterEach(() => {
		mockLocalStorage.clear();
	});
});

describe('Get existing counter', () => {
	let mockLocalStorage: Storage;

	beforeEach(() => {
		const mockJSDom = new JSDOM('', { url: 'https://localhost' });
		mockLocalStorage = mockJSDom.window.localStorage;
	});

	it('should return undefined if there is no streak stored', () => {
		const streak = getCounter(mockLocalStorage);
		expect(streak).toBeNull();
	});

	it('should return a streak from localStorage', () => {
		initCounter(mockLocalStorage);
		const streak = getCounter(mockLocalStorage);
		expect(streak).toBeDefined();
	});

	afterEach(() => {
		mockLocalStorage.clear();
	});
});

describe('Increment or reset stored counter', () => {
	let mockLocalStorage: Storage;
	let streak: StreakCounter | null;

	beforeEach(() => {
		const mockJSDom = new JSDOM('', { url: 'https://localhost' });
		mockLocalStorage = mockJSDom.window.localStorage;
	});

	it('should not increment the streak when login days are not consecutive', () => {
		streak = initCounter(mockLocalStorage);

		overrideStreak(mockLocalStorage, {
			storage: mockLocalStorage,
			startDate: formatDate(new Date('01/01/2022')),
			lastLogin: formatDate(new Date('02/02/2022')),
			count: 1,
		});

		incrementCounter(mockLocalStorage);
		streak = getCounter(mockLocalStorage);
		expect(streak?.count).toBe(1);
	});

	it('should save the incremented streak to localStorage', () => {});

	afterEach(() => {
		mockLocalStorage.clear();
	});
});
