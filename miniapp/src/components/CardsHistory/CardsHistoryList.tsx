import React, {useEffect} from 'react';
import {TCard, TCardHistory} from "../../types/types";
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";
import {addHistory, getHistory} from "../../store/apiThunks/historyThunks";
import {getUserId} from "../../utils/getUserId";

const CardsHistoryList = () => {
    const { viewHistory } = useAppSelector(state => state.myCards);
    const { selectedCardId } = useAppSelector(state => state.myCards);

    const { handleCardClick } = useCard();

    const sortCardsByDate = (cards: TCardHistory[]) => {
        return [...cards].sort((a, b) => new Date(b.lastViewedAt).getTime() - new Date(a.lastViewedAt).getTime());
    };
    const sortCards = sortCardsByDate(viewHistory);

    return (
        <div className={styles.cardList}>
            {viewHistory.length === 0 ? (
            <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                <p className={styles.emptyStateSubtitle}>но здесь отобразится ваша история визиток</p>
            </div>
            ) : (
                sortCards.map((card: TCard) => (
                    <Cell
                        key={card.id}
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


export default CardsHistoryList;