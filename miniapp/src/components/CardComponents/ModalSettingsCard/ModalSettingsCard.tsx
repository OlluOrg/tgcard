import React, { useEffect, useState } from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import styles from "../../../pages/MyCardsPage/MyCardsPage.module.scss";
import { Button, Input, Modal } from "@telegram-apps/telegram-ui";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setIsModalSettingsOpen } from "../../../store/slices/modalsMyCardsSlice";
import { setNameNewCard } from "../../../store/slices/cardSlice";
import useCard from "../../../hooks/MyCards/useCard";

const ModalSettingsCard = () => {
    const dispatch = useAppDispatch();
    const { isModalSettingsOpen } = useAppSelector(state => state.modalsMyCards);
    const { nameNewCard, nameError } = useAppSelector(state => state.card);
    const { selectedCardId, cards } = useAppSelector(state => state.myCards);
    const { isFormValid, closeSettingsModal, handleSave } = useCard();
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(true);
    
    useEffect(() => {
        if (isModalSettingsOpen && selectedCardId) {
            const selectedCard = cards.find(card => card.businessCardId === selectedCardId);
            if (selectedCard) {
                dispatch(setNameNewCard(selectedCard.title));
            }
        }
    }, [isModalSettingsOpen, selectedCardId, cards, dispatch]);

    return (
        <Modal
            header={<ModalHeader>Настройки визитки</ModalHeader>}
            style={{ zIndex: 1001}}
            open={isModalSettingsOpen}
            onOpenChange={(open) => {
                if (!open) {
                    closeSettingsModal();
                }
                dispatch(setIsModalSettingsOpen(open));
            }}
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
                <Button mode="outline" size="m" onClick={closeSettingsModal}>
                    Отмена
                </Button>
                <Button
                    mode="filled"
                    size="m"
                    onClick={handleSave}
                    disabled={!isFormValid()}
                >
                    Сохранить
                </Button>
            </div>
        </Modal>
    );
};

export default ModalSettingsCard;