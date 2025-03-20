import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CardSlice {
    nameNewCard: string,
    descriptionNewCard: string,

    nameError: string,
    descriptionError: string,
}

const initialState: CardSlice = {
    nameNewCard: '',
    descriptionNewCard: '',

    nameError: '',
    descriptionError: '',
}

const cardSlice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        setNameNewCard: (state, action: PayloadAction<string>) => {
            state.nameNewCard = action.payload;
        },
        setDescriptionNewCard: (state, action: PayloadAction<string>) => {
            state.descriptionNewCard = action.payload;
        },
        setNameError: (state, action: PayloadAction<string>) => {
            state.nameError = action.payload;
        },
        setDescriptionError: (state, action: PayloadAction<string>) => {
            state.descriptionError = action.payload;
        },
    }
});

export const {setNameNewCard, setDescriptionNewCard, setNameError, setDescriptionError} = cardSlice.actions;
export const cardReducer = cardSlice.reducer;