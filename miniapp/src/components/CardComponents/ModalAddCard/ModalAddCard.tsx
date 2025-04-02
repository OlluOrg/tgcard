import React, { useState } from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import styles from "../../../pages/MyCardsPage/MyCardsPage.module.scss";
import {Button, Input, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {setIsModalAddOpen} from "../../../store/slices/modalsMyCardsSlice";
import {setNameNewCard} from "../../../store/slices/cardSlice";
import useCard from "../../../hooks/MyCards/useCard";

const ModalAddCard = () => {
    const dispatch = useAppDispatch();
    const {isModalAddOpen} = useAppSelector(state => state.modalsMyCards);
    const {nameNewCard, nameError} = useAppSelector(state => state.card);
    const {isFormValid, closeAddModal, handleAdd} = useCard();
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(true);

    return (
        <Modal
            header={<ModalHeader>Создать визитку</ModalHeader>}
            style={{ zIndex: 1001}}
            open={isModalAddOpen}
            onOpenChange={(open) => dispatch(setIsModalAddOpen(open))}
        >
            <div className={styles.inputGroup}>
                <Input
                    header="Название"
                    autoFocus
                    status={isNameFocused ? "default" : nameError ? "error" : "default"}
                    placeholder="Название"
                    value={nameNewCard}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    onChange={(e) => dispatch(setNameNewCard(e.target.value))}
                />
                {!isNameFocused && nameError && <div className={styles.errorMessage}>{nameError}</div>}
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