import { StreakCounter } from './types';
export declare function initCounter(storage: Storage): {
    storage: Storage;
    startDate: string;
    lastLogin: string;
    count: number;
};
export declare function getCounter(storage: Storage): StreakCounter | null;
export declare function incrementCounter(storage: Storage): void;
export declare function resetCounter(storage: Storage): void;
export declare function overrideStreak(storage: Storage, overrides: Partial<StreakCounter>): void;
