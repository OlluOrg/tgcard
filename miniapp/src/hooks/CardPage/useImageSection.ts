import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    setIsModalChooseSectionOpen,
    setIsModalEditImageOpen
} from "../../store/slices/modalsCardPageSlice";
import {addImageSection, editImageSection} from "../../store/slices/myCardsSlice";
import {setImageData} from "../../store/slices/imageSlice";
import {imageUpload} from "../../services/image.service";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

const useImageSection = () => {
    const dispatch = useAppDispatch();

    const {imageData, aspectRatio, imageError} = useAppSelector(state => state.image);

    const handleEditImage = () => {
        dispatch(editImageSection({data: {src: imageData, aspectRatio: aspectRatio}}));
        dispatch(setIsModalEditImageOpen(false));
    };

    const closeModalEditImage = () => {
        dispatch(setIsModalEditImageOpen(false));
        dispatch(setImageData(''));
    };

    const handleChooseImageSection = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setIsModalChooseSectionOpen(false));
        imageUpload(event).then(imgInfo => {
            dispatch(addImageSection({data: {src: imgInfo.imageData, aspectRatio: imgInfo.aspectRatio}}));
            dispatch(updateBusinessCards({}));
        });
    };

    const isBlockImageValid = () => {
        return !imageError;
    };

    return {
        handleEditImage,
        closeModalEditImage,
        handleChooseImageSection,
        isBlockImageValid
    }
};

export default useImageSection;