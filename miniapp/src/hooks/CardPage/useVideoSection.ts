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

const useVideoSection = () => {
    const dispatch = useAppDispatch();

    const {linkVideoInput, videoError} = useAppSelector(state => state.video);

    const handleEditVideo = () => {
        dispatch(editVideoSection({link: linkVideoInput}));
        dispatch(setIsModalEditVideoSectionOpen(false));

        dispatch(updateBusinessCards({}))
    };

    const handleAddVideo = () => {
        dispatch(addVideoSection({link: linkVideoInput}));
        dispatch(setIsModalEditVideoSectionOpen(false));

        dispatch(updateBusinessCards({}))
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
        handleEditVideo,
        handleAddVideo,
        closeModalEditVideo,
        handleChooseVideoSection,
        isBlockVideoValid
    }
};

export default useVideoSection;