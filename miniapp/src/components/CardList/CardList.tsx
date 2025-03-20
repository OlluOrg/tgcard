import React, {useEffect} from 'react';
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {TCard} from "../../types/types";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";
import {readBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {USER_ID} from "../../services/constants";

const CardList = () => {
    const dispatch = useAppDispatch();

    const {cards, selectedCardId} = useAppSelector(state => state.myCards);
    const {handleCardClick} = useCard();

    useEffect(() => {
        dispatch(readBusinessCards({userId: USER_ID}))
    }, []);

    return (
        <div className={styles.cardList}>
            {cards.map((card: TCard, index: number) => (
                <Cell
                    key={card.businessCardId}
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

export default CardList;