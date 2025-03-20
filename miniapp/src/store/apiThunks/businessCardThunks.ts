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
import {USER_ID} from "../../services/constants";

export const transformFrontendToBackend = (frontendData: TCard, isCreate: boolean = true) => {
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
            userId: USER_ID,
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
    async (payload: TCard, {rejectWithValue}) => {
        try {
            const response = await businessCardService.create(transformFrontendToBackend(payload));
            console.log(response);

            const card: TCard = payload;
            card.businessCardId = response.id;

            return card;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const readBusinessCards = createAsyncThunk(
    'businessCards/read',
    async (payload: {userId?: string, businessCardId?: string}, {rejectWithValue}) => {
        try {
            const response = await businessCardService.read(payload.userId, payload.businessCardId);

            console.log(response)
            const cards: TCard[] = response.map(businessCard => {
                return {
                    ...businessCard.data as TCard,
                    businessCardId: businessCard._id,
                }
            })

            return cards;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateBusinessCards = createAsyncThunk(
    'businessCards/update',
    async (payload: {userId?: string}, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const updatedCard: TCard = state.myCards.cards.find(card => card.businessCardId === state.myCards.selectedCardId)!;
            console.log('newCard', updatedCard);
            const businessCard = transformFrontendToBackend(updatedCard, false);
            console.log('updateBusinessCards.businessCard', businessCard);
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