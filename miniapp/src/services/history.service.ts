import {HistoryAdd, HistoryRead} from "./apiTypes";
import apiService from "./apiService";
import {API_ACTIONS} from "./constants";

const historyService = {
    add: async (userId?: string, businessCardId?: string): Promise<HistoryAdd> => {
        const response = await apiService.post<HistoryAdd>(API_ACTIONS.HISTORY.ADD, {
            userId: userId,
            cardId: businessCardId,
        });

        return response;
    },
    get: async (userId?: string): Promise<HistoryRead[]> => {
        const response = await apiService.post<HistoryRead[]>(API_ACTIONS.HISTORY.GET, {
            userId: userId
        });

        return response;
    }
}

export default historyService;