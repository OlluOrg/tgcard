import React, { useEffect, useState } from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import { Button, Input, Modal } from "@telegram-apps/telegram-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setIsModalSettingsOpen } from "../../store/slices/modalsMyCardsSlice";
import { setDescriptionNewCard, setNameNewCard } from "../../store/slices/cardSlice";
import useCard from "../../hooks/MyCards/useCard";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

const ModalSettingsCard = () => {
    const dispatch = useAppDispatch();
    const { isModalSettingsOpen } = useAppSelector(state => state.modalsMyCards);
    const { nameNewCard, nameError, descriptionNewCard, descriptionError } = useAppSelector(state => state.card);
    const { selectedCardId, cards } = useAppSelector(state => state.myCards);
    const { isFormValid, closeSettingsModal, handleSave } = useCard();
    const [isFocused, setIsFocused] = useState(false);
    
    useEffect(() => {
        if (isModalSettingsOpen && selectedCardId) {
            const selectedCard = cards.find(card => card.businessCardId === selectedCardId);
            if (selectedCard) {
                dispatch(setNameNewCard(selectedCard.title));
                dispatch(setDescriptionNewCard(selectedCard.description));
            }
        }
    }, [isModalSettingsOpen, selectedCardId, cards, dispatch]);

    return (
        <Modal
            header={<ModalHeader>Настройки визитки</ModalHeader>}
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
                    placeholder="Описание"
                    status={isFocused ? "default" : descriptionError ? "error" : "default"}
                    value={descriptionNewCard}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => dispatch(setDescriptionNewCard(e.target.value))}                   
                />
                {!isFocused && descriptionError && <div className={styles.errorMessage}>{descriptionError}</div>}
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