import React from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {setIsModalEditVideoSectionOpen} from "../../store/slices/modalsCardPageSlice";
import {Button, Input, Modal} from "@telegram-apps/telegram-ui";
import styles from "../../pages/CardPage/CardPage.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setLinkVideoInput} from "../../store/slices/videoSlice";
import useVideoSection from "../../hooks/CardPage/useVideoSection";

const VideoModal = () => {
    const dispatch = useAppDispatch();

    const {linkVideoInput, videoError} = useAppSelector(state => state.video);
    const {isModalEditVideoSectionOpen, isEditBlock} = useAppSelector(state => state.modalsCardPage);

    const {closeModalEditVideo, isBlockVideoValid, handleEditVideo, handleAddVideo} = useVideoSection();

    return (
        <Modal
            header={<ModalHeader>Ссылка на видео</ModalHeader>}
            open={isModalEditVideoSectionOpen}
            onOpenChange={(open) => dispatch(setIsModalEditVideoSectionOpen(open))}
        >
            <Input
                header="Ссылка на видео"
                placeholder="Ссылка на видео"
                value={linkVideoInput}
                onChange={e => dispatch(setLinkVideoInput(e.target.value))}
                style={{ borderColor: videoError ? 'var(--tgui--destructive_text_color)' : '' }}
            />
            {videoError && <div className={styles.errorMessage}>{videoError}</div>}
            <div className={styles.modalAddBtns}>
                <Button
                    mode="outline"
                    size="m"
                    onClick={() => closeModalEditVideo()}
                >
                    Отмена
                </Button>
                <Button
                    mode="filled"
                    size="m"
                    onClick={isEditBlock ? handleEditVideo : handleAddVideo}
                    disabled={!isBlockVideoValid()}
                >
                    {isEditBlock ? 'Сохранить' : 'Добавить'}
                </Button>
            </div>
        </Modal>
    );
};

export default VideoModal;