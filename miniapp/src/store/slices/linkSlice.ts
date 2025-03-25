import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LinkSlice {
    nameBlockLinkInput: string,
    linkBlockLinkInput: string,

    nameError: string,
    linkError: string
}

const initialState: LinkSlice = {
    nameBlockLinkInput: '',
    linkBlockLinkInput: '',

    nameError: '',
    linkError: ''
}

const linkSlice = createSlice({
    name: "link",
    initialState: initialState,
    reducers: {
        setNameBlockLinkInput: (state, action: PayloadAction<string>) => {
            state.nameBlockLinkInput = action.payload;
        },
        setLinkBlockLinkInput: (state, action: PayloadAction<string>) => {
            state.linkBlockLinkInput = action.payload;
        },

        setNameError: (state, action: PayloadAction<string>) => {
            state.nameError = action.payload;
        },
        setLinkError: (state, action: PayloadAction<string>) => {
            state.linkError = action.payload;
        },
        clearLinkSlice: (state) => {
            state.nameBlockLinkInput = '';
            state.linkBlockLinkInput = '';

            state.nameError = '';
            state.linkError = '';
        }
    }
});

export const {
    setNameBlockLinkInput,
    setLinkBlockLinkInput,
    setNameError,
    setLinkError,
    clearLinkSlice
} = linkSlice.actions

export const linkReducer = linkSlice.reducer;