import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ImageSlice {
    imageData: string,
    aspectRatio: number,
    imageError: string,
}

const initialState: ImageSlice = {
    imageData: '',
    aspectRatio: 1,
    imageError: '',
}

const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {
        setImageData: (state, action: PayloadAction<string>) => {
            state.imageData = action.payload;
        },
        setAspectRatio: (state, action: PayloadAction<number>) => {
            state.aspectRatio = action.payload;
        },
        setImageError: (state, action: PayloadAction<string>) => {
            state.imageError = action.payload;
        }
    }
});

export const {setImageError, setImageData, setAspectRatio} = imageSlice.actions;
export const imageReducer = imageSlice.reducer