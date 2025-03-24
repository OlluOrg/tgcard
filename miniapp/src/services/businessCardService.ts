import apiService from "./apiService";
import {BusinessCardCreate, BusinessCardDelete, BusinessCardRead, BusinessCardUpdate} from "./apiTypes";
import {API_ACTIONS} from "./constants";

const businessCardService = {
    create: async (data: any): Promise<BusinessCardCreate> => {
        const response = await apiService.post<BusinessCardCreate>(API_ACTIONS.BUSINESS_CARD.CREATE, {
            data: data
        });

        return response;
    },

    read: async (userId: string): Promise<BusinessCardRead[]> => {
        const response = await apiService.post<BusinessCardRead[]>(API_ACTIONS.BUSINESS_CARD.READ, {
            userId: userId
        });

        return response;
    },

    readOne: async (businessCardId?: string): Promise<BusinessCardRead> => {
        const response = await apiService.post<BusinessCardRead>(API_ACTIONS.BUSINESS_CARD.READ, {
            id: businessCardId,
        });

        return response;
    },

    update: async (businessCardId: string, newBusinessCard: Record<string, any>): Promise<BusinessCardUpdate> => {
        const response = await apiService.post<BusinessCardUpdate>(API_ACTIONS.BUSINESS_CARD.UPDATE, {
            id: businessCardId,
            data: newBusinessCard,
        });

        return response;
    },

    delete: async (businessCardId: string): Promise<BusinessCardDelete> => {
        const response = await apiService.post<BusinessCardDelete>(API_ACTIONS.BUSINESS_CARD.DELETE, {
            id: businessCardId,
        });

        return response;
    }
};

export default businessCardService;