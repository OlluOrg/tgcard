import React, { useState } from 'react';
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
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Modal
            header={<ModalHeader>Создать визитку</ModalHeader>}
            open={isModalAddOpen}
            onOpenChange={(open) => dispatch(setIsModalAddOpen(open))}
        >
            <div className={styles.inputGroup}>
                <Input
                    header="Название"
                    autoFocus
                    status={isFocused ? "default" : nameError ? "error" : "default"}
                    placeholder="Название"
                    value={nameNewCard}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => dispatch(setNameNewCard(e.target.value))}
                />
                {!isFocused && nameError && <div className={styles.errorMessage}>{nameError}</div>}
            </div>

            <div className={styles.inputGroup}>
                <Input
                    header="Описание"
                    status={isFocused ? "default" : descriptionError ? "error" : "default"}
                    placeholder="Описание"
                    value={descriptionNewCard}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => dispatch(setDescriptionNewCard(e.target.value))}

                />
                {!isFocused && descriptionError && <div className={styles.errorMessage}>{descriptionError}</div>}
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