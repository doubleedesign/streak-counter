# Streak Counter

A thing that counts a streak, such as visiting a website daily, and stores it in the browser's local storage.

Built as part of the TypeScript Fundamentals workshop with [@joejsio](https://github.com/jsjoeio) at Render(ATL) 2022.

## Installation

`yarn add @doubleedesign/streak-counter`

`npm install @doubleedesign/streak-counter`

## Usage

`
const streak = getDailyStreak();
`

If a streak is stored in local storage, it will be incremented if the lastLogin date was yesterday, or reset if it was
longer ago. If there is no streak in local storage, a new streak will be initialised.

The returned streak is of the StreakCounter type:

```
export type StreakCounter = {
    storage: Storage;
    startDate: string;
    lastLogin: string;
    count: number;
};
```