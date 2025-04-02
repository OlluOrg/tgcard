import React from 'react';
import styles from "../../../pages/MyCardsPage/MyCardsPage.module.scss";
import {TCard} from "../../../types/types";
import {useAppSelector} from "../../../hooks/hooks";
import ContextMenuWithCard from "../../ContextMenu/ContextMenuWithCard/ContextMenuWithCard";

const CardList = () => {
    const {cards} = useAppSelector(state => state.myCards);

    return (
        <div className={styles.cardList}>
            {cards.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                    <p className={styles.emptyStateSubtitle}>но вы можете добавить свою первую визитку</p>
                </div>
            ) : (cards.map((card: TCard, index: number) => {

                return (
                    <ContextMenuWithCard card={card}/>
                )
            })
        )}
        </div>
    );
};

export default CardList;