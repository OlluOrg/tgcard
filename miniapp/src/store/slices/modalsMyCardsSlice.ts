import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ModalsMyCardsSlice {
    isModalAddOpen: boolean,
    isModalDeleteOpen: boolean,
    isModalSettingsOpen: boolean,
}

const initialState: ModalsMyCardsSlice = {
    isModalAddOpen: false,
    isModalDeleteOpen: false,
    isModalSettingsOpen: false,
}

const modalsMyCardsSlice = createSlice({
    name: 'modalsMyCards',
    initialState: initialState,
    reducers: {
        setIsModalAddOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalAddOpen = action.payload;
        },
        setIsModalSettingsOpen: (state, action) => {
            state.isModalSettingsOpen = action.payload;
        },
        setIsModalDeleteOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalDeleteOpen = action.payload;
        }
    }
});

export const {setIsModalAddOpen, setIsModalDeleteOpen, setIsModalSettingsOpen} = modalsMyCardsSlice.actions;
export const modalsMyCardsReducer = modalsMyCardsSlice.reducer;