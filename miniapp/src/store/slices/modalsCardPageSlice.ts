import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalsState {
    isEditBlock: boolean,
    isModalEditBlockLinkOpen: boolean,
    isModalChooseSectionOpen: boolean,
    isModalEditVideoSectionOpen: boolean,
    isModalEditTextOpen: boolean,
    isModalEditImageOpen: boolean,
    isTitleEditOpen: boolean,
}

const initialState: ModalsState = {
    isEditBlock: false,
    isModalEditBlockLinkOpen: false,
    isModalChooseSectionOpen: false,
    isModalEditVideoSectionOpen: false,
    isModalEditTextOpen: false,
    isModalEditImageOpen: false,
    isTitleEditOpen: false,
}

const modalsCardPageSlice = createSlice({
    name: "modalsCardPage",
    initialState: initialState,
    reducers: {
        setIsEditBlock: (state, action: PayloadAction<boolean>) => {
            state.isEditBlock = action.payload;
        },
        setIsModalEditBlockLinkOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalEditBlockLinkOpen = action.payload;
        },
        setIsModalChooseSectionOpen:(state, action: PayloadAction<boolean>) => {
            state.isModalChooseSectionOpen = action.payload;
        },
        setIsModalEditVideoSectionOpen:(state, action: PayloadAction<boolean>) => {
            state.isModalEditVideoSectionOpen = action.payload;
        },
        setIsModalEditTextOpen:(state, action: PayloadAction<boolean>) => {
            state.isModalEditTextOpen = action.payload;
        },
        setIsModalEditImageOpen:(state, action: PayloadAction<boolean>) => {
            state.isModalEditImageOpen = action.payload;
        },
        setIsTitleEditOpen: (state, action: PayloadAction<boolean>) => {
            state.isTitleEditOpen = action.payload;
        },
        closeAllModals: (state) => {
            state.isEditBlock = false;
            state.isModalEditBlockLinkOpen = false;
            state.isModalChooseSectionOpen = false;
            state.isModalEditVideoSectionOpen = false;
            state.isModalEditTextOpen = false;
            state.isModalEditImageOpen = false;
            state.isTitleEditOpen = false;
        }
    }
});

export const {
    setIsEditBlock,
    setIsModalEditBlockLinkOpen,
    setIsModalChooseSectionOpen,
    setIsModalEditVideoSectionOpen,
    setIsModalEditTextOpen,
    setIsModalEditImageOpen,
    closeAllModals,
    setIsTitleEditOpen
} = modalsCardPageSlice.actions;

export const modalsCardPageReducer = modalsCardPageSlice.reducer;