import React, {useEffect, useState} from 'react';
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {TCard} from "../../types/types";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";
import {readBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {useLocation} from "react-router-dom";

const CardList = () => {
    const {cards, selectedCardId} = useAppSelector(state => state.myCards);
    const {handleCardClick} = useCard();

    const sortCardsByDate = (cards: TCard[]) => {
        return [...cards].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };
    const sortCards = sortCardsByDate(cards);

    return (
        <div className={styles.cardList}>
            {cards.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                    <p className={styles.emptyStateSubtitle}>но вы можете добавить свою первую визитку</p>
                </div>
            ) : (sortCards.map((card: TCard, index: number) => (
                <Cell
                    key={card.businessCardId}
                    subtitle={card.description}
                    description={new Date(card.date).toLocaleDateString()}
                    onClick={() => handleCardClick(card.businessCardId!)}
                    hovered={card.businessCardId === selectedCardId}
                >
                    {card.title}
                </Cell>
            ))
        )}
        </div>
    );
};

export default CardList;