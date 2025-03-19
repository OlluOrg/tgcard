import React from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {Button, Input, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setIsModalAddOpen} from "../../store/slices/modalsMyCardsSlice";
import {setDescriptionNewCard, setNameNewCard} from "../../store/slices/cardSlice";
import useCard from "../../hooks/MyCards/useCard";

const ModalAddCard = () => {
    const dispatch = useAppDispatch();
    const {isModalAddOpen} = useAppSelector(state => state.modalsMyCards);
    const {nameNewCard, nameError, descriptionNewCard, descriptionError} = useAppSelector(state => state.card);
    const {isFormValid, closeAddModal, handleAdd} = useCard();

    return (
        <Modal
            header={<ModalHeader>Создать визитку</ModalHeader>}
            open={isModalAddOpen}
            onOpenChange={(open) => dispatch(setIsModalAddOpen(open))}
        >
            <div className={styles.inputGroup}>
                <Input
                    header="Название"
                    placeholder="Название"
                    value={nameNewCard}
                    onChange={(e) => dispatch(setNameNewCard(e.target.value))}
                    style={{
                        borderColor: nameError ? 'var(--tgui--destructive_text_color)' : '',
                        transition: 'border-color 0.2s ease'
                    }}
                />
                {nameError && <div className={styles.errorMessage}>{nameError}</div>}
            </div>

            <div className={styles.inputGroup}>
                <Input
                    header="Описание"
                    placeholder="Описание"
                    value={descriptionNewCard}
                    onChange={(e) => dispatch(setDescriptionNewCard(e.target.value))}
                    style={{
                        borderColor: descriptionError ? 'var(--tgui--destructive_text_color)' : '',
                        transition: 'border-color 0.2s ease'
                    }}
                />
                {descriptionError && <div className={styles.errorMessage}>{descriptionError}</div>}
            </div>

            <div className={styles.modalAddBtns}>
                <Button mode="outline" size="m" onClick={closeAddModal}>
                    Отмена
                </Button>
                <Button
                    mode="filled"
                    size="m"
                    onClick={handleAdd}
                    disabled={!isFormValid()}
                >
                    Добавить
                </Button>
            </div>
        </Modal>
    );
};

export default ModalAddCard;