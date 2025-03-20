import React from 'react';
import {TCard} from "../../types/types";
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";

const CardsHistoryList = () => {
    const { viewHistory } = useAppSelector(state => state.myCards);
    const { selectedCardId } = useAppSelector(state => state.myCards);

    const { handleCardClick } = useCard();

    return (
        <div className={styles.cardList}>
            {viewHistory.map((card: TCard) => (
                <Cell
                    key={card.id}
                    subtitle={card.description}
                    description={card.date}
                    onClick={() => handleCardClick(card.businessCardId!)}
                    hovered={card.businessCardId === selectedCardId}
                >
                    {card.title}
                </Cell>
            ))}
        </div>
    );
};


export default CardsHistoryList;