import React from 'react';
import styles from "../../pages/CardPage/CardPage.module.scss";
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {setIsModalEditBlockLinkOpen} from "../../store/slices/modalsCardPageSlice";
import {Button, Input, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useLinkSection from "../../hooks/CardPage/useLinkSection";
import {setLinkBlockLinkInput, setNameBlockLinkInput} from "../../store/slices/linkSlice";

const LinkModal = () => {
    const dispatch = useAppDispatch();
    const {isModalEditBlockLinkOpen, isEditBlock} = useAppSelector(state => state.modalsCardPage);

    const {nameBlockLinkInput, linkBlockLinkInput, nameError, linkError} = useAppSelector(state => state.link)

    const {
        closeModalEditBlockLink,
        handleEditBlockLink,
        isBlockLinkValid,
        handleAddBlockLink
    } = useLinkSection();

    return (
        <Modal
            className={styles.mdx}
            header={<ModalHeader>Создать ссылку</ModalHeader>}
            open={isModalEditBlockLinkOpen}
            onOpenChange={(open) => dispatch(setIsModalEditBlockLinkOpen(open))}
        >
            <div className={styles.inputGroup}>
                <Input
                    header="Название"
                    placeholder="Название"
                    value={nameBlockLinkInput}
                    onChange={e => dispatch(setNameBlockLinkInput(e.target.value))}
                    style={{borderColor: nameError ? 'var(--tgui--destructive_text_color)' : ''}}
                />
                {nameError && <div className={styles.errorMessage}>{nameError}</div>}
            </div>
            <div className={styles.inputGroup}>
                <Input
                    header="Ссылка"
                    placeholder="Ссылка"
                    value={linkBlockLinkInput}
                    onChange={e => dispatch(setLinkBlockLinkInput(e.target.value))}
                    style={{borderColor: linkError ? 'var(--tgui--destructive_text_color)' : ''}}
                />
                {linkError && <div className={styles.errorMessage}>{linkError}</div>}
            </div>
            <div className={styles.modalAddBtns}>
                <Button
                    mode="outline"
                    size="m"
                    onClick={() => closeModalEditBlockLink()}
                >
                    Отмена
                </Button>
                <Button
                    mode="filled"
                    size="m"
                    onClick={() => isEditBlock? handleEditBlockLink() : handleAddBlockLink()}
                    disabled={!isBlockLinkValid()}
                >
                    {isEditBlock ? 'Сохранить' : 'Добавить'}
                </Button>
            </div>
        </Modal>
    );
};

export default LinkModal;