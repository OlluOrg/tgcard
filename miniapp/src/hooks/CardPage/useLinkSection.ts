import {useEffect} from "react";
import {
    setIsEditBlock,
    setIsModalChooseSectionOpen,
    setIsModalEditBlockLinkOpen
} from "../../store/slices/modalsCardPageSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {addLinkSection, editLinkSection} from "../../store/slices/myCardsSlice";
import {setLinkBlockLinkInput, setLinkError, setNameBlockLinkInput, setNameError} from "../../store/slices/linkSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {AddSectionCommand} from "../../commands/sections/AddSectionCommand";
import {TSection, TSectionBlockLink, TSectionText, TypeSectionEnum} from "../../types/types";
import {useCommandManager} from "../../commands/commandManager/CommandManagerContext";
import {EditSectionCommand} from "../../commands/sections/EditSectionCommand";

const useLinkSection = () => {
    const dispatch = useAppDispatch();
    const {nameBlockLinkInput, linkBlockLinkInput, nameError, linkError} = useAppSelector(state => state.link);
    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards)
    const commandManager = useCommandManager();

    useEffect(() => {
        if (nameBlockLinkInput.length === 0) {
            dispatch(setNameError('Название обязательно'));
        } else if (nameBlockLinkInput.length > 100) {
            dispatch(setNameError('Максимум 100 символов'));
        } else {
            dispatch(setNameError(''));
        }

        if (linkBlockLinkInput.length === 0) {
            dispatch(setLinkError('Ссылка обязательна'));
        } else if (linkBlockLinkInput.length > 500) {
            dispatch(setLinkError('Максимум 500 символов'));
        } else if (!isValidHttpUrl(linkBlockLinkInput)) {
            dispatch(setLinkError('Должна начинаться с http:// или https:// и не быть пустой'));
        } else {
            dispatch(setLinkError(''));
        }
    }, [nameBlockLinkInput, linkBlockLinkInput]);

    const isValidHttpUrl = (string: string): boolean => {
        try {
          const url = new URL(string);
          return (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "tg:") && url.hostname.length > 0;
        } catch (_) {
          return false;
        }
      }

    const isBlockLinkValid = () => {
        return !nameError && !linkError &&
            nameBlockLinkInput.length > 0 &&
            linkBlockLinkInput.length > 0;
    };

    const handleAddBlockLinkCommand = () => {
        const command = new AddSectionCommand(TypeSectionEnum.blockLink,
            {link: linkBlockLinkInput, name: nameBlockLinkInput} as TSectionBlockLink);
        commandManager.execute(command);

        dispatch(setIsModalEditBlockLinkOpen(false));
    };

    const handleEditBlockLinkCommand = () => {
        const card = cards.find(card => card.businessCardId === selectedCardId)!;
        const oldSection = card.sections.find(section => section.id === selectedSectionId)!;
        const newSection: TSection = {
            ...oldSection,
            value: {link: linkBlockLinkInput, name: nameBlockLinkInput} as TSectionBlockLink
        }

        const command = new EditSectionCommand(oldSection, newSection);
        commandManager.execute(command);

        dispatch(setIsModalEditBlockLinkOpen(false));
    };

    const closeModalEditBlockLink = () => {
        dispatch(setIsModalEditBlockLinkOpen(false));
        dispatch(setNameBlockLinkInput(''));
        dispatch(setLinkBlockLinkInput(''));
    };

    const handleChooseBlockLinkSection = () => {
        dispatch(setIsModalChooseSectionOpen(false));
        dispatch(setIsEditBlock(false));
        dispatch(setIsModalEditBlockLinkOpen(true));
    };

    return {
        isBlockLinkValid,
        handleEditBlockLinkCommand,
        closeModalEditBlockLink,
        handleChooseBlockLinkSection,
        handleAddBlockLinkCommand
    }
}

export default useLinkSection