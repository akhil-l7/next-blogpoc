import { STORAGE_KEYS } from './constants';

let localStorageAvailable: boolean | null = null;

const isLocalStorageAvailable = (): boolean => {
    if (localStorageAvailable !== null) return localStorageAvailable;

    if (typeof window === 'undefined') {
        localStorageAvailable = false;
        return false;
    }

    try {
        localStorage.setItem('__test__', '__test__');
        localStorage.removeItem('__test__');
        localStorageAvailable = true;
    } catch {
        localStorageAvailable = false;
    }
    return localStorageAvailable;
};

export const storage = {
    setVisitorId(id: string): void {
        if (!isLocalStorageAvailable()) return;
        localStorage.setItem(STORAGE_KEYS.VISITOR_ID, id);
    },

    getVisitorId(): string | null {
        if (!isLocalStorageAvailable()) return null;
        return localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    },
};