import React from 'react';
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {TCard} from "../../types/types";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";
import {ContextMenuItem, ContextMenuWrapperDiv} from "react-procedural-context-menu";

const CardList = () => {
    const {cards, selectedCardId} = useAppSelector(state => state.myCards);
    const {handleCardClick, handleEdit} = useCard();

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
            ) : (sortCards.map((card: TCard, index: number) => {

                    const menu: ContextMenuItem[] = [
                        { text: "Открыть", onClick: () => {
                            handleCardClick(card.businessCardId!);
                            }},
                        { text: "Редактировать", onClick: () => alert("Редактировать") },
                        { text: "Настройки доступа", onClick: () => alert("Не готово") },
                        { text: "Архивировать", onClick: () => alert("Не готово") },
                        { text: "Поделиться", sub: [
                                {text: "Скопировать ссылку", onClick: () => alert("menuItem2")},
                                {text: "Отправить ссылку", onClick: () => alert("Не готово")},
                                {text: "Показать QR код", onClick: () => alert("Не готово")}
                            ]}
                    ];

                    const menuCollection = { contextMenu: menu }

                return (
                    <ContextMenuWrapperDiv menus={menuCollection} >
                    <Cell
                        key={card.businessCardId}
                        subtitle={card.description}
                        description={new Date(card.date).toLocaleDateString()}
                        onClick={() => handleCardClick(card.businessCardId!)}
                        hovered={card.businessCardId === selectedCardId}
                    >
                        {card.title}
                    </Cell>
                </ContextMenuWrapperDiv>
                )
            })
        )}
        </div>
    );
};

export default CardList;