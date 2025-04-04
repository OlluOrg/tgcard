import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    setIsEditBlock,
    setIsModalChooseSectionOpen,
    setIsModalEditVideoSectionOpen
} from "../../store/slices/modalsCardPageSlice";
import {addVideoSection, editVideoSection} from "../../store/slices/myCardsSlice";
import {setLinkVideoInput, setVideoError} from "../../store/slices/videoSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {TSection, TSectionText, TVideoSection, TypeSectionEnum} from "../../types/types";
import {EditSectionCommand} from "../../commands/sections/EditSectionCommand";
import {useCommandManager} from "../../commands/commandManager/CommandManagerContext";
import {AddSectionCommand} from "../../commands/sections/AddSectionCommand";

const useVideoSection = () => {
    const dispatch = useAppDispatch();
    const commandManager = useCommandManager();

    const {linkVideoInput, videoError} = useAppSelector(state => state.video);
    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards);

    const handleEditVideoCommand = () => {
        const card = cards.find(card => card.businessCardId === selectedCardId)!;
        const oldSection = card.sections.find(section => section.id === selectedSectionId)!;
        const newSection: TSection = {
            ...oldSection,
            value: {src: linkVideoInput} as TVideoSection
        }

        const command = new EditSectionCommand(oldSection, newSection);
        commandManager.execute(command);

        dispatch(setIsModalEditVideoSectionOpen(false));
    };

    const handleAddVideoCommand = () => {
        const command = new AddSectionCommand(TypeSectionEnum.video, {src: linkVideoInput} as TVideoSection);
        commandManager.execute(command);

        dispatch(setIsModalEditVideoSectionOpen(false));
    };

    const closeModalEditVideo = () => {
        dispatch(setIsModalEditVideoSectionOpen(false));
        dispatch(setLinkVideoInput(''));
    };

    const handleChooseVideoSection = () => {
        dispatch(setIsModalChooseSectionOpen(false));
        dispatch(setIsEditBlock(false));
        dispatch(setIsModalEditVideoSectionOpen(true));
    };

    useEffect(() => {
        if (linkVideoInput.length === 0) {
            dispatch(setVideoError('Ссылка обязательна'));
        } else if (linkVideoInput.length > 500) {
            dispatch(setVideoError('Максимум 500 символов'));
        } else {
            dispatch(setVideoError(''));
        }

        const urlPattern = /^https?:\/\/.*/;
        if (linkVideoInput.length === 0) {
            dispatch(setVideoError('Ссылка обязательна'));
        } else if (linkVideoInput.length > 500) {
            dispatch(setVideoError('Максимум 500 символов'));
        } else if (!urlPattern.test(linkVideoInput)) {
            dispatch(setVideoError('Должна начинаться с http:// или https://'));
        } else {
            dispatch(setVideoError(''));
        }
    }, [linkVideoInput]);

    const isBlockVideoValid = () => {
        return !videoError;
    };

    return {
        handleAddVideoCommand,
        closeModalEditVideo,
        handleChooseVideoSection,
        handleEditVideoCommand,
        isBlockVideoValid
    }
};

export default useVideoSection;