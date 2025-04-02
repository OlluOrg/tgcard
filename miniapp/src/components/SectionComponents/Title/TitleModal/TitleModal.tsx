import React, {useEffect, useState} from 'react';
import {setIsTitleEditOpen} from "../../../../store/slices/modalsCardPageSlice";
import styles from "../../../../pages/CardPage/CardPage.module.scss";
import {Button, Input, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {setNameNewCard} from "../../../../store/slices/cardSlice";
import useTitle from "../../../../hooks/CardPage/useTitle";
import useCard from "../../../../hooks/MyCards/useCard";

const TitleModal = () => {
    const dispatch = useAppDispatch();

    const {nameNewCard, nameError} = useAppSelector(state => state.card);
    const {isTitleEditOpen} = useAppSelector(state => state.modalsCardPage);
    const {cards, selectedCardId} = useAppSelector(state => state.myCards)

    const {handleCancel, handleSave} = useTitle();
    const {isFormValid} = useCard();

    const [isNameFocused, setIsNameFocused] = useState(false);

    useEffect(() => {
        if (selectedCardId) {
            const selectedCard = cards.find(card => card.businessCardId === selectedCardId);
            if (selectedCard) {
                dispatch(setNameNewCard(selectedCard.title));
            }
        }
    }, [selectedCardId, cards]);

    return (
        <Modal
            open={isTitleEditOpen}
            onOpenChange={(open) => dispatch(setIsTitleEditOpen(open))}
            style={{marginBottom: 25}}
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
                <Button
                    mode="outline"
                    size="m"
                    onClick={handleCancel}
                >
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

export default TitleModal;