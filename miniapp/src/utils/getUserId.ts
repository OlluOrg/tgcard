import {queryParams} from "./queryParams";

export const getUserId = (): string => {
    const tg = Telegram.WebApp;

    const userIdFromQuery = queryParams('userId');
    const userIdFromTelegram = tg.initDataUnsafe.user?.id
    const userIdFromLocalStorage = localStorage.getItem('userId');

    const userId = userIdFromQuery ?? userIdFromTelegram ?? userIdFromLocalStorage;

    if (userId) {
        localStorage.setItem('userId', userId);
    }

    return userId.toString();
}