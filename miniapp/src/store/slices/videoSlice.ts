import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface VideoSlice {
    linkVideoInput: string,

    videoError: string
}

const initialState: VideoSlice = {
    linkVideoInput: '',

    videoError: '',
}

const videoSlice = createSlice({
    name: 'video',
    initialState: initialState,
    reducers: {
        setLinkVideoInput: (state, action: PayloadAction<string>) => {
            state.linkVideoInput = action.payload;
        },
        setVideoError: (state, action: PayloadAction<string>) => {
            state.videoError = action.payload;
        },
        clearVideoSlice: (state) => {
            state.linkVideoInput = '';

            state.videoError = '';
        }
    }
});

export const {setVideoError, setLinkVideoInput, clearVideoSlice} = videoSlice.actions;
export const videoReducer = videoSlice.reducer