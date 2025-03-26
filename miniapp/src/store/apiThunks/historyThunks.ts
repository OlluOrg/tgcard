import {createAsyncThunk} from "@reduxjs/toolkit";
import historyService from "../../services/history.service";
import {TCard, TCardHistory} from "../../types/types";

export const addHistory = createAsyncThunk(
    'viewHistory/addView',
    async (payload: {userId?: string, businessCardId?: string}, {rejectWithValue}) => {
        try {
            const response = await historyService.add(payload.userId, payload.businessCardId);
            return response.status;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getHistory = createAsyncThunk(
    'viewHistory/getView',
    async (payload: {userId?: string}, {rejectWithValue}) => {
        try {
            const response = await historyService.get(payload.userId);

            const cardsHistory: TCardHistory[] = response.map(businessCard => {
                return {
                    ...businessCard.data as TCard,
                    userId: businessCard.userId,
                    businessCardId: businessCard._id,
                    lastViewedAt: businessCard.lastViewedAt,
                }
            });

            return cardsHistory;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)