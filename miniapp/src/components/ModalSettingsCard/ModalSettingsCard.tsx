import React, { useEffect } from 'react';
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