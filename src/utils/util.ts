import { TODAY, WEEK } from './constants';

export function convertDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const dateString = year + '-' + month + '-' + day;

    return dateString;
}

export const toComma = (n1: string) => {
    return n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export const fotmattedDate = () => {
    const label = TODAY.getDay();
    const todayLabel = WEEK[label];

    return `${TODAY.getFullYear()}. 0${TODAY.getMonth() + 1}. 0${TODAY.getDate()}(${todayLabel}) 05:00:00`;
};


export function parseRawDate(rawDate: string): Date {
    const dateString: string = rawDate.replace(/\(\.*\)$/, ''); // ex. "2024-02-10(금)" -> "2024-02-10"

    return new Date(Date.parse(dateString));
}

export function getDateClassName(date: Date): 'before' | 'next' | 'today' {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (date < now) {
        return 'before';
    } else if (date > now) {
        return 'next';
    } else {
        return 'today';
    }
}