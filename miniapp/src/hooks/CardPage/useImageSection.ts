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
import {useCommandManager} from "../../commands/commandManager/CommandManagerContext";
import {AddSectionCommand} from "../../commands/sections/AddSectionCommand";
import {TImageSection, TypeSectionEnum} from "../../types/types";

const useImageSection = () => {
    const dispatch = useAppDispatch();
    const commandManager = useCommandManager();

    const {imageData, aspectRatio, imageError} = useAppSelector(state => state.image);

    const handleEditImage = () => {
        dispatch(editImageSection({data: {src: imageData, aspectRatio: aspectRatio}}));
        dispatch(setIsModalEditImageOpen(false));
    };

    const closeModalEditImage = () => {
        dispatch(setIsModalEditImageOpen(false));
        dispatch(setImageData(''));
    };

    const handleChooseImageSectionCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setIsModalChooseSectionOpen(false));
        imageUpload(event).then(imgInfo => {
            const command = new AddSectionCommand(TypeSectionEnum.image,
                {src: imgInfo.imageData, aspectRatio: imgInfo.aspectRatio} as TImageSection);
            commandManager.execute(command);
        });
    };

    const isBlockImageValid = () => {
        return !imageError;
    };

    return {
        handleEditImage,
        closeModalEditImage,
        handleChooseImageSectionCommand,
        isBlockImageValid
    }
};

export default useImageSection;