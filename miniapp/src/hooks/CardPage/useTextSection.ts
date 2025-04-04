import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    setIsEditBlock,
    setIsModalChooseSectionOpen,
    setIsModalEditTextOpen
} from "../../store/slices/modalsCardPageSlice";
import {addTextSection, editTextSection} from "../../store/slices/myCardsSlice";
import {setMarkdown, setMarkdownError} from "../../store/slices/textSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {TSection, TSectionText, TypeSectionEnum} from "../../types/types";
import {AddSectionCommand} from "../../commands/sections/AddSectionCommand";
import {useCommandManager} from "../../commands/commandManager/CommandManagerContext";
import {EditSectionCommand} from "../../commands/sections/EditSectionCommand";

const useTextSection = () => {
    const dispatch = useAppDispatch();
    const commandManager = useCommandManager();

    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards);

    const {markdown} = useAppSelector(state => state.text);

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

    const handleEditTextCommand = () => {
        dispatch(setIsModalEditTextOpen(false));
        const card = cards.find(card => card.businessCardId === selectedCardId)!;
        const oldSection = card.sections.find(section => section.id === selectedSectionId)!;
        const newSection: TSection = {
            ...oldSection,
            value: {value: markdown} as TSectionText
        }

        const command = new EditSectionCommand(oldSection, newSection);
        commandManager.execute(command);

        dispatch(setMarkdown(''));
    };

    const handleAddTextCommand = () => {
        const command = new AddSectionCommand(TypeSectionEnum.text, {value: markdown} as TSectionText)
        commandManager.execute(command);

        dispatch(setIsModalEditTextOpen(false));
        dispatch(setMarkdown(''));
    };

    const handleChooseTextSection = () => {
        dispatch(setIsModalChooseSectionOpen(false));
        dispatch(setIsEditBlock(false));
        dispatch(setIsModalEditTextOpen(true));
    };

    return {
        closeModalEditText,
        isTextValid,
        handleChooseTextSection,
        handleAddTextCommand,
        handleEditTextCommand
    };
}

export default useTextSection;