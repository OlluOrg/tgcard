import { configureStore } from '@reduxjs/toolkit'
import {myCardsReducer} from "./slices/myCardsSlice";
import {modalsCardPageReducer} from "./slices/modalsCardPageSlice";
import {linkReducer} from "./slices/linkSlice";
import {textReducer} from "./slices/textSlice";
import {videoReducer} from "./slices/videoSlice";
import {modalsMyCardsReducer} from "./slices/modalsMyCardsSlice";
import {cardReducer} from "./slices/cardSlice";
import {imageReducer} from "./slices/imageSlice";

export const store = configureStore({
    reducer: {
        myCards: myCardsReducer,
        modalsCardPage: modalsCardPageReducer,
        modalsMyCards: modalsMyCardsReducer,
        card: cardReducer,
        link: linkReducer,
        text: textReducer,
        video: videoReducer,
        image: imageReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch