import {useEffect} from "react";
import {setIsEditBlock, setIsModalChooseSectionOpen, setIsModalEditBlockLinkOpen} from "../../store/slices/modalsCardPageSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {addLinkSection, editLinkSection} from "../../store/slices/myCardsSlice";
import {setLinkBlockLinkInput, setLinkError, setNameBlockLinkInput, setNameError} from "../../store/slices/linkSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

const useLinkSection = () => {
    const dispatch = useAppDispatch();
    const {nameBlockLinkInput, linkBlockLinkInput, nameError, linkError} = useAppSelector(state => state.link);

    useEffect(() => {
        if (nameBlockLinkInput.length === 0) {
            dispatch(setNameError('Название обязательно'));
        } else if (nameBlockLinkInput.length > 100) {
            dispatch(setNameError('Максимум 100 символов'));
        } else {
            dispatch(setNameError(''));
        }

        const urlPattern = /^https?:\/\/.*/;
        if (linkBlockLinkInput.length === 0) {
            dispatch(setLinkError('Ссылка обязательна'));
        } else if (linkBlockLinkInput.length > 500) {
            dispatch(setLinkError('Максимум 500 символов'));
        } else if (!urlPattern.test(linkBlockLinkInput)) {
            dispatch(setLinkError('Должна начинаться с http:// или https://'));
        } else {
            dispatch(setLinkError(''));
        }
    }, [nameBlockLinkInput, linkBlockLinkInput]);

    const isBlockLinkValid = () => {
        return !nameError && !linkError &&
            nameBlockLinkInput.length > 0 &&
            linkBlockLinkInput.length > 0;
    };

    const handleAddBlockLink = () => {
        dispatch(setIsModalEditBlockLinkOpen(false));
        dispatch(addLinkSection({link: linkBlockLinkInput, title: nameBlockLinkInput}));

        dispatch(updateBusinessCards({}))
    };

    const handleEditBlockLink = () => {
        dispatch(editLinkSection({link: linkBlockLinkInput, title: nameBlockLinkInput}));
        dispatch(setIsModalEditBlockLinkOpen(false));

        dispatch(updateBusinessCards({}))
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
        handleAddBlockLink,
        handleEditBlockLink,
        closeModalEditBlockLink,
        handleChooseBlockLinkSection
    }
}

export default useLinkSection