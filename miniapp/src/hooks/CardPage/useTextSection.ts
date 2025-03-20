import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {setIsEditBlock, setIsModalChooseSectionOpen, setIsModalEditTextOpen} from "../../store/slices/modalsCardPageSlice";
import {addTextSection, editTextSection} from "../../store/slices/myCardsSlice";
import {setMarkdown, setMarkdownError} from "../../store/slices/textSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {TCard, TSection, TSectionText} from "../../types/types";
import {USER_ID} from "../../services/constants";

const useTextSection = () => {
    const dispatch = useAppDispatch();

    const {markdown} = useAppSelector(state => state.text);
    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards);
    const card: TCard = cards.find(card => card.businessCardId === selectedCardId)!;

    useEffect(() => {
        if (markdown.trim().length === 0) {
            dispatch(setMarkdownError('Текст обязателен'));
        } else if (markdown.length > 512) {
            dispatch(setMarkdownError('Максимум 512 символов'));
        } else {
            dispatch(setMarkdownError(''));
        }
    }, [markdown]);

    const isTextValid = () => {
        return markdown.trim().length > 0 &&
            markdown.length <= 512;
    };

    const closeModalEditText = () => {
        dispatch(setIsModalEditTextOpen(false));
        dispatch(setMarkdown(''));
    };

    const handleEditText = () => {
        dispatch(setIsModalEditTextOpen(false));
        dispatch(editTextSection({text: markdown}));
        dispatch(setMarkdown(''));

        dispatch(updateBusinessCards({userId: USER_ID}))
    };

    const handleAddText = () => {
        dispatch(setIsModalEditTextOpen(false));
        dispatch(addTextSection({text: markdown}));
        dispatch(setMarkdown(''));

        dispatch(updateBusinessCards({userId: USER_ID}))
    };

    const handleChooseTextSection = () => {
        dispatch(setIsModalChooseSectionOpen(false));
        dispatch(setIsEditBlock(false));
        dispatch(setIsModalEditTextOpen(true));
    };

    return {
        closeModalEditText,
        handleEditText,
        handleAddText,
        isTextValid,
        handleChooseTextSection,
    };
}

export default useTextSection;