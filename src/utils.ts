export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US');
}

export function dateAsInteger(dateString: string): number {
	return parseInt(dateString.split('/')[1]);
}
