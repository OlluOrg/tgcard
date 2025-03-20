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
        }
    }
});

export const {setMarkdown, setMarkdownError} = textSlice.actions;
export const textReducer = textSlice.reducer;