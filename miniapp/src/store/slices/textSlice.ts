import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface textSlice {
    markdown: string;

    markdownError: string;
}

const initialState: textSlice = {
    markdown: '',

    markdownError: '',
}

const textSlice = createSlice({
    name: 'text',
    initialState: initialState,
    reducers: {
        setMarkdown: (state, action: PayloadAction<string>) => {
            state.markdown = action.payload;
        },

        setMarkdownError: (state, action: PayloadAction<string>) => {
            state.markdownError = action.payload;
        },

        clearTextSlice: (state) => {
            state.markdown = '';

            state.markdownError = '';
        }
    }
});

export const {setMarkdown, setMarkdownError, clearTextSlice} = textSlice.actions;
export const textReducer = textSlice.reducer;