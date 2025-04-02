import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CardSlice {
    nameNewCard: string,

    nameError: string,
}

const initialState: CardSlice = {
    nameNewCard: '',

    nameError: '',
}

const cardSlice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        setNameNewCard: (state, action: PayloadAction<string>) => {
            state.nameNewCard = action.payload;
        },
        setNameError: (state, action: PayloadAction<string>) => {
            state.nameError = action.payload;
        },
    }
});

export const {setNameNewCard, setNameError} = cardSlice.actions;
export const cardReducer = cardSlice.reducer;