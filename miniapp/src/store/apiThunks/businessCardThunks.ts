import {createAsyncThunk} from "@reduxjs/toolkit";
import businessCardService from "../../services/businessCardService";
import {
    TCard,
    TDivider,
    TImageSection,
    TSectionBlockLink,
    TSectionText,
    TVideoSection,
    TypeSectionEnum
} from "../../types/types";
import {RootState} from "../store";
import {getUserId} from "../../utils/getUserId";

export const transformFrontendToBackend = (frontendData: TCard, isCreate: boolean = true, userId: string = '') => {
    const transformedSections = frontendData.sections.length === 0 ? [] : frontendData.sections.map((section) => {
        switch (section.typeSectionEnum) {
            case TypeSectionEnum.text:
                return {
                    id: section.id.toString(),
                    typeSectionEnum: TypeSectionEnum.text,
                    value: section.value as TSectionText,
                    order: section.order.toString(),
                };
            case TypeSectionEnum.blockLink:
                return {
                    id: section.id.toString(),
                    typeSectionEnum: TypeSectionEnum.blockLink,
                    value: section.value as TSectionBlockLink,
                    order: section.order.toString(),
                };
            case TypeSectionEnum.divider:
                return {
                    id: section.id.toString(),
                    typeSectionEnum: TypeSectionEnum.divider,
                    value: section.value as TDivider,
                    order: section.order.toString(),
                };
            case TypeSectionEnum.video:
                return {
                    id: section.id.toString(),
                    typeSectionEnum: TypeSectionEnum.video,
                    value: section.value as TVideoSection,
                    order: section.order.toString(),
                };
            case TypeSectionEnum.image:
                return {
                    id: section.id.toString(),
                    typeSectionEnum: TypeSectionEnum.image,
                    value: section.value as TImageSection,
                    order: section.order.toString(),
                };
            default:
                throw new Error(`Unknown section type: ${section.typeSectionEnum}`);
        }
    });

    if (isCreate) {
        return {
            userId: userId,
            data: {
                id: frontendData.id.toString(),
                title: frontendData.title,
                description: frontendData.description,
                date: frontendData.date,
                sections: transformedSections,
            },
        }
    }

    return {
        id: frontendData.id.toString(),
        title: frontendData.title,
        description: frontendData.description,
        date: frontendData.date,
        sections: transformedSections,
    }
};

export const createBusinessCard = createAsyncThunk(
    'businessCards/create',
    async (payload: { card: TCard }, {rejectWithValue}) => {
        try {
            const userId = getUserId();
            const response = await businessCardService.create(transformFrontendToBackend(payload.card, true, userId));

            const card: TCard = payload.card;
            card.businessCardId = response.id;

            return card;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const readBusinessCards = createAsyncThunk(
    'businessCards/read',
    async (payload: {}, {rejectWithValue}) => {
        try {
            const userId = getUserId();
            const response = await businessCardService.read(userId);

            const cards: TCard[] = response.map(businessCard => {
                return {
                    ...businessCard.data as TCard,
                    businessCardId: businessCard._id,
                    userId: businessCard.userId
                }
            })

            return cards;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const readOneBusinessCard = createAsyncThunk(
    'businessCards/readOne',
    async (payload: { businessCardId?: string }, {rejectWithValue}) => {
        try {
            const response = await businessCardService.readOne(payload.businessCardId);

            const card = {
                ...response.data as TCard,
                businessCardId: response._id,
                userId: response.userId
            } as TCard

            //alert(JSON.stringify(card, null, 2));

            return card;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateBusinessCards = createAsyncThunk(
    'businessCards/update',
    async (payload: {}, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const updatedCard: TCard = state.myCards.cards.find(card => card.businessCardId === state.myCards.selectedCardId)!;

            const businessCard = transformFrontendToBackend(updatedCard, false);

            const response = await businessCardService.update(updatedCard.businessCardId!, businessCard);

            return response.modifiedCount;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteBusinessCard = createAsyncThunk(
    'businessCards/delete',
    async (payload: {} ,{getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;

            const response = await businessCardService.delete(state.myCards.selectedCardId!);

            return response.deletedCount;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);