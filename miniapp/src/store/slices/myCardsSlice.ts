import {TCard, TCardHistory, TCardWithUserId, TSection, TypeSectionEnum} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createBusinessCard,
    deleteBusinessCard,
    readBusinessCards, readOneBusinessCard,
    updateBusinessCards
} from "../apiThunks/businessCardThunks";
import {setDescriptionNewCard} from "./cardSlice";
import {addHistory, getHistory} from "../apiThunks/historyThunks";

interface MyCardsState {
    cards: TCard[],
    selectedCardId: string | null,
    selectedSectionId: string | null,
    viewHistory: TCardHistory[],
    isLoading: boolean,
}

const initialState: MyCardsState = {
    cards: [],
    selectedCardId: null,
    selectedSectionId: null,
    viewHistory: [],
    isLoading: false
}

const myCardsSlice = createSlice({
    name: 'myCards',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<{title: string, description: string}>) => {
            const newCard: TCard = {
                id: state.cards.length + 1,
                date: new Date(),
                title: action.payload.title,
                description: action.payload.description,
                sections: [],
            }

            state.cards.push(newCard);
        },
        updateCard: (state, action) => {
            const { id, title, description } = action.payload;
            const cardIndex = state.cards.findIndex(card => card.businessCardId === id);
            if (cardIndex !== -1) {
                state.cards[cardIndex] = { ...state.cards[cardIndex], title, description };
            }
        },
        editTitle: (state, action: PayloadAction<string>) => {
            const card = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            card.title = action.payload
        },
        selectCard: (state, action: PayloadAction<{selectedCardId: string | null }>) => {
            state.selectedCardId = action.payload.selectedCardId;
        },
        deleteCard: (state) => {
            state.cards = state.cards.filter(card => card.businessCardId !== state.selectedCardId);
            state.selectedCardId = null;
        },
        selectSection: (state, action: PayloadAction<{selectedSectionId: string | null }>) => {
            state.selectedSectionId = action.payload.selectedSectionId;
        },
        editTextSection: (state, action: PayloadAction<{text: string}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const sectionToUpdate = cardToUpdate.sections.find(section => section.id === state.selectedSectionId)!;
            sectionToUpdate.value = {value: action.payload.text};
        },
        addTextSection: (state, action: PayloadAction<{text: string}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const newSection: TSection = {
                id: crypto.randomUUID(),
                typeSectionEnum: TypeSectionEnum.text,
                order: cardToUpdate.sections.length + 1,
                value: {value: action.payload.text},
            }

            cardToUpdate.sections.push(newSection);

        },
        addLinkSection: (state, action: PayloadAction<{title: string, link: string}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const newSection: TSection = {
                id: crypto.randomUUID(),
                typeSectionEnum: TypeSectionEnum.blockLink,
                value: {name: action.payload.title, link: action.payload.link},
                order: cardToUpdate.sections.length + 1,
            }

            cardToUpdate.sections.push(newSection);
        },
        editLinkSection: (state, action: PayloadAction<{title: string, link: string}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const sectionToUpdate = cardToUpdate.sections.find(section => section.id === state.selectedSectionId)!;
            sectionToUpdate.value = {name: action.payload.title, link: action.payload.link};
        },
        addDividerSection: (state) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const newSection: TSection = {
                id: crypto.randomUUID(),
                typeSectionEnum: TypeSectionEnum.divider,
                value: {},
                order: cardToUpdate.sections.length + 1
            };

            cardToUpdate.sections.push(newSection);
        },
        addVideoSection: (state, action: PayloadAction<{link: string}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const newSection: TSection = {
                id: crypto.randomUUID(),
                typeSectionEnum: TypeSectionEnum.video,
                value: {src: action.payload.link},
                order: cardToUpdate.sections.length + 1
            }

            cardToUpdate.sections.push(newSection);
        },
        editVideoSection: (state, action: PayloadAction<{link: string}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const sectionToUpdate = cardToUpdate.sections.find(section => section.id === state.selectedSectionId)!;
            sectionToUpdate.value = {src: action.payload.link};
        },
        editImageSection: (state, action: PayloadAction<{data: {src: string, aspectRatio: number}}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const sectionToUpdate = cardToUpdate.sections.find(section => section.id === state.selectedSectionId)!;
            sectionToUpdate.value = {
                src: action.payload.data.src,
                aspectRatio: action.payload.data.aspectRatio,
            };
        },
        addImageSection: (state, action: PayloadAction<{data: {src: string, aspectRatio: number}}>) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            const newSection: TSection = {
                id: crypto.randomUUID(),
                typeSectionEnum: TypeSectionEnum.image,
                value: {
                    src: action.payload.data.src,
                    aspectRatio: action.payload.data.aspectRatio,
                },
                order: cardToUpdate.sections.length + 1
            }

            cardToUpdate.sections.push(newSection);
        },
        deleteSection: (state) => {
            const cardToUpdate = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            cardToUpdate.sections = cardToUpdate.sections.filter(section => section.id !== state.selectedSectionId);
            state.selectedSectionId = null;
        },
        updateCards: (state, action: PayloadAction<{newCards: TCard[]}>) => {
            state.cards = action.payload.newCards;
        },
        updateCardSections: (state, action: PayloadAction<{newSections: TSection[]}>) => {
            const cardToUpdate: TCard = state.cards.find(card => card.businessCardId === state.selectedCardId)!;
            cardToUpdate.sections = action.payload.newSections;
        },
        addToViewHistory: (state, action: PayloadAction<TCardHistory>) => {
            const card = action.payload;

            const cardIndex = state.viewHistory.findIndex(c => c.id === card.id);

            if (cardIndex !== -1) {
                state.viewHistory.splice(cardIndex, 1);
            }

            state.viewHistory.unshift(card);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(readBusinessCards.rejected, (state) => {
                state.isLoading = false;
                console.log('КАРТОЧКИ НЕ ПРОЧИТАЛИСЬ С БЕКА')
            })
            .addCase(readBusinessCards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(readBusinessCards.fulfilled, (state, action: PayloadAction<TCard[]>) => {
                state.cards = action.payload;
                state.isLoading = false;
            })
            .addCase(createBusinessCard.fulfilled, (state, action: PayloadAction<TCard>) => {
                state.cards.push(action.payload);
            })
            .addCase(updateBusinessCards.fulfilled, (state, action: PayloadAction<number>) => {
                console.log(`Обновлено ${action.payload} карточек`);
            })
            .addCase(deleteBusinessCard.fulfilled, (state, action: PayloadAction<number>) => {
                console.log(`Удалено ${action.payload} карточек`);
            })
            .addCase(readOneBusinessCard.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(readOneBusinessCard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(readOneBusinessCard.fulfilled, (state, action: PayloadAction<TCard>) => {
                state.isLoading = false;
                state.cards = [action.payload];
                state.selectedCardId = action.payload.businessCardId!;
            })
            .addCase(getHistory.rejected, (state) => {
                state.isLoading = false;
                console.log("Истории не прочитались с бэка");
            })
            .addCase(getHistory.pending, (state) => {
                state.isLoading = true;
                console.log("Истории не прочитались с бэка");
            })
            .addCase(getHistory.fulfilled, (state, action: PayloadAction<TCardHistory[]>) => {
                state.isLoading = false;
                state.viewHistory = action.payload;
            })
            .addCase(addHistory.fulfilled, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
})

export const {
    addCard,
    updateCard,
    editTitle,
    selectCard,
    deleteCard,
    addTextSection,
    editTextSection,
    addLinkSection,
    editLinkSection,
    addDividerSection,
    addVideoSection,
    editVideoSection,
    addImageSection,
    editImageSection,
    deleteSection,
    selectSection,
    addToViewHistory,
    updateCardSections
} = myCardsSlice.actions;
export const myCardsReducer = myCardsSlice.reducer;